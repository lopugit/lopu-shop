import * as React from 'react'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

import { GlobalProps } from 'types'

export class AccountLogoutTemplate extends React.Component<AccountLogoutTemplate.Props, AccountLogoutTemplate.State> {
  public render(): JSX.Element {
    return (
      <Layouts.Theme {...this.props}>
        <Snippets.PageTitle title={'Logout'} content={null} />
      </Layouts.Theme>
    )
  }
}

export namespace AccountLogoutTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
