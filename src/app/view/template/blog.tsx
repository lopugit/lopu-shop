import * as React from 'react'
import { GlobalProps } from 'types'
import { GeneralBlogTemplate } from './blog/general-blog'

export class BlogTemplate extends React.Component<BlogTemplate.Props, BlogTemplate.State> {
  public render(): JSX.Element {
    const templates: any = {}
    return templates[this.props.data.template.suffix] || <GeneralBlogTemplate {...this.props} />
  }
}

export namespace BlogTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
