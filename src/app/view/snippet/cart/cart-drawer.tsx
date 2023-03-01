import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, GlobalState, LineItem, JSONProduct } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { GiftWithPurchaseDrawer } from './gift-with-purchase-drawer'
import { GiftsDrawer } from './gifts-drawer'
import { convertCurrency, getNextArrayState } from 'helpers'

declare const BASE_CURRENCY: string

export class CartDrawer extends React.PureComponent<CartDrawer.Props, CartDrawer.State> {

  public static contextType = ShopifyNext.Context;
  addingGifts: boolean;

  public constructor(props: CartDrawer.Props) {
    super(props)
    this.addingGifts = false
    this.state = {
      greyed: [],
      cart: null,
      hasFullPriceItems: false,
      cartCurrency: null,
      giftProducts: null,
      productGiftProducts: null,
      collectionGiftProducts: null,
      disabledCollectionGifts: JSON.parse(localStorage.getItem('disabledGifts:collection')) || [],
      disabledProductGifts: JSON.parse(localStorage.getItem('disabledGifts:product')) || [],
      disabledPriceGifts: JSON.parse(localStorage.getItem('disabledGifts:price')) || [],
      stickyNav: false,
      itemsQualifiedForGift: 0
    }
  }

  componentDidUpdate = async () => {
    if (this?.context?.state?.cart) {
      const { cart, limitedCartItems } = this.context.state
      const { settings } = this.props.data
      // If there is no cart state or the item count has changed
      if (!this.state.cart || cart.item_count != this.state.cart.item_count) {
        this.setState({
          cart: cart,
          hasFullPriceItems: cart?.items?.find((item) => !item?.compare_at_price || item?.price > item?.compare_at_price),
          cartCurrency: this.context.state?.cartCurrency
        })
        if(settings.gifts_based_on_qualified_items){
          this.checkQualifiedForGiftItems(cart)
        }
      }

      const newCartItems = Helpers.getLimitedCartItems(cart.items)

      if (JSON.stringify(newCartItems) !== JSON.stringify(limitedCartItems)) {
        this.context.update({ limitedCartItems: newCartItems })
      }

      try {
        const cachedCartString = localStorage.getItem('theme:cart')
        const cachedCart = cachedCartString ? JSON.parse(cachedCartString) : {}
        if (JSON.stringify(cachedCart.items) !== JSON.stringify(cart.items)) {
          localStorage.setItem('theme:cart', JSON.stringify(cart))
        }
      } catch (e) {
        // console.log("Failed to update cache.")
      }

    }
  }

  componentDidMount = async () => {
    const { settings } = this.props.data
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('storage', this.handleStorageChange)

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

  public componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('storage', this.handleStorageChange)
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

  private handleScroll = (): void => {
    this.setState((prevState) => {
      return window.scrollY > 40 ? (
        {
          ...prevState,
          stickyNav: true
        }
      ) : (
        {
          ...prevState,
          stickyNav: false
        }
      )
    })
  }

  private handleStorageChange = (event): void => {
    const { cart } = this.context.state
    try {
      if (event.key === 'theme:cart') {
        const cachedCart = JSON.parse(event.newValue)
        if (JSON.stringify(cachedCart.items) !== JSON.stringify(cart.items)) {
          this.context.update({ cart: cachedCart })
        }
      }
    } catch (e) {
      // console.log("Failed to update cache.")
    }
  }

  //for collection based gift
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
    const { cartActive } = this.context.state
    const { cart, greyed } = this.state
    const showCartMessage = this.context.state.cartCurrency != BASE_CURRENCY
    const { settings } = this.props.data
    const handlesInCart = cart?.items?.map(({ handle }) => handle)
    const collectionHandlesInCart = cart?.items?.flatMap(({ collections }) => collections)
    const { stickyNav } = this.state

    // Get the value of all items that are not discounted
    const fullPriceCart = Helpers.getFullPriceCart(cart)
    const requiresShipping = Helpers.getRequiresShipping(cart)
    const collectionBasedCart = settings.collection_based_sale_items ? cart?.total_price : fullPriceCart
    const productBasedCart = settings.product_based_sale_items ? cart?.total_price : fullPriceCart
    const priceBasedCart = settings.price_based_sale_items ? cart?.total_price : fullPriceCart
    const hatboxCart = settings.hatbox_sale_items ? cart?.total_price : fullPriceCart
    const hatboxBasedProductPrice = !settings.enable_threshold_based_product_price ? hatboxCart >= Number(settings.hatbox_price_threshold) : Helpers.checkHatboxBasedProductPrice(cart, settings.hatbox_price_threshold)

    const awsUrl = '//lopu-shop-images.s3.ap-southeast-2.amazonaws.com/ribbon'
    return (
      <div className={`fixed right-0 z-100 max-w-cart-drawer w-full ${stickyNav ? 'top-56' : 'top-96'} md:top-113 bottom-51 md:bottom-auto sm:border sm:border-grey-border transition ${cartActive ? 'translate-x:0 opacity-100 pointer-events-auto visible' : 'translate-x:100 opacity-0 pointer-events-none invisible'}`}>
        <div className={`bg-white flex flex-col hide-scrollbar ${cart?.items?.length > 0 ? 'max-h-full sm:max-h-62' : 'max-h-full sm:max-h-17-3'} h-full sm:h-auto mb-5 sm:mb-0`}>
          <Snippets.Button
            colour={'blank'}
            title={'Close Mini Cart'}
            className={'absolute right-0 top-0 outline-none active:outline-none focus:outline-none pr-1-3 pt-1-3'}
            onClick={this.toggleCartDrawer}
          >
            <Snippets.Icon name={'cross'} width={14} />
          </Snippets.Button>
          {cart?.items?.length > 0 && <div className={'flex-shrink text-black px-2-4 pb-0-7 pt-2-4'}>
            <p className={'font-normal font-mono'} style={{ fontSize: 30, lineHeight: 1.2334 }}>
              Shopping Bag
            </p>
          </div>}
          {settings?.enable_price_based && cart?.item_count > 0 && priceBasedCart < Number(settings.gift_price_based_threshold) ? (
            <div className={'bg-black text-white px-2-4 py-0-8'}>
              <p>
                {`Spend ${ShopifyNext.Utils.formatMoney(Number(settings.gift_price_based_threshold))} to recieve a free gift`}
              </p>
            </div>
          ) : null}

          {cart?.items?.length ? (
            <React.Fragment>
              {this.context.state.showMessage ? <div className={'px-2-4 py-2-4'}>
                <Snippets.Heading size={'h5'} tag={'p'} className={'text-error'}>
                  {this.context.state.message === 'CART_ITEM_ADDED_QTY_NOT_AVAILABLE' ? 'Item quantity not available' : ''}
                  {this.context.state.message === 'CART_ITEM_REACHED_MAX_QTY' ? 'You have reached the maximum order quantity for this product' : ''}
                </Snippets.Heading>
              </div> : (
                <div className={'overflow-y-auto px-2-4 pt-0 text-black hide-scrollbar max-h-drawer'}>
                  {
                    cart?.items?.filter((lineitem) => !lineitem.properties._gift)
                      .map((lineitem: LineItem, i: number) => {
                        return (
                          <React.Fragment key={lineitem.key}>
                            <div
                              className={`flex flex-wrap ${greyed.includes(lineitem.key) ? 'pointer-events-none opacity-50' : ''} border-b border-grey-border`}
                            >
                              <div className={'pb-2-3 pt-2-4 w-full'}>
                                <div className={'flex w-full'}>
                                  <div className={'w-1/2 md:w-3/10'}>
                                    <a
                                      href={lineitem.url}
                                      title={`View ${lineitem.product_title}`}
                                      className={'block no-underline border border-grey-border w-full relative'}
                                    >
                                      <Snippets.Image
                                        alt={`${lineitem.product_title} featured image`}
                                        src={lineitem.image}
                                        ratio={'1:1'}
                                        className={'relative'}
                                      />
                                      {lineitem?.properties?.ribbon ? (
                                        <div className="absolute inset-0">
                                          <Snippets.Image
                                            ratio={'1:1'}
                                            alt={`${lineitem.product_title} featured image`}
                                            src={`${awsUrl}_${lineitem.product_title}_${lineitem.variant_options[0]}_${lineitem?.properties?.ribbon}_2.png?t=${Date.now()}`}
                                            preventLazy
                                          />
                                        </div>
                                      ) : null}
                                    </a>
                                  </div>
                                  <div className={'w-1/2 md:w-7/10 ml-2 flex flex-col relative'}>
                                    <div className={'w-full'}>
                                      <a
                                        href={lineitem.url}
                                        title={lineitem.product_title}
                                        className={'block text-black no-underline text-sm mb-1'}
                                      >
                                        <Snippets.Heading
                                          size={'h3'}
                                          tag={'p'}
                                          className={'mb-1'}
                                        >
                                          {lineitem.product_title}
                                        </Snippets.Heading>
                                        <Snippets.CartItemOptions lineitem={lineitem} />
                                      </a>
                                    </div>
                                    <div className={'w-full'}>
                                      <div className={'flex flex-wrap md:flex-no-wrap'}>
                                        <Snippets.CartItemQty
                                          currentQuantity={lineitem.quantity}
                                          cartChange={this.handleQtyChange}
                                          lineitem={lineitem}
                                          className={'flex items-center justify-center px-1 py-0-4'}
                                          mini
                                        />
                                        <div className={'w-full flex items-center justify-start md:justify-end pt-0-6 md:pt-0'}>
                                          <Snippets.CartItemPrice
                                            lineitem={lineitem}
                                            inline={true}
                                            textRight
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {
                              settings.enable_hatboxes &&
                              requiresShipping &&
                              hatboxBasedProductPrice && lineitem.compare_at_price < lineitem.price ? (
                                  <GiftWithPurchaseDrawer
                                    tags={lineitem.tags}
                                    quantity={lineitem.quantity}
                                    lineitem={lineitem}
                                  />
                                ) : null}
                          </React.Fragment>
                        )
                      })
                  }
                  {
                    settings?.enable_price_based &&
                    (!settings?.price_disable_if_all_sale_items_in_cart || this.state.hasFullPriceItems) &&
                    requiresShipping &&
                    cart?.item_count > 0 &&
                    convertCurrency(priceBasedCart) >= Number(settings.gift_price_based_threshold) && this.state.giftProducts ? (
                        <GiftsDrawer
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
                        <GiftsDrawer
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
                        <GiftsDrawer
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
              )}
              <div className={'flex-shrink p-2-4 text-black pt-2-4'}>
                <div className={'flex mb-0-8'}>
                  <div className={'w-1/2 text-sm'}>
                    <Snippets.Heading size={'h3'} tag={'p'} className={'leading-closer'}>
                      {'SUBTOTAL'}
                    </Snippets.Heading>
                  </div>
                  <div className={'w-1/2 text-right'}>
                    <Snippets.Heading size={'h3'} tag={'p'} className={'leading-closer'}>
                      {cart && <Snippets.Money price={cart.total_price} />}
                    </Snippets.Heading>
                  </div>
                </div>

                <div className={`flex ${showCartMessage ? 'mb-0-8' : 'mb-2-4'}`}>
                  <Snippets.Heading
                    size={'none'}
                    tag={'p'}
                    className={'font-light text-xs leading-tight'}
                  >
                    {'Shipping calculated at checkout'}
                  </Snippets.Heading>

                </div>

                {(showCartMessage && settings.cart_message && settings.info_url && settings.info_text) ? <div className={'mb-1-6'}>
                  <Snippets.Heading size={'none'} tag={'p'} className={'inline'}>
                    {settings.cart_message}
                  </Snippets.Heading>
                  <Snippets.Link href={settings.info_url} className={'inline underline ml-0-4'}>
                    {settings.info_text}
                  </Snippets.Link>
                </div> : null}

                <Snippets.Button
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
                      this.state.itemsQualifiedForGift,
                    )
                    window.location.href = '/checkout'
                  }}
                  disabled={this.addingGifts}
                  title={'Checkout'}
                  className={'w-full h-5-6 flex items-center justify-between bg-black text-white px-1-6 mb-2'}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>
                    {'Checkout'}
                  </Snippets.Heading>
                  <Snippets.Icon width={18} height={8} name={'chevron_right'} />
                </Snippets.Button>
                <Snippets.Button
                  title={'Go to cart'}
                  colour={'blank'}
                  href={'/cart'}
                  className={'border border-black w-full h-4-8 py-0-8 flex items-center justify-center bg-white text-black px-1-6'}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>view bag</Snippets.Heading>
                </Snippets.Button>
              </div>
            </React.Fragment>
          ) : (
            <div className={'flex items-center justify-center text-center py-4 px-8-5 text-black'}>
              <div className={'w-full'}>
                {this.context.state.showMessage ? (
                  <Snippets.Heading size={'h5'} tag={'p'} className={'text-error leading-close mb-2-4'}>
                    {this.context.state.message === 'CART_ITEM_ADDED_QTY_NOT_AVAILABLE' ? 'Item quantity not available' : ''}
                    {this.context.state.message === 'CART_ITEM_REACHED_MAX_QTY' ? 'You have reached the maximum order quantity for this product' : ''}
                  </Snippets.Heading>
                ) : (
                  <Snippets.Heading size={'p'} tag={'p'} className={'leading-close mb-2-4'}>
                    {'There are no items in your cart'}
                  </Snippets.Heading>
                )}
                <Snippets.Button
                  title={'Continue Shopping'}
                  colour={'blank'}
                  className={'border border-black w-full h-4-8 py-0-8 flex items-center justify-center bg-white text-black px-1-6'}
                  onClick={this.toggleCartDrawer}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>Continue Shopping</Snippets.Heading>
                </Snippets.Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  private toggleCartDrawer = () => {
    this.context.update({ cartActive: false })
  };

  private handleRemove = async (key: string): Promise<any> => {
    this.toggleGrey(key)
    await ShopifyNext.Cart.removeItem(key)
    this.toggleGrey(key)
  };

  private handleQtyChange = async (qty: number, item: LineItem): Promise<any> => {
    const { limitedCartItems } = this.context.state

    const variantId = item.variant_id
    const maximumQuantity = Helpers.getMaxSelectableQuantity(item)
    const currentTotalItemQuantity = limitedCartItems[`${variantId}`] || 0
    const currentItemQuantity = item.quantity
    const hasReachedMaximumQty = maximumQuantity < currentTotalItemQuantity - currentItemQuantity + qty

    if (!hasReachedMaximumQty) {
      ShopifyNext.Cart.updateQty(item.key, qty)
    }
  };

  private toggleGrey = (key: string): void => {
    this.setState((prevState) => {
      const index = prevState.greyed.indexOf(key)
      if (index > -1) {
        prevState.greyed.splice(index, 1)
      } else {
        prevState.greyed.push(key)
      }
      return {
        greyed: prevState.greyed
      }
    })
  };
}

export namespace CartDrawer {
  export interface Props extends GlobalProps { }
  export interface State extends GlobalState {
    cart: any;
    hasFullPriceItems: boolean;
    greyed: string[];
    cartCurrency: string
    giftProducts: JSONProduct[];
    productGiftProducts: JSONProduct[];
    collectionGiftProducts: JSONProduct[];
    disabledCollectionGifts: Array<string>;
    disabledProductGifts: Array<string>;
    disabledPriceGifts: Array<string>;
    stickyNav: boolean;
    itemsQualifiedForGift: number;
  }
}
