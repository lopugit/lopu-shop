import * as React from 'react'
import { GlobalProps } from 'types'
import { FlexiblePageTemplate } from './page/flexible'
import { StylesPageTemplate } from './page/styles'
import { GenericPageTemplate } from './page/generic'
import { StoresPageTemplate } from './page/stores'
import { ContactPageTemplate } from './page/contact'
import { CompetitionPageTemplate } from './page/competition'
import { CheckBalancePageTemplate } from './page/riseAiCheckBalance'

export class PageTemplate extends React.Component<PageTemplate.Props, PageTemplate.State> {
  public render(): JSX.Element {
    const templates: any = {
      flexible: <FlexiblePageTemplate {...this.props} />,
      stores: <StoresPageTemplate {...this.props} />,
      styles: <StylesPageTemplate {...this.props} />,
      contact: <ContactPageTemplate {...this.props} />,
      competition: <CompetitionPageTemplate {...this.props} />,
      'rise-ai-check-balance': <CheckBalancePageTemplate {...this.props} />,
    }
    return templates[this.props.data.template.suffix] || <GenericPageTemplate {...this.props} />
  }
}

export namespace PageTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
