import * as React from 'react'

import { GlobalProps } from 'types'

export class Checkout extends React.Component<Checkout.Props, Checkout.State> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export namespace Checkout {
  export interface Props extends GlobalProps {
    title: string;
  }
  export interface State {}
}
