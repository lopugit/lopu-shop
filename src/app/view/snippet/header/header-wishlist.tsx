import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class HeaderWishlist extends React.PureComponent<HeaderWishlist.Props, HeaderWishlist.State> {
  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props) {
    super(props)
    this.state = {
      wishlist: []
    }
  }

  public componentDidUpdate = async () => {
    if (this.context.state && this.context.state.wishlist && this.context.state.wishlist.items && this.context.state.wishlist.items.length !== this.state.wishlist.length) {
      const items = this.context.state.wishlist.items.map(item => item.product)
      if (items.length > 0) {
        const wishlist = await this.getSwatchdata(items)
        this.setState({
          wishlist,
        })
      } else {
        this.setState({
          wishlist: []
        })
      }
    }
  }

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await HeaderWishlist.kewl.productsBySwatchTags(tags)
    const newProducts = []
    products.forEach(product => {
      const underlinedHandle = product.handle.replace(/\-/g, '_')// eslint-disable-line no-useless-escape
      const siblingsQuantity = siblingsResults[underlinedHandle].length
      const filteredSiblings = siblingsResults[underlinedHandle].filter(sibling => sibling.handle !== product.handle)
      newProducts.push({ ...product, siblingsQuantity: siblingsQuantity, filteredSiblings: filteredSiblings })
    })
    return newProducts
  }

  public render(): JSX.Element {
    const { wishlist } = this.state
    const limit = this.props.data.customer ? (window.innerWidth > 900 ? 6 : 4) : (window.innerWidth > 900 ? 3 : 2)
    return (
      <div className={'w-full flex flex-col'}>
        <Snippets.Heading
          size={'h3'}
          tag={'h3'}
          className={'mb-3-2'}
        >
          Wishlist
        </Snippets.Heading>
        <div className={'mb-1-6 flex flex-wrap w-full'}>
          {wishlist && wishlist.length > 0 ? (
            wishlist.slice(0, limit).map((item: any, i) => {
              return (
                <div key={item.handle} className={`${this.props.data.customer ? (window.innerWidth > 900 ? 'w-1/6' : 'w-1/4') : (window.innerWidth > 900 ? 'w-1/3' : 'w-1/2')} pr-1-6`}>
                  <Snippets.CollectionProduct
                    collection={Helpers.check(this, 'this.props.data.collection') ? this.props.data.collection : null}
                    product={{ ...item, tags: item.tags_array, price: item.price_min, compare_at_price: item.compare_at_price_max }}
                    layout={'wishlist'}
                    list="Wishlist"
                    border
                    small
                    preventLazy
                    multiCurrencyTransform
                  />
                </div>
              )
            })
          ) : (
            <h2>Your Wishlist is empty!</h2>
          )}
        </div>
        {wishlist && wishlist.length > 0 && <Snippets.Button href={this.props.data.customer ? '/account?view=wishlist' : ShopifyNext.Wishlist.getURL()} title={'View all wishlist items'} colour={'blank'}>
          <Snippets.Heading size={'h5'} tag={'p'}>View All</Snippets.Heading>
        </Snippets.Button>}
      </div>
    )
  }
}

export namespace HeaderWishlist {
  export interface Props extends GlobalProps { }
  export interface State {
    wishlist: any
  }
}
