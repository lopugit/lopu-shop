import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import '../react-datepicker.css'

export class AccountDetails extends React.Component<AccountDetails.Props, AccountDetails.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      first_name: this.props.data.customer.first_name,
      last_name: this.props.data.customer.last_name,
      birthday: this.getBirthday(),
      updating: false,
      validate: true
    }
  }

  private getBirthday = () => {
    const { customer } = this.props.data
    return customer?.tags?.filter(tag => tag.includes('birthday')).length > 0 ? new Date(customer.tags.filter(tags => tags.includes('birthday'))[0].slice(9)) : ''
  }

  private handleChange = (keyset: keyof AccountDetails.State, value: AccountDetails.State[keyof AccountDetails.State]) => {
    this.setState({
      [keyset]: value
    } as Pick<AccountDetails.State, keyof AccountDetails.State>)
  }

  private handleSubmit = async () => {
    const birthdayYear = new Date(this.state.birthday).getFullYear()
    if(birthdayYear < 1900 || birthdayYear > new Date().getFullYear()) {
      this.setState({
        validate: false
      })
      return
    }

    const url = `/apps/toolkit/client/helpers/customer/${this.props.data.customer.id}`

    let { tags } = this.props.data.customer

    if (this.state.birthday != this.getBirthday()) {
      tags = tags.filter(tag => !tag.includes('birthday'))
      const date = new Date(this.state.birthday).toLocaleDateString("en-AU");
      tags.push(`birthday:${date}`)
    }

    const data = {
      id: this.props.data.customer.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      tags
    }

    this.setState({
      updating: true,
      validate: true
    })

    await axios.post(url, data)

    this.setState({
      updating: false
    })
    window.location.reload()
  }

  public render(): JSX.Element {
    return (
      <div className={'w-full md:w-28-8'}>
        <Snippets.Heading size={'h3'} tag={'h1'} className={'hidden md:block'}>
          {'Personal Details'}
        </Snippets.Heading>
        <Snippets.Heading size={'h4'} tag={'p'} className={'mt-1-7 mb-2-4 leading-normal'}>
          {'Keep your details up to date'}
        </Snippets.Heading>
        <div>
          <Snippets.Input
            className={'mb-1-6 border border-grey-border'}
            id="first_name"
            value={this.state.first_name}
            type="text"
            placeholder="First Name"
            hideLabel
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange('first_name', event.target.value)}
            required
          />
          <Snippets.Input
            className={'mb-1-6 border border-grey-border'}
            id="last_name"
            value={this.state.last_name}
            type="text"
            placeholder="Last Name"
            hideLabel
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange('last_name', event.target.value)}
            required
          />
          <Snippets.Input
            className={'mb-1-6 border border-grey-border cursor-not-allowed'}
            id="customer_email"
            value={this.props.data.customer.email}
            type="email"
            placeholder="Email Address"
            hideLabel
            disabled
          />
          <DatePicker 
            className={'border border-grey-border px-1-6 pt-1-1 pb-1-1 w-full'}
            selected={this.state.birthday}
            placeholderText="Birthday"
            onSelect={date => this.handleChange('birthday', date)}
            dateFormat={'dd/MM/yyyy'}
          />
          <Snippets.Button
            title={'Save Changes'}
            colour={'blank'}
            className={`mt-1-6 w-full py-1-2 flex items-center justify-center border border-black text-black bg-white px-1-6 ${this.state.validate ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={this.handleSubmit}
          >
            <Snippets.Heading size={'h5'} tag={'p'} className={this.state.validate ? '': 'text-error'}>
              {!this.state.validate ? 'Please use a valid date' : this.state.updating ? 'Saving' : 'Save Changes'}
            </Snippets.Heading>
          </Snippets.Button>
        </div>
      </div>
    )
  }
}

export namespace AccountDetails {
  export interface Props extends GlobalProps { }
  export interface State {
    first_name: string;
    last_name: string;
    birthday: any;
    updating: boolean;
    validate: boolean;
  }
}
