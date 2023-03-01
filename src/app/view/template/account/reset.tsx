import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'

export class AccountResetTemplate extends React.Component<AccountResetTemplate.Props, AccountResetTemplate.State> {
  public constructor(props: any) {
    super(props)
    this.state = { errors: this.form.errors }
    if (!this.form.data) {
      this.props.history.push('/account/login')
    }
  }
  private form: any = this.props.data.form.reset_customer_password;

  public render(): JSX.Element {
    return (
      <Layouts.Theme {...this.props}>
        <main className={'w-full max-w-xs mx-auto py-10 md:py-20'}>
          <div>
            <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-4 text-center'}>
              Reset Password
            </Snippets.Heading>
            {this.form.posted_successfully ? (
              <p className={'text-black text-center mb-4'}>Your password has been successfully saved.</p>
            ) : null}
            <ShopifyNext.Components.Forms data={this.form} className={'w-full max-w-sm mx-auto'}>
              <Snippets.FormErrors form={this.form} />
              <Snippets.Input
                name="customer[password]"
                id="reset_password"
                type="password"
                placeholder="Enter a new password"
                required
                hideLabel
                className={'mb-1-6 border border-grey-border'}
              />
              <Snippets.Input
                name="customer[password_confirmation]"
                id="password_confirmation"
                type="password"
                placeholder="Confirm your password"
                required
                hideLabel
                className={'mb-1-6 border border-grey-border'}
              />
              <Snippets.Button
                title={'Update Password'}
                className={'w-full py-0-4 flex items-center justify-between bg-black text-white px-1-6'}
                type="submit"
                colour={'blank'}
              >
                <Snippets.Heading size={'h5'} tag={'p'}>Update Password</Snippets.Heading>
                <Snippets.Icon width={40} name={'chevron_right_reverse'} ariaHidden/>
              </Snippets.Button>
            </ShopifyNext.Components.Forms>
          </div>
        </main>
      </Layouts.Theme>
    )
  }

}

export namespace AccountResetTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    errors: any;
  }
}
