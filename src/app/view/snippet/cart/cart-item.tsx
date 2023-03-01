import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, LineItem } from 'types'
import * as Snippets from 'snippets'
import { GiftWithPurchase } from './gift-with-purchase'
const awsUrl = '//lopu-shop-images.s3.ap-southeast-2.amazonaws.com/ribbon'
export class CartItem extends React.PureComponent<CartItem.Props, CartItem.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: CartItem.Props) {
    super(props)

    this.state = {
      currentQuantity: this.props.quantity,
    }
  }

  public render(): JSX.Element {
    const { lineitem, data, fullPriceCart, requiresShipping } = this.props
    const cartPriceQualified = !data.settings.enable_threshold_based_product_price && data.settings.enable_hatboxes && fullPriceCart >= Number(data.settings.hatbox_price_threshold)  && lineitem.compare_at_price < lineitem.price && lineitem.properties?._gift_opt_out != 'yes'
    const productPriceQualified = data.settings.enable_threshold_based_product_price && data.settings.enable_hatboxes && lineitem.price >= Number(data.settings.hatbox_price_threshold)  && lineitem.compare_at_price < lineitem.price && lineitem.properties?._gift_opt_out != 'yes'

    return (
      <React.Fragment key={lineitem.key}>
        <div className={'w-full flex flex-row px-1-6 md:px-0 pb-2-3 pt-2-6 md:pt-2 md:pb-2 md:border-b md:border-grey-border relative'}>
          <div className={'absolute top-0 right-0 pt-2-6 pr-1-6 block md:hidden z-10'}>
            <Snippets.CartItemRemove
              lineitem={lineitem}
              handleRemove={this.handleRemove}
            >
              <Snippets.Icon name={'cross'} width={16} />
            </Snippets.CartItemRemove>
          </div>
          <div className={'w-1/2 md:w-2/12 pr-0-9 md:pr-1-8'}>
            <a
              href={lineitem.url}
              title={lineitem.product_title}
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

          <div className={'w-1/2 md:w-10/12 flex items-center relative'}>
            <div className={'w-full h-full md:h-auto flex flex-wrap items-start pl-1 md:pl-0'}>
              <div className={'w-8/9 md:w-3/10 md:pl-0-6'}>
                <a
                  href={lineitem.url}
                  title={lineitem.product_title}
                  className={'block transition-fast no-underline text-base leading-normal tracking-normal mb-1 md:mb-0'}
                >
                  <Snippets.Heading size={'h2'} tag={'p'} className={'mb-0-8'}>{lineitem.product_title}</Snippets.Heading>
                  <Snippets.CartItemOptions
                    lineitem={lineitem}
                    className={'text-sm'}
                  />
                </a>
              </div>
              <div className={'w-full md:w-3/10'}>
                <Snippets.CartItemPrice
                  lineitem={lineitem}
                />
              </div>

              <div className={'w-full md:w-1/10'}>
                <Snippets.CartItemQty
                  currentQuantity={this.state.currentQuantity}
                  cartChange={this.handleQtyChange}
                  lineitem={lineitem}
                />
              </div>

              <div className={'hidden w-3/10 md:flex justify-end'}>
                <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>
                  <Snippets.Money price={lineitem.price * lineitem.quantity} />
                </Snippets.Heading>
              </div>
            </div>
            <div className={'hidden md:block absolute bottom-0 left-0 pl-0-6 pb-0-4'}>
              <Snippets.Button
                title={'Remove'}
                colour={'blank'}
                onClick={() => this.handleRemove(lineitem.key)}
                className={'mr-1-6'}
              >
                <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>Remove</Snippets.Heading>
              </Snippets.Button>
              <Snippets.Button
                title={'add to wishlist'}
                colour={'blank'}
                onClick={() => this.handleAddtoWishlist(lineitem.product_id, lineitem.variant_id, lineitem.key)}
              >
                <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>Move to wishlist</Snippets.Heading>
              </Snippets.Button>
            </div>
          </div>
          <Snippets.Button
            title={'add to wishlist'}
            colour={'blank'}
            className={'block md:hidden absolute bottom-0 left-0 pl-1-6'}
            onClick={() => this.handleAddtoWishlist(lineitem.product_id, lineitem.variant_id, lineitem.key)}
          >
            <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>Move to wishlist</Snippets.Heading>
          </Snippets.Button>
        </div>
        {cartPriceQualified || productPriceQualified ? (
          <GiftWithPurchase 
            quantity={lineitem.quantity}
            tags={lineitem.tags}
            lineitem={lineitem}
          />
        ) : null}
      </React.Fragment>
    )
  }

  private handleQtyChange = (qty: number): void => {
      if (qty <= 2) {
        ShopifyNext.Cart.updateQty(this.props.lineitem.key, qty)
        this.setState({
        currentQuantity: qty
        })
      }
  };

  private handleRemove = (key: string): void => {
    ShopifyNext.Cart.removeItem(key)
    this.setState({ currentQuantity: 0 })
  };

  private handleAddtoWishlist = (product_id: number, variant_id: number, key: string): void => {
    ShopifyNext.Wishlist.addItem(product_id, variant_id)
    this.handleRemove(key)
  }
}

export namespace CartItem {
  export interface Props extends GlobalProps {
    key: string;
    lineitem: LineItem;
    quantity: number;
    removeItem?: any;
    fullPriceCart: number;
    requiresShipping: boolean
  }
  export interface State {
    currentQuantity: number;
  }
}
