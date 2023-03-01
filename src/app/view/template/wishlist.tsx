import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class WishlistTemplate extends React.Component<WishlistTemplate.Props, WishlistTemplate.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return (
      <Layouts.Theme {...this.props}>
        <main className={'max-w-7xl mx-auto px-1-6 md:mt-4 md:pt-12 md:pb-4 relative'}>
          <div className={'md:hidden pt-2'}>
            <Snippets.Heading size={'h1'} tag={'h1'}>
              {'Wishlist'}
            </Snippets.Heading>
          </div>
          <Snippets.AccountWishlist {...this.props}/>
        </main>
      </Layouts.Theme>
    )
  }
}

export namespace WishlistTemplate {
  export interface State {}
  export interface Props extends GlobalProps {}
}
