import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

export class AccountWishlist extends React.Component<AccountWishlist.Props, AccountWishlist.State> {
  public static contextType = ShopifyNext.Context;
  public constructor(props: any) {
    super(props)
    this.state = {
      shareLink: null,
      products: null,
    }
  }

  public componentDidUpdate = async () => {
    if (this.context.state.wishlist) {
      if (!this.state.products || this.state.products.length != this.context.state.wishlist.items.length) {
        this.setState({
          products: this.context.state.wishlist.items
        })
      }
    }
    if (!this.context.state.wishlistShareURL) {
      await ShopifyNext.Wishlist.share('link')
      this.setState({
        shareLink: this.context.state.wishlistShareURL
      })

    }
  }

  public removeProduct = (productId: number, variantId: number) => ShopifyNext.Wishlist.removeItem(productId, variantId)

  public render(): JSX.Element {
    const { shareLink, products } = this.state

    return (
      <React.Fragment>
        <div className={'hidden md:block absolute top-0 inset-x-0 z-10 bg-white px-1-7 md:px-0 flex flex-between'}>
          <Snippets.Heading size={'h1'} tag={'h1'} className={'w-full md:pb-3-2 md:border-b md:border-grey-border mb-3-2'}>Wishlist</Snippets.Heading>
          {products && products.length ? <Snippets.AccountWishlistSharelink className={'hidden md:flex absolute top-0 right-0 flex-row justify-end items-center'} shareLink={shareLink} /> : null}
        </div>
        <div className={'w-full flex flex-wrap mt-5-2 md:mt-0'}>
          {products && products.length ? products.map(item => {
            const { productId, variantId, product, variant } = item
            return (
              <Snippets.AccountWishlistItem
                key={`${productId} ${variantId}`}
                {...this.props}
                productId={productId}
                variantId={variantId}
                product={{ ...product, selected_or_first_available_variant: variantId }}
                variant={variant}
                removeProduct={this.removeProduct} />
            )
          }) : <Snippets.Heading size={'h2'} tag={'p'} className={'pb-2-4'}>Your Wishlist is empty</Snippets.Heading>}
          {products && products.length ? <Snippets.AccountWishlistSharelink className={'flex md:hidden flex-row justify-center items-center'} shareLink={shareLink} /> : null}
        </div>
      </React.Fragment>
    )
  }
}

export namespace AccountWishlist {
  export interface Props extends GlobalProps { }
  export interface State {
    shareLink: any;
    products: any;
  }
}
