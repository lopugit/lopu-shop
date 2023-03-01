import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { ShopifyNext } from '@dotdev/next-components'


export class AccountWishlistItem extends React.Component<AccountWishlistItem.Props, AccountWishlistItem.State> {
  public static contextType = ShopifyNext.Context;
  public constructor(props: any) {
    super(props)
    this.state = {
      quantity: 1,
      size: this.props.product.variants.length === 1 ? this.props.product.variants[0].option2 : null,
      variant: {
        ...this.props.product.variants[0],
        available: this.props.product.variants.length === 1 ? this.props.product.variants[0].available : true,
        price: this.props.variant.price,
      }
    }
  }

  private setSize = (ev) => {
    if (ev.target.value) {
      const variant = JSON.parse(ev.target.value)
      this.setState({ size: variant.title, variant: variant })
    }
  };

  public handleQtyChange = (type: '+' | '-'): void => {
    const { quantity, variant } = this.state
    let newQuantity: number = quantity

    type == '+' && quantity + 1 <= variant.inventory_quantity ? (newQuantity = newQuantity + 1) : null
    type == '-' && quantity > 1 ? (newQuantity = newQuantity - 1) : null

    quantity != newQuantity ? this.setState({ quantity: newQuantity }) : null
  };

  private handleAddToCart = async (event: any) => {
    event.preventDefault()
    const { limitedCartItems } = this.context.state
    const variantId = parseInt(event.currentTarget.id, 10)
    const maximumQuantity = Helpers.DEFAULT_MAX_SELECTABLE_QTY
    const currentTotalItemQuantity = limitedCartItems[`${variantId}`] || 0
    const hasReachedMaximumQty = maximumQuantity < currentTotalItemQuantity + this.state.quantity

    if (!hasReachedMaximumQty) {
      await ShopifyNext.Cart.addItem(parseInt(event.currentTarget.id, 10), this.state.quantity)
      this.context.update({
        cartActive: true,
        showMessage: true
      })
    } else {
      this.context.update({
        cartActive: true,
        message: 'CART_ITEM_REACHED_MAX_QTY',
        showMessage: true
      })
    }

    
    setTimeout(() => {
      this.context.update({
        showMessage: false
      })
    }, 3000)
  }

  public render(): JSX.Element {
    const { productId, variantId, product } = this.props
    const { variant, quantity, size } = this.state
    const image =
      product.images && product.images[0]
        ? product.images[0].src
          ? product.images[0].src
          : product.images[0]
        : null
    const hoverimage =
      product.images && product.images.length > 1 && product.images[1]
        ? product.images[1].src
          ? product.images[1].src
          : product.images[1]
        : null

    return (
      <div key={product.productId} className={'w-full md:w-1/3 md:px-1-2 mb-4 md:mb-2-4'}>
        <div className={'relative flex flex-wrap h-full md:border md:border-grey-border group'}>
          <div className={'absolute top-0 right-0 text-black md:pr-1-6 md:pt-1-6 z-10'}>
            <Snippets.Button
              title={'Remove from wishlist'}
              colour={'link'}
              onClick={() => {
                this.props.removeProduct(productId, variantId)
              }}
            >
              <Snippets.Icon
                name={'cross'}
                width={14}
                height={14}
                className={'text-black'}
              />
            </Snippets.Button>
          </div>
          <div className={'w-1/2 md:w-full relative md:border-b border-grey-border pr-1 md:pr-0'}>
            <Snippets.BlockImage
              alt={product.title || "wishlist product image"}
              image={image}
              hoverImage={hoverimage}
              ratio={'1:1'}
              href={product.url}
              className={'border border-grey-border md:border-0'}
            />
            <div className={'absolute inset-0'}>
              {product.tags_array ? product.tags_array.map((tag: string) => {
                if (tag.includes('badge:')) {
                  const tagsWithCustomStyles = {
                    'Final Sale-grey': {
                      bgColor: 'bg-grey-badge-dark',
                      textColor: 'text-white',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                    'Final Sale-red': {
                      bgColor: 'bg-red',
                      textColor: 'text-white',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                  }
                  const badgeKey = tag.split(':')[1];
                  const badgeText = badgeKey.includes('-') ? badgeKey.split('-')[0] : badgeKey;
                  const badgeBg = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].bgColor : 'bg-grey'
                  const badgeCol = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].textColor : 'text-white'

                  return (
                    <div
                      key={tag}
                      className={'inline-block rounded mb-0-8 uppercase px-2-4 py-0-1 mr-0-8 ' + badgeBg}
                    >
                      {tagsWithCustomStyles[badgeKey] && tagsWithCustomStyles[badgeKey].isLink ? (
                        <a className={'inline-block text-xs font-bold tracking-widest font-rounded pb-0-2 ' + badgeCol} href={tagsWithCustomStyles[badgeKey].link}>
                          {badgeText}
                        </a>
                      ) : (
                        <span className={'inline-block text-xs font-bold tracking-widest font-rounded pb-0-2 ' + badgeCol}>
                          {badgeText}
                        </span>

                      )}
                    </div>
                  )
                }
                return null
              }) : null}
            </div>
          </div>
          <div className={'w-1/2 md:w-full pl-0-4 md:pl-0'}>
            <a href={`/products/${product.handle}`} title={product.title} className={'block md:pt-2 md:px-1-6 pb-1-3 md:pb-1-7'}>
              <div className={'flex flex-row justify-between mb-0-4 md:mb-0-6'}>
                {product.title ? (
                  <Snippets.Heading size={'h2'} tag={'h3'} className={'w-4/5'}>
                    {product.title}
                  </Snippets.Heading>
                ) : null}
              </div>
              <div className={'flex flex-row justify-between'}>
                <Snippets.ProductPrice
                  {...this.props}
                  variant={variant}
                  layout={'product'}
                  multiCurrencyTransform
                />
              </div>
            </a>
            <div className={'md:px-1-6'}>
              <div className={'mb-1-6 w-full md:w-2/3 md:mr-0-8 h-4 border border-grey-border font-bold'}>
                <div className={'w-full h-full relative'}>
                  <select
                    onChange={e => this.setSize(e)}
                    name="size"
                    id="size"
                    className={'pl-1-2 w-full h-full appearance-none bg-white'}
                    required
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {product.variants && product.variants.length > 1
                      ? <React.Fragment>
                        <option>SELECT A SIZE</option>
                        {product.variants.map((variant: any): JSX.Element => {
                          return (
                            <option key={variant.id} value={JSON.stringify(variant)}>
                              {variant.option2 ? variant.option2 : variant.title}
                            </option>
                          )
                        }
                        )}</React.Fragment>
                      : <option value={JSON.stringify(variant)}>One Size</option>}
                  </select>
                  {product.variants && product.variants.length > 1 && <span className={'absolute text-black'} style={{ right: '16px', top: '10px' }}>
                    <Snippets.Icon name="chevron_down" width={12} height={18} />
                  </span>}
                </div>
              </div>
              <Snippets.ProductQuantity
                quantity={quantity}
                max={variant.inventory_quantity >= 2 ? 2 : variant.inventory_quantity }
                toggleQuantity={this.handleQtyChange}
                hideLabel
              />
            </div>
          </div>
          <Snippets.ProductAddToCart
            {...this.props}
            className={'w-full'}
            variant={variant}
            quantity={quantity}
            handleAddToCart={this.handleAddToCart}
            outofstock={size && !variant.available}
            disabled={!size}
            text={'Move to bag'}
            showIcon
          />
        </div>
      </div>
    )
  }
}

export namespace AccountWishlistItem {
  export interface Props extends GlobalProps {
    productId: number
    variantId: number
    product: any
    variant: any
    removeProduct: (productId: number, variantId: number) => void
  }
  export interface State {
    quantity: number;
    size: string;
    variant: any;
  }
}
