import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'

export class ChallengeTemplate extends React.Component<ChallengeTemplate.Props, ChallengeTemplate.State> {
  public render(): JSX.Element {
    return <Layouts.Theme {...this.props} />
  }
}

export namespace ChallengeTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
