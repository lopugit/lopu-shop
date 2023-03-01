import * as React from 'react'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

import { GlobalProps } from 'types'

export class AccountLoginTemplate extends React.Component<AccountLoginTemplate.Props, AccountLoginTemplate.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      recover: window.location.hash && window.location.hash.includes('recover')
    }
    if (this.props.data.customer.id) {
      this.props.history.push('/account')
    }
  }

  public render(): JSX.Element {
    const {
      customer_login: loginForm,
      recover_customer_password: recoverForm
    } = this.props.data.form

    return (
      <Layouts.Theme {...this.props}>
        <main className={'w-full'}>
          {this.props.data.shop.customer_accounts_enabled ? (
            <div className={'max-w-sm mx-1-6 md:mx-auto md:pt-5 pb-19 flex flex-col items-center align-center'}>
              <div className={`${this.state.recover ? 'hidden' : ''} w-full`}>
                <Snippets.Heading
                  size={'h1'}
                  tag={'h1'}
                  className={'mb-1-2 md:mb-4 text-center'}
                >
                  Sign In
                </Snippets.Heading>
                <Snippets.Heading
                  size={'p'}
                  tag={'p'}
                  className={'mb-1-2 md:mb-4 leading-normal text-center'}
                >
                  Please enter your email and password below to access your account.
                </Snippets.Heading>
                <Snippets.SignInForm {...this.props} loginForm={loginForm} recoverForm={recoverForm} toggleReset={this.toggleReset} />
              </div>

              <div className={`w-full ${!this.state.recover ? 'hidden' : ''}`}>
                <Snippets.RecoverForm recoverForm={recoverForm} />
              </div>
            </div>
          ) : (
            <div className={'w-full max-w-container mx-auto py-16 px-1-2 md:px-3-2 text-center'}>
              <p className={'font-semibold'}>Customer accounts are disabled</p>
            </div>
          )}
        </main>
      </Layouts.Theme>
    )
  }

  private toggleReset = (): void => {
    this.state.recover ? this.props.history.push('/account/login') : this.props.history.push('/account/login#recover')
    this.setState({ recover: !this.state.recover })
  };
}

export namespace AccountLoginTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    recover: boolean;
  }
}
