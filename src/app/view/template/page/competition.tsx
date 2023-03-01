import { ShopifyNext } from '@dotdev/next-components'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as React from 'react'
import { GlobalProps } from 'types'
import * as Helpers from 'helpers'
export class CompetitionPageTemplate extends React.Component<CompetitionPageTemplate.Props, CompetitionPageTemplate.State> {
  public render(): JSX.Element {
    const { page } = this.props.data
    return (
      <Layouts.Theme {...this.props}>
        {Helpers.check(page, 'page.metafields.dtk.fields.sections') ? (
          <ShopifyNext.Components.DynamicSections
            {...this.props}
            dtkSections={page.metafields.dtk.fields.sections}
          />
        ) : null}
      </Layouts.Theme>
    )
  }
}

export namespace CompetitionPageTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
