import * as React from 'react'
import { GlobalProps } from 'types'
import { DefaultCollectionTemplate } from './collection/default'
import { LandingCollectionTemplate } from './collection/landing'

export class CollectionTemplate extends React.Component<CollectionTemplate.Props, CollectionTemplate.State> {
  public render(): JSX.Element {
    const matrix: { [landing: string]: JSX.Element } = {
      landing: <LandingCollectionTemplate {...this.props} />,
    }

    return matrix[this.props.data.template.suffix] || <DefaultCollectionTemplate {...this.props} />
  }
}

export namespace CollectionTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
