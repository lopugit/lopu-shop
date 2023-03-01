import * as React from 'react'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'

export class SocialLogin extends React.PureComponent<SocialLogin.Props> {
  public render (): JSX.Element {
    return (
      <div data-dtk-shop={this.props.data.shop.permanent_domain}>
        <button
          className={'w-full flex items-center justify-center relative bg-blue text-white pt-2-1 pb-2 mb-1-6'}
          disabled
          data-dtk-social-login="facebook.com"
        >
          <Snippets.Heading size={'h5'} tag={'p'}>continue with facebook</Snippets.Heading>
          <Snippets.Icon name={'facebook_reverse'} width={9} height={18} className={'absolute left-0 ml-2-3'}/>
        </button>
        <button
          className={'w-full flex items-center justify-center relative text-black py-2 border-half border-black'}
          disabled
          data-dtk-social-login="google.com"
        >
          <Snippets.Icon name={'google'} width={40} height={40} className={'absolute left-0 ml-0-8'}/>
          <Snippets.Heading size={'h5'} tag={'p'}>continue with google</Snippets.Heading>
        </button>
        <div data-dtk-social-login-msg-container>
          <p data-dtk-social-login-msg />
        </div>
      </div>
    )
  }
}

export namespace SocialLogin {
  export interface Props extends GlobalProps {}
}