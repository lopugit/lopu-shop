import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'

export class HeaderAccount extends React.PureComponent<HeaderAccount.Props, HeaderAccount.State> {
  public static contextType = ShopifyNext.Context;

  private toggleReset = () => {
    this.props.history.push('/account/login#recover')
  }
  public render(): JSX.Element {
    const { data, className } = this.props
    return (
      <div className={`${className ? `${className}` : ''} w-full bg-white`}>
        <div className={'flex w-full pt-3-2 text-black max-w-7xl mx-auto'}>
          {!data.customer && <div className={'w-1/2'}>
            <div className={'w-5/6 px-1-6 xl:pl-0 xl:pr-1-6'}>
              <div className={''}>            
                <Snippets.Heading
                  size={'h3'}
                  tag={'h3'}
                  className={'mb-0-2'}
                >
                Sign In
                </Snippets.Heading>
                <Snippets.Heading
                  size={'h6'}
                  tag={'p'}
                  className={'mb-1-6 leading-snug'}
                >
                Please enter your email and password below to access your account.
                </Snippets.Heading>
              </div>
              <Snippets.SignInForm {...this.props} loginForm={data.form.customer_login} recoverForm={data.form.recover_customer_password} toggleReset={this.toggleReset} />
            </div>
          </div>}
          <div className={`${!data.customer ? 'w-1/2': 'w-full px-1-6 pb-3-2'} xl:pl-1-2 flex flex-row`}>
            {data.customer && <Snippets.HeaderAccountNavigation />}
            <Snippets.HeaderWishlist {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export namespace HeaderAccount {
  export interface Props extends GlobalProps {
    className?: string
  }
  export interface State { }
}
