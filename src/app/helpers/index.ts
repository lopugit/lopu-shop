import { ShopifyNext } from '@dotdev/next-components'
import { Cart, GlobalData } from 'types'

export * from './gtm'
export * from './images'
export * from './shopify-kewl'
export * from './react-text-marquee'
export * from './animatedScrollTo'
export * from './magnifier'
export * from './soh-limits'

export function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2]
}
//@ts-ignore
export function convertCurrency(price) {
  //@ts-ignore
  if (window.baseCurrency != getCookie('cart_currency')) {
    //@ts-ignore
    return (price / window.exchangeRate) * 1000000
  } else {
    return price
  }
}

export function check(obj: any, levels: string): any {
  if (!obj) {
    return false
  }
  const keys: string[] = levels.split('.')
  for (let i = 1; i < keys.length; i++) {
    if (!obj || !obj.hasOwnProperty(keys[i])) {
      return false
    }
    obj = obj[keys[i]]
  }
  return true
}


export const handleize = (str) => {
  return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, '-').replace(/^-+|-+$/g, '')
}

export const getAltText = (tags: string[], title: string) => {
  const category = tags?.some(tag => tag.includes('category:')) ? tags.filter(tag => tag.includes('category:'))[0].split(':')[1] : ''
  const colour = tags?.some(tag => tag.includes('colour:')) ? tags.filter(tag => tag.includes('colour:'))[0].split(':')[1] : ''
  const shape = tags?.some(tag => tag.includes('shape:')) ? tags.filter(tag => tag.includes('shape:'))[0].split(':')[1] : ''
  const material = tags?.some(tag => tag.includes('material:')) ? tags.filter(tag => tag.includes('material:'))[0].split(':')[1] : ''
  return `${material} ${shape} ${colour} ${title} ${category}`
}

export const fixedBodyScroll = (hidden:boolean) => {
  const cls = ['fixed', 'inset-0', 'overflow-y-scroll']
  hidden ? document.body.classList.add(...cls) : document.body.classList.remove(...cls)
}

export const scrollToTop = () => {
  const distance = document.documentElement.scrollTop || document.body.scrollTop
  if(distance > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, distance - distance / 8)
  }
}

export const getHatboxes = async (gifts: {
  handle: string;
  quantity: number;
}[]) => {
  const products = []
  for (const gift of gifts) {
    const product = await getGiftProduct(gift.handle)
    if (!product) {
      continue
    }
    products.push({
      product: product.product,
      quantity: gift.quantity
    })
  }
  return products
}

export const getGiftProducts = async (handles: string[]) => {
  const products = []
  for (const handle of handles) {
    const product = await getGiftProduct(handle)
    if (!product) {
      continue
    }
    products.push(product.product)
  }
  return products
}

export const getGiftProduct = async (handle: string) => {
  const res = await fetch(`/products/${handle}.json`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  if (res.status === 200) {
    const product = await res.json()
    return product
  }
  return null
}

/**
 * Changes the first letter of a string to uppercase
 **/
export const firstLetterToUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

/**
 * Get the value of all items that are not discounted
 **/

export const getRequiresShipping = (cart: Cart): boolean => Boolean(cart?.items?.find((item) => item.requires_shipping))
export const getFullPriceCart = (cart: any): number => cart?.items?.filter((item) => item.compare_at_price <= item.price && item.total_discount === 0).filter((item) => !item.tags.includes('badge:Final Sale')).reduce((a, b) => a + b.line_price, 0)
export const checkHatboxBasedProductPrice = (cart: Cart, productPriceThreshold): boolean => Boolean(cart?.items?.find((item) => item.price >= productPriceThreshold))

/**
 * add all gift products to the cart
 **/
export const addGifts = async (settings: any, giftProducts, productGiftProducts, collectionGiftProducts, disabledPriceGifts, disabledProductGifts, disabledCollectionGifts, itemsQualifiedForGift) => {
  const cart = await ShopifyNext.Cart.getCartJSON()
  // Get the value of all items that are not discounted
  const requiresShipping = getRequiresShipping(cart)
  if (!requiresShipping) {
    return
  }

  const fullPriceCart = getFullPriceCart(cart)
  const collectionBasedCart = convertCurrency(settings.collection_based_sale_items ? cart?.total_price : fullPriceCart)
  const productBasedCart = convertCurrency(settings.product_based_sale_items ? cart?.total_price : fullPriceCart)
  const priceBasedCart = convertCurrency(settings.price_based_sale_items ? cart?.total_price : fullPriceCart)
  const hatboxCart = convertCurrency(settings.hatbox_sale_items ? cart?.total_price : fullPriceCart)
  const hatboxBasedProductPrice = !settings.enable_threshold_based_product_price ? hatboxCart >= Number(settings.hatbox_price_threshold) : checkHatboxBasedProductPrice(cart, settings.hatbox_price_threshold);
  // remove gift items first then readd
  for (const item of cart.items) {
    if (item.properties._gift) {
      await ShopifyNext.Cart.removeItem(item.key)
    }
  }
  if (settings.enable_hatboxes && hatboxBasedProductPrice) {
    const hatBoxHandles = []
    for (const item of cart.items) {

      if (item.properties?._gift_opt_out == 'yes'){
        continue
      }

      const prefix = 'x_tag-list-entry:gift:'
      // Don't add gifts to gifts or sale items
      if (item?.properties?._gift || item.compare_at_price > item.price) {
        continue
      }
      const giftTag = item.tags.find((tag) => tag.includes(prefix))
      if (!giftTag) {
        continue
      }
      const handle = giftTag.split(prefix)[1]
      hatBoxHandles.push({
        handle,
        quantity: item.quantity
      })
    }
    const hatBoxes = await getHatboxes(hatBoxHandles)
    for (const box of hatBoxes) {
      try {
        await ShopifyNext.Cart.addItem(box.product.variants[0].id, box.quantity, {
          properties: {
            _gift: 'Complimentary gift with purchase'
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  const hasFullPriceItems = cart?.items?.find((item) => !item?.compare_at_price || item?.price > item?.compare_at_price)
  const handlesInCart = cart?.items?.map((item) => item.handle)
  const collectionHandlesInCart = cart?.items?.flatMap(({ collections }) => collections)
  const priceBasedGiftEnabled = settings?.enable_price_based &&
    (!settings?.price_disable_if_all_sale_items_in_cart || hasFullPriceItems) &&
    cart?.item_count > 0 &&
    priceBasedCart >= Number(settings.gift_price_based_threshold) &&
    giftProducts

  const productBasedGiftEnabled = (
    settings?.enable_product_based &&
    (!settings?.product_disable_if_all_sale_items_in_cart || hasFullPriceItems) &&
    productBasedCart >= Number(settings.product_based_threshold) &&
    handlesInCart.includes(settings.product_for_gift) &&
    productGiftProducts
  )
  const collectionBasedGiftEnabled = (
    settings?.enable_collection_based &&
    (!settings?.collection_disable_if_all_sale_items_in_cart || hasFullPriceItems) &&
    collectionBasedCart >= Number(settings.collection_based_threshold) &&
    collectionHandlesInCart.includes(settings.collection_for_gift) &&
    collectionGiftProducts
  )

  if (priceBasedGiftEnabled) {
    for (const product of giftProducts) {
      if (disabledPriceGifts.includes(product.handle)) {
        continue
      }
      await addGift(product.variants[0].id, settings.price_based_gift_message, Math.trunc(priceBasedCart / settings.gift_price_based_threshold))
    }
  }
  if (productBasedGiftEnabled) {
    for (const product of productGiftProducts) {
      if (disabledProductGifts.includes(product.handle)) {
        continue
      }
      await addGift(product.variants[0].id, settings.product_based_gift_message, Math.trunc(productBasedCart / settings.product_based_threshold))
    }
  }
  if (collectionBasedGiftEnabled) {
    for (const product of collectionGiftProducts) {
      if (disabledCollectionGifts.includes(product.handle)) {
        continue
      }
      if(settings.gifts_based_on_qualified_items){
        await addGift(product.variants[0].id, settings.collection_based_gift_message, itemsQualifiedForGift)
      }else{
        await addGift(product.variants[0].id, settings.collection_based_gift_message, Math.trunc(collectionBasedCart / settings.collection_based_threshold))
      }
    }
  }

}

export const addGift = async (id: number, message: string, giftMultiple: number) => {
  await ShopifyNext.Cart.addItem(id, giftMultiple, {
    properties: {
      _gift: message
    }
  })
}


export const getNextArrayState = (state: Array<string>, item: string) => {
  const index = state.indexOf(item)
  let nextState
  if (index === -1) {
    nextState = [...state, item]
  } else {
    const arrClone = state.slice()
    arrClone.splice(index, 1)
    nextState = arrClone
  }
  return nextState
}
