import * as React from 'react'
import { GlobalProps } from 'types'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import axios from 'axios'

export class AccountReset extends React.Component<AccountReset.Props, AccountReset.State> {
  public constructor(props) {
    super(props)
    this.state = {
      updating: false,
      success: false, 
      message: '',
      newPassword: '',
      confirmedPassword: ''
    }
  }

  private updatePassword = async () => {
    const url = `/apps/toolkit/client/helpers/customer/${this.props.data.customer.id}`
    const data = {
      id: this.props.data.customer.id,
      password: this.state.newPassword,
      password_confirmation: this.state.newPassword
    }
    this.setState({
      updating: true
    })
    await axios.post(url, data).then(({ data }) => {
      data.id === this.props.data.customer.id ? this.setState({
        updating: false,
        success: true,
        message: 'Your password has been updated successfully. Please login with your new password',
        newPassword: '',
        confirmedPassword: ''
      }, () => setTimeout(window.location.href = '/', 5000)) : this.setState({
        updating: false,
        success: false,
        message: 'There is an error on sending your request, please try later',
        newPassword: '',
        confirmedPassword: ''
      })
    })
  }

  private handleInput = (key: string, value: string) => {
    //@ts-ignore
    this.setState({
      [key]: value
    })
  }

  public render(): JSX.Element {
    return (
      <div className={'w-full max-w-sm'}>
        <Snippets.Heading size={'h3'} tag={'h1'} className={'hidden md:block  leading-close'}>
          {'Reset Your Password'}
        </Snippets.Heading>
        <Snippets.Input
          className={'my-1-6 border border-grey-border'}
          hideLabel
          type="password"
          placeholder="New password"
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) => this.handleInput('newPassword', event.target.value)}
          required
          willNotCheckValidation
        />
        <Snippets.Input
          className={'mb-1-6 border border-grey-border'}
          hideLabel
          type="password"
          placeholder="Confirm your new password"
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) => this.handleInput('confirmedPassword', event.target.value)}
          required
          willNotCheckValidation
        />
        <Snippets.Button
          title={'Reset Password'}
          className={'w-full h-4-6 flex items-center justify-between'}
          colour={'secondary'}
          disabled={(this.state.newPassword !== this.state.confirmedPassword) || this.state.success}
          onClick={this.updatePassword}
        >
          <Snippets.Heading size={'h5'} tag={'p'} className={'w-full text-center transition'}>{this.state.updating ? 'Updating' : this.state.newPassword === this.state.confirmedPassword ? 'Reset Password' : 'Confirm your password'}</Snippets.Heading>
        </Snippets.Button>
        {this.state.success && <Snippets.Heading size={'h5'} tag={'p'} className={'mt-1-6'}>{this.state.message}</Snippets.Heading>}
      </div>
    )
  }
}

export namespace AccountReset {
  export interface Props extends GlobalProps { }
  export interface State {
    updating: boolean
    success: boolean
    message: string
    newPassword: string;
    confirmedPassword: string
  }
}
