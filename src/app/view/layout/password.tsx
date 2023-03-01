import * as React from 'react'

import { GlobalProps } from 'types'

export class Password extends React.Component<Password.Props, Password.State> {
  public render(): JSX.Element {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

export namespace Password {
  export interface Props extends GlobalProps {}
  export interface State {}
}
