import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'

export class PolicyTemplate extends React.Component<PolicyTemplate.Props, PolicyTemplate.State> {
  public render(): JSX.Element {
    return <Layouts.Theme {...this.props} />
  }
}

export namespace PolicyTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
