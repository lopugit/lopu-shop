import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'

export class CheckoutTemplate extends React.Component<CheckoutTemplate.Props, CheckoutTemplate.State> {
  public render(): JSX.Element {
    return <Layouts.Checkout {...this.props} title="Checkout" />
  }
}

export namespace CheckoutTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
