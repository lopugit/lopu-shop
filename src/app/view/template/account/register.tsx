import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

import { GlobalProps } from 'types'

export class AccountRegisterTemplate extends React.Component<AccountRegisterTemplate.Props, AccountRegisterTemplate.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      acceptMarketing: true
    }
    if (this.props.data.customer.id) {
      this.props.history.push('/account')
    }
  }

  public render(): JSX.Element {
    const { create_customer: form } = this.props.data.form
    return (
      <Layouts.Theme {...this.props}>
        <main className={'w-full'}>
          {this.props.data.shop.customer_accounts_enabled ? (
            <div className={'mx-1-6 md:mx-auto max-w-sm md:pt-5 pb-19 flex flex-col align-center'}>
              <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-4 text-center'}>
                Register
              </Snippets.Heading>
              <ShopifyNext.Components.Forms
                data={form}
                className={'w-full mx-auto'}
              >
                <Snippets.FormErrors form={form} />
                <input type="hidden" name="customer[accepts_marketing]" value="" />
                <Snippets.Input
                  name="customer[first_name]"
                  id="first_name"
                  type="text"
                  placeholder="First name"
                  className={'h-6 border border-grey-border flex items-center'}
                  required
                  hideLabel
                />
                <Snippets.Input
                  name="customer[last_name]"
                  id="last_name" type="text"
                  placeholder="Last name"
                  className={'h-6 border border-grey-border flex items-center'}
                  required
                  hideLabel
                />
                <Snippets.Input
                  name="customer[email]"
                  id="customer_email"
                  type="email"
                  placeholder="Email address"
                  className={'h-6 border border-grey-border flex items-center'}
                  required
                  hideLabel
                />
                <Snippets.Input
                  name="customer[password]"
                  id="customer_password"
                  type="password"
                  placeholder="Password"
                  className={'h-6 border border-grey-border flex items-center'}
                  required
                  hideLabel
                />
                <div className={'my-2'} onClick={this.checkMarketing}>
                  <label htmlFor="accepts_marketing" className={'block text-navy text-xs md:text-sm flex flex-row items-center'}>
                    <input
                      name="customer[accepts_marketing]"
                      id="accepts_marketing"
                      type="hidden"
                      value={this.state.acceptMarketing.toString()}
                    />
                    <Snippets.Icon className={'mr-1-2'} name={this.state.acceptMarketing ? 'checkbox_yes' : 'checkbox_no'} height={20} width={20}></Snippets.Icon>
                    <Snippets.Heading size={'p'} tag={'p'} className={'leading-normal'}>Sign me up to the Lopu newsletter</Snippets.Heading>
                  </label>
                </div>
                <Snippets.Button
                  title={'create account'}
                  className={'w-full py-0-8 flex items-center justify-between bg-black text-white px-1-6 mb-0-4'}
                  type="submit"
                  colour={'blank'}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>create account</Snippets.Heading>
                  <Snippets.Icon width={40} name={'chevron_right_reverse'} ariaHidden />
                </Snippets.Button>
              </ShopifyNext.Components.Forms>
              <div className={'text-sm text-black md:mb-2'}>
                <span>Already have an account? </span>
                <a href={'/account/login'} className={'inline-block text-navy font-medium cursor-pointer hover:text-black underline'}>
                  Sign in
                </a>
              </div>
              <Snippets.Heading size={'h4'} tag={'p'} className={'mt-1-6 mb-1-6 text-center'}>OR</Snippets.Heading>
              <Snippets.SocialLogin {...this.props} />
            </div>
          ) : (
            <div className={'w-full max-w-container mx-auto py-12 px-1-2 md:px-3-2 text-center'}>
              <p className={'font-semibold'}>Customer accounts are disabled</p>
            </div>
          )}
        </main>
      </Layouts.Theme>
    )
  }

  private checkMarketing = () => {
    this.setState((prevState) => {
      return {
        acceptMarketing: !prevState.acceptMarketing
      }
    })
  };

}

export namespace AccountRegisterTemplate {
  export type Options = ShopifyNext.Section<{
    register: any;
  }>;
  export interface Props extends GlobalProps {
    section: AccountRegisterTemplate.Options;
  }
  export interface State {
    acceptMarketing: boolean;
  }
}
