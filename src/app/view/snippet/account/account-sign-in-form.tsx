import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, Form } from 'types'
import * as Snippets from 'snippets'

export class SignInForm extends React.PureComponent<SignInForm.Props, SignInForm.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    const { loginForm, recoverForm, toggleReset } = this.props
    return <div className={'max-w-lg mx-auto flex flex-col'}>
      <ShopifyNext.Components.Forms data={loginForm} className={'w-full gtm:login mb-3-2'}>
        <Snippets.FormErrors form={loginForm} />
        {recoverForm.posted_successfully ? (
          <Snippets.Heading size={'h5'} tag={'p'} className={'mb-2 text-left'}>
            Reset password email has been successfully sent.
          </Snippets.Heading>
        ) : null}

        <Snippets.Input
          name="customer[email]"
          className={'h-6 border border-grey-border'}
          id="customer_email"
          type="email"
          placeholder="Email Address"
          autoCapitalize="no"
          autoCorrect="no"
          required
          hideLabel
        />

        <Snippets.Input
          name="customer[password]"
          className={'h-6 border border-grey-border'}
          id="customer_password"
          type={'password'}
          autoCapitalize="no"
          autoCorrect="no"
          placeholder="Password"
          required
          hideLabel
        />

        <Snippets.Button
          title={'Sign In'}
          className={'w-full py-0-8 flex items-center justify-between bg-black text-white px-1-6 mb-2-1'}
          type="submit"
          colour={'blank'}
        >
          <Snippets.Heading size={'h5'} tag={'p'}>Sign In</Snippets.Heading>
          <Snippets.Icon width={40} name={'chevron_right_reverse'} ariaHidden />
        </Snippets.Button>
        <div className={'w-full flex flex-wrap justify-between mb-2-1'}>
          <div className={'w-full md:w-1/2 mb-1 md:mb-0'}>
            <Snippets.Button onClick={toggleReset} title={'Recover Password'} colour={'blank'} className={'text-left'}>
              <Snippets.Heading size={'h5'} tag={'p'} className={'leading-tight'}>forgotten password?</Snippets.Heading>
            </Snippets.Button>
          </div>
          <div className={'w-full md:w-1/2 flex flex-row justify-start md:justify-end items-center'}>
            <Snippets.Heading size={'h6'} tag={'p'} className={'leading-snug mr-1'}>Don’t have an account?</Snippets.Heading>
            <Snippets.Button href={'/account/register'} title={'Register'} colour={'blank'} className={'inline'}>
              <Snippets.Heading size={'h5'} tag={'p'} className={'leading-tight'}>register</Snippets.Heading>
            </Snippets.Button>
          </div>
        </div>
        <Snippets.SocialLogin {...this.props} />
      </ShopifyNext.Components.Forms>
    </div>
  }
}

export namespace SignInForm {
  export interface Props extends GlobalProps {
    toggleReset: () => void;
    loginForm: Form;
    recoverForm: Form;
    className?: string;
  }
  export interface State {
    recover: boolean;
  }
}
