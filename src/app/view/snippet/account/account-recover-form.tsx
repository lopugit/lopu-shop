import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class RecoverForm extends React.PureComponent<RecoverForm.Props, RecoverForm.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    const { recoverForm } = this.props
    return <div className={'max-w-lg mx-auto flex flex-col items-center'}>
      <Snippets.Heading
        size={'h1'}
        tag={'h3'}
        className={'mb-4'}
      >
        Reset your password
      </Snippets.Heading>
      <Snippets.Heading
        size={'p'}
        tag={'p'}
        className={'mb-4 leading-normal'}
      >
        We will send you an email to reset your password.
      </Snippets.Heading>
      <ShopifyNext.Components.Forms data={recoverForm} className={'w-full'}>
        <Snippets.FormErrors form={recoverForm} />
        <Snippets.Input
          name="email"
          id="recover_password"
          type="email"
          className={'mb-1-6 border border-grey-border'}
          placeholder="Enter your email address"
          required
          hideLabel
        />
        <Snippets.Button
          title={'Reset your password Submit'}
          className={'w-full py-0-4 flex items-center justify-between bg-black text-white px-1-6'}
          type="submit"
          colour={'blank'}
        >
          <Snippets.Heading size={'h5'} tag={'p'}>submit</Snippets.Heading>
          <Snippets.Icon width={40} name={'chevron_right_reverse'} ariaHidden/>
        </Snippets.Button>
      </ShopifyNext.Components.Forms>
    </div>
  }
}

export namespace RecoverForm {
  export interface Props {
    recoverForm: any
  }
  export interface State { }
}
