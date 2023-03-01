import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class GiftCardTemplate extends React.Component<GiftCardTemplate.Props, GiftCardTemplate.State> {
  public render(): JSX.Element {
    return (
      <Layouts.GiftCard {...this.props}>
        <Snippets.PageTitle title={'Gift Card'} content={null} />
      </Layouts.GiftCard>
    )
  }
}

export namespace GiftCardTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
