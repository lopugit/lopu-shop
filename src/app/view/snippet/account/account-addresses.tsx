import * as React from 'react'
import { GlobalProps, Address } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { ShopifyNext } from '@dotdev/next-components'

export class AccountAddresses extends React.Component<AccountAddresses.Props, AccountAddresses.State> {
  public constructor(props: any) {
    super(props)
    const defaultCountry = this.props.data.shop.permanent_domain === 'lopu-shop.myshopify.com' ? 'United States' : 'Australia'
    const allowed = Helpers.check(this, 'this.props.data.section.addresses.blocks')
      //@ts-ignore
      && this.props.data.section.addresses.blocks.length > 0
      //@ts-ignore
      ? this.props.data.section.addresses.blocks.map(block => block.settings.title) 
      : Helpers.check(this, 'this.props.data.section.addresses.settings.default')
      //@ts-ignore
        ? [this.props.data.section.addresses.settings.default]
        : ['Australia']
    // @ts-ignore
    const countries = window.Countries
    const countryList = Object.keys(countries)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = countries[key]
        return obj
      }, {})

    const stateList = countryList[defaultCountry].provinces

    this.state = {
      countryList,
      //@ts-ignore
      stateList,
      showForm: false,
      defaultAddress: this.defaultAddress
    }
  }

  private defaultAddress = {
    form: this.props.data.form.customer_address
  };

  private handlePrimaryToggle = () => {
    let address = this.state.defaultAddress
    address.default = !address.default

    this.setState({
      defaultAddress: address
    })
  }

  private updateAddress = (key: string, value: string) => {
    let address = this.state.defaultAddress

    address[`${key}`] = value

    this.setState({
      defaultAddress: address
    })
  }

  private handleStateChange = (event: any): void => {
    const state = this.state.stateList[event.target.options[event.target.selectedIndex].text]

    this.setState({
      defaultAddress: {
        ...this.state.defaultAddress,
        province: state
      }
    })
  };

  private handleCountryChange = (event: any): void => {
    const country = this.state.countryList[event.target.options[event.target.selectedIndex].text]

    this.setState({
      defaultAddress: {
        ...this.state.defaultAddress,
        country: country,
        country_code: event.target.value
      },
      stateList: country.provinces
    })
  };

  private toggleForm = (address?: any) => {
    this.setState({
      showForm: !this.state.showForm,
      defaultAddress: address ? address : this.defaultAddress
    })
  }

  public render(): JSX.Element {
    const defaultAddress = Helpers.check(this, 'this.props.data.customer.addresses') && this.props.data.customer.addresses.length ? this.props.data.customer.addresses.filter(address => address.default == true) : []
    const additionalAddresses = Helpers.check(this, 'this.props.data.customer.addresses') && this.props.data.customer.addresses.length ? this.props.data.customer.addresses.filter(address => address.default == false) : []
    return (
      <div className={'w-full'}>
        {!this.state.showForm ? <div className={'flex flex-col'}>
          <Snippets.Button
            title={'Add Address'}
            type={'submit'}
            onClick={() => this.toggleForm()}
            colour={'secondary'}
            className={'w-full md:w-18-2 py-1-2 flex items-center justify-center mt-3-2 md:mt-0 mb-3-2'}
          >
            <h1 className={'hidden'}>Addresses</h1>
            <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Add New Address</Snippets.Heading>
          </Snippets.Button>
          <div>
            {
              defaultAddress.length > 0 ?
                <div className={'w-full md:w-3/10'}>
                  <div className={'flex flex-row justify-between mb-1-6'}>
                    <Snippets.Heading size={'h5'} tag={'p'} className={'leading-tight'}>default shipping address</Snippets.Heading>
                    <Snippets.Button
                      title={'Edit Address'}
                      colour={'blank'}
                      onClick={() => this.toggleForm(defaultAddress[0])}
                      className={'relative flex items-center justify-start'}
                    >
                      <Snippets.Heading size={'h5'} tag={'p'} className={'leading-tight pr-2'}>Edit</Snippets.Heading>
                      <Snippets.Icon name={'edit'} width={16} className={'absolute right-0'} />
                    </Snippets.Button>
                  </div>
                  <Snippets.AccountAddressDetail address={defaultAddress[0]} />
                  <Snippets.Heading size={'h5'} tag={'p'} className={'mt-3-2 mb-1-4'}>Addtional Address</Snippets.Heading>
                </div>
                : <Snippets.Heading size={'h5'} tag={'p'}>No addresses</Snippets.Heading>
            }
            {
              additionalAddresses.length > 0 ? additionalAddresses.map((address: Address, i: number) => {
                return (
                  <div key={i} className={'pb-1-6'}>
                    <Snippets.AccountAddressDetail address={address} />
                    <div className={'flex w-full flex-no-wrap pt-0-2 mb-1'}>
                      <Snippets.Button
                        title={'Edit Address'}
                        colour={'blank'}
                        onClick={() => this.toggleForm(address)}
                        className={'flex items-center justify-start'}
                      >
                        <Snippets.Heading size={'h5'} tag={'p'} className={'leading-tight'}>Edit</Snippets.Heading>
                      </Snippets.Button>
                      <span className={'px-0-4 flex'}>{' '}/{' '}</span>
                      <ShopifyNext.Components.Forms
                        data={{
                          ...this.props.data.form.address_delete,
                          form: {
                            ...this.props.data.form.address_delete,
                            action: this.props.data.form.address_delete.form.action + address.id,
                            id: `${address.id}`,
                            method: 'post'
                          }
                        }}
                        className={'w-full flex items-center'}
                      >
                        <Snippets.Button
                          title={'Delete Address'}
                          colour={'blank'}
                          type={'submit'}
                          className={'flex items-center justify-start'}
                        >
                          <Snippets.Heading
                            size={'h5'}
                            tag={'p'}
                            className={'leading-tight pr-2'}
                          >
                            Delete
                          </Snippets.Heading>
                        </Snippets.Button>
                      </ShopifyNext.Components.Forms>
                    </div>
                  </div>
                )
              }) : defaultAddress.length === 0 ? null : <Snippets.Heading size={'p'} tag={'p'} className={'leading-none'}>You have no additional addresses</Snippets.Heading>
            }
          </div>
        </div> : window.innerWidth >= 768 ? <Snippets.AccountAddressForm
          defaultAddress={this.state.defaultAddress}
          stateList={this.state.stateList}
          countryList={this.state.countryList}
          updateAddress={this.updateAddress}
          handleStateChange={this.handleStateChange}
          handleCountryChange={this.handleCountryChange}
          toggleForm={this.toggleForm}
          handlePrimaryToggle={this.handlePrimaryToggle}
        /> : <div className={'h-57'} />}
        {this.state.showForm &&
          <div className={`absolute top-0 inset-x-0 z-10 bg-white px-1-7 md:px-0${window.innerWidth <768 ? ' bottom-0' : ''}`}>
            <Snippets.Button
              title={'Cancel'}
              type={'button'}
              colour={'blank'}
              onClick={() => this.toggleForm()}
              className={'flex md:hidden flex-wrap item-center justify-center mb-3-2'}
            >
              <Snippets.Icon name={'chevron_left'} width={18} height={15} />
              <Snippets.Heading size={'h5'} tag={'p'} className={'ml-0-6 tracking-wider'}>Back</Snippets.Heading>
            </Snippets.Button>
            <div className={'lg:mb-0'}>
              <Snippets.Heading size={'h1'} tag={'p'} className={'w-full md:pb-3-2 md:border-b md:border-grey-border mb-3-2'}>{this.state.defaultAddress.first_name ? 'Edit your address' : 'Add new address'}</Snippets.Heading>
            </div>
            {window.innerWidth < 768 && <Snippets.AccountAddressForm
              defaultAddress={this.state.defaultAddress}
              stateList={this.state.stateList}
              countryList={this.state.countryList}
              updateAddress={this.updateAddress}
              handleStateChange={this.handleStateChange}
              handleCountryChange={this.handleCountryChange}
              toggleForm={this.toggleForm}
              handlePrimaryToggle={this.handlePrimaryToggle}
            />}
          </div>}
      </div>

    )
  }

}

export namespace AccountAddresses {
  export interface Props extends GlobalProps {
    mobile?: boolean
  }
  export interface State {
    countryList: any;
    stateList: any;
    showForm: boolean;
    defaultAddress: any;
  }
}
