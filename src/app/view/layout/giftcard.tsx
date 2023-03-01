import * as React from 'react'
import * as Sections from 'sections'

import { GlobalProps } from 'types'

export class GiftCard extends React.Component<GiftCard.Props, GiftCard.State> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Sections.Header {...this.props} section={this.props.data.section.header} />
        {this.props.children}
        <Sections.Footer {...this.props} section={this.props.data.section.footer} />
      </React.Fragment>
    )
  }
}

export namespace GiftCard {
  export interface Props extends GlobalProps {}
  export interface State {}
}
