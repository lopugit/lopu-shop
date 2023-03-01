import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, LineItem, JSONProduct } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { convertCurrency, getNextArrayState } from 'helpers'
import { Gifts } from 'snippets'

declare const BASE_CURRENCY: string
declare const STOREFRONT_NAME: string
declare const STOREFRONT_PASSWORD: string
export class CartTemplate extends React.PureComponent<CartTemplate.Props, CartTemplate.State> {
  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    store: STOREFRONT_NAME,
    storeFrontKey: STOREFRONT_PASSWORD
  })
  addingGifts: boolean;

  public constructor(props: CartTemplate.Props) {
    super(props)
    this.addingGifts = false
    this.state = {
      cart: null,
      hasFullPriceItems: false,
      featuredCollection: [],
      giftProducts: null,
      productGiftProducts: null,
      collectionGiftProducts: null,
      disabledCollectionGifts: JSON.parse(localStorage.getItem('disabledGifts:collection')) || [],
      disabledProductGifts: JSON.parse(localStorage.getItem('disabledGifts:product')) || [],
      disabledPriceGifts: JSON.parse(localStorage.getItem('disabledGifts:price')) || [],
      itemsQualifiedForGift: 0
    }
  }

  componentDidUpdate = async () => {
    if (this?.context?.state?.cart) {
      const { cart } = this.context.state
      const { settings } = this.props.data

      // If there is no cart state or the item count has changed
      if (!this.state.cart || cart.item_count != this.state.cart.item_count) {
        this.setState({
          cart: cart,
          hasFullPriceItems: cart?.items?.find((item) => !item?.compare_at_price || item?.price > item?.compare_at_price)
        })
        if(settings.gifts_based_on_qualified_items){
          this.checkQualifiedForGiftItems(cart)
        }
      }

    }
  }

  removeGift = (type: 'collection' | 'price' | 'product', handle: string) => {
    if (type === 'collection') {
      this.setState(({ disabledCollectionGifts }) => {
        const nextState = getNextArrayState(disabledCollectionGifts, handle)
        localStorage.setItem('disabledGifts:collection', JSON.stringify(nextState))
        return {
          disabledCollectionGifts: nextState
        }
      })
    } else if (type === 'price') {
      this.setState(({ disabledPriceGifts }) => {
        const nextState = getNextArrayState(disabledPriceGifts, handle)
        localStorage.setItem('disabledGifts:price', JSON.stringify(nextState))
        return {
          disabledPriceGifts: nextState
        }
      })
    } else if (type === 'product') {
      this.setState(({ disabledProductGifts }) => {
        const nextState = getNextArrayState(disabledProductGifts, handle)
        localStorage.setItem('disabledGifts:product', JSON.stringify(nextState))
        return {
          disabledProductGifts: nextState
        }
      })
    }
  }

  public componentDidMount = async () => {
    if (this?.props?.data?.section?.cart?.settings?.collection?.products) {
      const featuredCollection = await this.getSwatchdata(this.props.data.section.cart.settings.collection.products.slice(0, 8))
      this.setState({
        featuredCollection
      })
    }

    const { settings } = this.props.data
    if (settings?.enable_price_based) {
      const handles = settings.free_price_based_gift_handles.split(',')
      const giftProducts = await Helpers.getGiftProducts(handles)
      this.setState({
        giftProducts
      })
    }
    if (settings?.enable_product_based) {
      const handles = settings.free_gift_handles.split(',')
      const productGiftProducts = await Helpers.getGiftProducts(handles)
      this.setState({
        productGiftProducts
      })
    }
    if (settings?.enable_collection_based) {
      const handles = [settings.free_collection_based_gift]
      const collectionGiftProducts = await Helpers.getGiftProducts(handles)
      this.setState({
        collectionGiftProducts
      })
    }

  }

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await CartTemplate.kewl.productsBySwatchTags(tags)
    const newProducts = []
    products.forEach(product => {
      const underlinedHandle = product.handle.replace(/\-/g, '_')// eslint-disable-line no-useless-escape
      const siblingsQuantity = siblingsResults[underlinedHandle].length
      const filteredSiblings = siblingsResults[underlinedHandle].filter(sibling => sibling.handle !== product.handle)
      newProducts.push({ ...product, siblingsQuantity: siblingsQuantity, filteredSiblings: filteredSiblings })
    })
    return newProducts
  }

  checkQualifiedForGiftItems = (cart) => {
    let count = 0
    cart?.items?.filter((lineitem) => !lineitem.properties._gift).forEach((lineitem) => {
      if(lineitem.collections.includes(this.props.data.settings.collection_for_gift)){
        count += lineitem.quantity
      }

      this.setState({itemsQualifiedForGift: count})
    })
  }

  public render(): JSX.Element {
    const { cart } = this.context.state
    const showCartMessage = this.context.state.cartCurrency != BASE_CURRENCY
    const { settings } = this.props.data
    const sectionSettings = Helpers.check(this, 'this.props.data.section.cart.settings') ? { ...this.props.data.section.cart.settings } : null
    const sliderSettings = {
      arrows: false,
      infinite: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: Number(sectionSettings.slidestoshow),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            centerPadding: '80px',
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
          }
        }
      ]
    }
    const handlesInCart = cart?.items?.map((item) => item.handle)
    const collectionHandlesInCart = cart?.items?.flatMap(({ collections }) => collections)
    const fullPriceCart = Helpers.getFullPriceCart(cart)
    const requiresShipping = Helpers.getRequiresShipping(cart)
    const collectionBasedCart = settings.collection_based_sale_items ? cart?.total_price : fullPriceCart
    const productBasedCart = settings.product_based_sale_items ? cart?.total_price : fullPriceCart
    const priceBasedCart = settings.price_based_sale_items ? cart?.total_price : fullPriceCart
    const hatboxCart = settings.hatbox_sale_items ? cart?.total_price : fullPriceCart
    return (
      <Layouts.Theme {...this.props}>
        <main className={'w-full max-w-7xl mx-auto pt-2 md:pt-6-3 pb-4'}>
          <div className={'w-full flex justify-center'}>
            <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-3-2'}>
              {'Shopping bag'}
            </Snippets.Heading>
          </div>
          {cart && cart.item_count ? (
            <div className={'flex flex-wrap md:px-1-6 xl:px-0'}>
              <div className={'w-full hidden md:flex flex-row pt-3-2 pb-1-6 border-b border-grey-border'}>
                <div className={'w-2/12'}>
                  <Snippets.Heading size={'h5'} tag={'p'}>description</Snippets.Heading>
                </div>
                <div className={'w-10/12 flex flex-row'}>
                  <div className={'w-1/3'}></div>
                  <div className={'w-1/3'}>
                    <Snippets.Heading size={'h5'} tag={'p'}>price</Snippets.Heading>
                  </div>
                  <div className={'w-1/3'}>
                    <Snippets.Heading size={'h5'} tag={'p'}>qty</Snippets.Heading>
                  </div>
                  <div className={'w-1/10'}>
                    <Snippets.Heading
                      size={'h5'}
                      tag={'p'}
                      className={'text-right'}
                    >
                      total
                    </Snippets.Heading>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col w-full md:px-1-6 xl:px-0'}>
                {
                  cart?.items?.filter((lineitem) => !lineitem.properties._gift)
                    .filter((item: LineItem) => !item.hidden)
                    .map((lineitem: LineItem) => {
                      return (
                        <Snippets.CartItem
                          {...this.props}
                          lineitem={lineitem}
                          key={lineitem.key}
                          quantity={lineitem.quantity}
                          fullPriceCart={hatboxCart}
                          requiresShipping={requiresShipping}
                        />
                      )
                    })
                }
                {
                  settings?.enable_price_based &&
                  (!settings?.price_disable_if_all_sale_items_in_cart || this.state.hasFullPriceItems) &&
                  requiresShipping &&
                  cart?.item_count > 0 &&
                  convertCurrency(priceBasedCart) >= Number(settings.gift_price_based_threshold) && this.state.giftProducts ? (

                      <Gifts
                        products={this.state.giftProducts}
                        message={settings.price_based_gift_message}
                        type="price"
                        disabled={this.state.disabledCollectionGifts}
                        removeGift={this.removeGift}
                        // quantity={Math.trunc(priceBasedCart / Number(settings.gift_price_based_threshold))}
                        quantity={1}
                      />

                    ) : null
                }
                {
                  settings?.enable_product_based &&
                  (!settings?.product_disable_if_all_sale_items_in_cart || this.state.hasFullPriceItems) &&
                  requiresShipping &&
                  convertCurrency(productBasedCart) >= Number(settings.product_based_threshold) &&
                  handlesInCart.includes(settings.product_for_gift) &&
                  this.state.productGiftProducts ? (
                      <Gifts
                        products={this.state.productGiftProducts}
                        message={settings.product_based_gift_message}
                        type="product"
                        disabled={this.state.disabledCollectionGifts}
                        removeGift={this.removeGift}
                        // quantity={Math.trunc(productBasedCart / Number(settings.product_based_threshold))}
                        quantity={1}
                      />
                    ) : null
                }
                {
                  settings?.enable_collection_based &&
                  (!settings?.collection_disable_if_all_sale_items_in_cart || this.state.hasFullPriceItems) &&
                  requiresShipping &&
                  convertCurrency(collectionBasedCart) >= Number(settings.collection_based_threshold) &&
                  collectionHandlesInCart.includes(settings.collection_for_gift) &&
                  this.state.collectionGiftProducts ? (
                      <Gifts
                        products={this.state.collectionGiftProducts}
                        message={settings.collection_based_gift_message}
                        type="collection"
                        disabled={this.state.disabledCollectionGifts}
                        removeGift={this.removeGift}
                        // quantity={Math.trunc(collectionBasedCart / Number(settings.collection_based_threshold))}
                        quantity={settings.gifts_based_on_qualified_items ? this.state.itemsQualifiedForGift : 1}
                      />
                    ) : null
                }
              </div>

              <div className={'flex flex-col justify-end w-full md:px-1-6 xl:px-0'}>
                <div className={'self-end w-full md:w-1/3 px-1-6 md:pl-1-6 md:pr-0'}>
                  {cart && cart.total_price ? (
                    <div className={'pt-2-4 md:pt-1-6 flex w-full items-center justify-between'}>
                      <Snippets.Heading
                        size={'p'}
                        tag={'p'}
                        className={'leading-close'}
                      >
                        {'Subtotal'}
                      </Snippets.Heading>
                      <Snippets.Heading size={'h3'} tag={'p'} className={'leading-close'}>
                        <Snippets.Money price={cart.total_price} />
                      </Snippets.Heading>
                    </div>
                  ) : null}

                  {(showCartMessage && settings.cart_message && settings.info_url && settings.info_text) ? <div className={'mt-1-6'}>
                    <Snippets.Heading size={'none'} tag={'p'} className={'inline'}>{settings.cart_message}</Snippets.Heading>
                    <Snippets.Link href={settings.info_url} className={'inline underline ml-0-4'}>{settings.info_text}</Snippets.Link>
                  </div> : null}

                  <Snippets.Button
                    title={'Checkout'}
                    disabled={this.addingGifts}
                    className={'w-full h-5-6 flex items-center justify-between mt-2 md:mt-3-2'}
                    onClick={async () => {
                      if (this.addingGifts) {
                        return
                      }

                      this.addingGifts = true
                      await Helpers.addGifts(
                        settings,
                        this.state.giftProducts,
                        this.state.productGiftProducts,
                        this.state.collectionGiftProducts,
                        this.state.disabledPriceGifts,
                        this.state.disabledProductGifts,
                        this.state.disabledCollectionGifts,
                        this.state.itemsQualifiedForGift
                      )

                      window.location.href = '/checkout'
                      this.addingGifts = false
                    }}
                  >
                    <Snippets.Heading size={'h5'} tag={'p'}>Checkout</Snippets.Heading>
                    <Snippets.Icon name={'chevron_right_reverse'} width={40} height={40} ariaHidden/>
                  </Snippets.Button>

                  <Snippets.Button
                    title={'Continue Shopping'}
                    className={'md:hidden w-full h-5-6 flex items-center justify-between mt-2 border border-black block'}
                    href={'/'}
                    colour={'blank'}
                  >
                    <Snippets.Heading size={'h5'} tag={'p'} className={'w-full text-center'}>Continue Shopping</Snippets.Heading>
                  </Snippets.Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={'w-full flex flex-col items-center'}>
              <div className={'flex flex-col items-center mb-8'}>
                <Snippets.Heading size={'p'} tag={'p'} className={'mb-3-2 leading-close'}>
                  Your shopping bag is currently empty.
                </Snippets.Heading>
                <Snippets.Button
                  className={'p-1-2 border border-black'}
                  href={'/'}
                  title={'Continue Shopping'}
                  colour={'blank'}
                >
                  <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>
                    back to shopping
                  </Snippets.Heading>
                </Snippets.Button>
              </div>
              {sectionSettings?.collection?.products?.length > sectionSettings?.slidestoshow
                ? <div className={'w-full flex flex-col items-center'}>
                  <Snippets.Heading
                    size={'h3'} tag={'p'} className={'tracking-wider mb-2-4 md:mb-4'}
                  >
                    {sectionSettings?.title}
                  </Snippets.Heading>
                  <div className={'w-full pl-0-8 md:pl-0'}>
                    <Snippets.Slider settings={{ ...sliderSettings }} className={'cart-slider'}>
                      {this.state.featuredCollection.map((product: any, i: number) => {
                        return <Snippets.CollectionProduct
                          collection={this?.props?.data?.collection}
                          key={i}
                          product={product}
                          layout={'slider'}
                          list="Cart"
                          border
                        />
                      })}
                    </Snippets.Slider>
                  </div>
                </div> : null}
            </div>
          )}
        </main>
      </Layouts.Theme>
    )
  }
}


export namespace CartTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    cart: any;
    hasFullPriceItems: boolean;
    featuredCollection: any;
    productGiftProducts: JSONProduct[];
    collectionGiftProducts: JSONProduct[];
    giftProducts: JSONProduct[];
    disabledCollectionGifts: Array<string>;
    disabledProductGifts: Array<string>;
    disabledPriceGifts: Array<string>;
    itemsQualifiedForGift: number;
  }
}
