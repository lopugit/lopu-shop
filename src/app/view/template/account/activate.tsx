import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

import { GlobalProps } from 'types'

export class AccountActivateTemplate extends React.Component<AccountActivateTemplate.Props, AccountActivateTemplate.State> {
  private form: any = this.props.data.form.activate_customer_password;

  public constructor(props: AccountActivateTemplate.Props) {
    super(props)

    this.state = {
      errors: this.form && this.form.errors ? this.form.errors : null
    }
  }

  public render(): JSX.Element {
    return (
      <Layouts.Theme {...this.props}>
        <main className={'w-full'}>
          <div className={'w-full max-w-container mx-auto py-10 md:py-20 px-1-2 md:px-3-2'}>
            <h1 className={'font-rounded font-medium text-black text-center text-3xl mb-8'}>
              Reset Password
            </h1>
            {this.form.posted_successfully ? (
              <p className={'text-black text-center mb-20'}>
                Your password has been successfully saved.
              </p>
            ) : null}

            <ShopifyNext.Components.Forms data={this.form} className={'w-full max-w-sm mx-auto'}>
              <Snippets.FormErrors form={this.form} />

              <div className={'mb-3'}>
                <label htmlFor="reset_password" className={'block mb-1 text-yellow text-xs'}>
                  Password
                </label>
                <input
                  name="customer[password]"
                  id="reset_password"
                  type="password"
                  placeholder=""
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  required
                  className={'px-5 py-3 h-12 border border-grey-200 rounded-none min-w-full focus:outline-none focus:shadow-outline'}
                />
              </div>
              <div className={'mb-6'}>
                <label htmlFor="password_confirmation" className={'block mb-1 text-yellow text-xs'}>
                  Confirm Password
                </label>
                <input
                  name="customer[password_confirmation]"
                  id="password_confirmation"
                  type="password"
                  placeholder=""
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  required
                  className={'px-5 py-3 h-12 border border-grey-200 rounded-none min-w-full focus:outline-none focus:shadow-outline'}
                />
              </div>
              <div className={''}>
                <button
                  type="submit"
                  className={'w-full font-semibold text-black px-5 py-3 h-12 mb-4 rounded-none hover:text-grey-100 hover:bg-blue'}
                >
                  Update Password
                </button>
              </div>
            </ShopifyNext.Components.Forms>
          </div>
        </main>
      </Layouts.Theme>
    )
  }
}

export namespace AccountActivateTemplate {
  export interface Props extends GlobalProps {}
  export interface State {
    errors: any;
  }
}
