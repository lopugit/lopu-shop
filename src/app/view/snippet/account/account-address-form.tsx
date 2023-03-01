import * as React from 'react'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

export class AccountAddressForm extends React.Component<AccountAddressForm.Props> {
  public render(): JSX.Element {
    const { form } = this.props.defaultAddress
    return (
      <ShopifyNext.Components.Forms data={form} className={'bg-white pb-4 md:pb-0'}>
        <Snippets.FormErrors form={form} />
        <div className={'w-full md:w-8/9 md:pr-0-4 flex flex-wrap items-start'}>
          <div className={'w-full md:w-1/2 flex flex-wrap md:pr-1-2'}>
            <Snippets.Heading size={'h5'} tag={'p'} className={'mb-2'}>contact details</Snippets.Heading>
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[first_name]"
              id="first_name"
              type="text"
              placeholder="First Name"
              value={this.props.defaultAddress.first_name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('first_name', event.target.value)}
              required
              autoCapitalize="words"
            />
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[last_name]"
              id="last_name"
              type="text"
              placeholder="Last Name"
              value={this.props.defaultAddress.last_name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('last_name', event.target.value)}
              required
              autoCapitalize="words"
            />
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[company]"
              id="company"
              type="text"
              placeholder="Company name (Optional)"
              value={this.props.defaultAddress.company}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('company', event.target.value)}
              autoCapitalize="words"
            />
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[phone]"
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={this.props.defaultAddress.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('phone', event.target.value)}
              required
            />
          </div>
          <div className={'w-full md:w-1/2 flex flex-wrap md:pl-1-2'}>
            <Snippets.Heading size={'h5'} tag={'p'} className={'mt-1-6 md:mt-0 mb-2'}>address</Snippets.Heading>
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[address1]"
              id="address1"
              type="text"
              placeholder="Address"
              value={this.props.defaultAddress.address1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('address1', event.target.value)}
              required
              autoCapitalize="words"
            />
            <Snippets.Input
              className={'mb-1-6 border border-grey-border'}
              hideLabel
              name="address[city]"
              id="city"
              type="text"
              placeholder="Suburb"
              value={this.props.defaultAddress.city}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('city', event.target.value)}
              required
              autoCapitalize="words"
            />
            
            <div className={'mb-1-6 w-full h-4-8 border border-grey-border flex items-center justify-center'}>
              <div className={'w-full h-full relative z-20'}>
                <select
                  onChange={(e) => this.props.handleCountryChange(e)}
                  name="address[country]"
                  id="country"
                  value={this.props.defaultAddress.country_code}
                  className={'w-full h-full pl-1-6 appearance-none bg-white'}
                  required
                >
                  <option value="" disabled selected>Select country</option>
                  {Object.keys(this.props.countryList).map(
                    (key: any): JSX.Element => {
                      return (
                        <option key={key} value={this.props.countryList[key].code}>
                          {key}
                        </option>
                      )
                    }
                  )}
                </select>
                <span className={'absolute'} style={{ right: '16px', top: '15px' }}>
                  <Snippets.Icon name="chevron_down" width={12} height={18} />
                </span>
              </div>
            </div>
            
            <div className={'flex flex-col md:flex-row w-full'}>
              {this.props.stateList ? (
                <div className={'mb-1-6 w-full md:mr-0-8 h-4-8 border border-grey-border'}>
                  <div className={'w-full h-full relative'}>
                    <select
                      onChange={e => this.props.handleStateChange(e)}
                      name="address[province]"
                      id="province"
                      value={this.props.defaultAddress.province}
                      className={'w-full h-full pl-1-6 appearance-none bg-white'}
                      required
                    >
                      <option value="" disabled selected>Select state</option>
                      {this.props.stateList ? this.props.stateList.map(
                        (state: any): JSX.Element => (
                          <option key={state} value={state}>
                            {state == 'Australian Capital Territory' ? 'ACT' : state}
                          </option>
                        )
                      ) : null}
                    </select>
                    <span className={'absolute'} style={{ right: '16px', top: '15px' }}>
                      <Snippets.Icon name="chevron_down" width={12} height={18} />
                    </span>
                  </div>
                </div>
              ) : null}
              
              <Snippets.Input
                className={'mb-1-6 border border-grey-border'}
                hideLabel
                name="address[zip]"
                id="zip"
                type="number"
                placeholder="Enter postcode"
                value={this.props.defaultAddress.zip}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateAddress('zip', event.target.value)}
                required
              />
            </div>

          </div>

          <div className={'mt-1-6 mb-3-2 w-full cursor-pointer'}>
            <input
              name="address[default]"
              id="default"
              type="checkbox"
              value={this.props.defaultAddress.default}
              onChange={this.props.handlePrimaryToggle}
              checked={this.props.defaultAddress ? this.props.defaultAddress.default : false}
              className={'hidden'}
            />
            <label htmlFor={'default'} className={'w-full flex items-center justify-start'}>
              <Snippets.Icon name={this.props.defaultAddress.default ? 'checkbox_yes' : 'checkbox_no'} width={24} />
              <Snippets.Heading size={'p'} tag={'p'} className={'ml-1'}>Use as my default shipping address</Snippets.Heading>
            </label>
          </div>

          {ShopifyNext.Helpers.updateCustomer}
        </div>
        <div className={'hidden md:block w-full h-0-1 border-t mb-3-2 border-grey-border'} />
        <div className={'block md:flex w-full max-w-popup flex-wrap'}>
          <Snippets.Button
            title={'Save Address'}
            type={'submit'}
            colour={'secondary'}
            className={'w-full md:w-28-8 py-1-2 flex items-center justify-center mr-3-2'}
          >
            <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Save Address</Snippets.Heading>
          </Snippets.Button>
          <Snippets.Button
            title={'Cancel'}
            type={'button'}
            colour={'secondary'}
            onClick={this.props.toggleForm}
            className={'hidden w-full md:w-28-8 py-1-2 md:flex items-center justify-center'}
          >
            <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Cancel</Snippets.Heading>
          </Snippets.Button>
        </div>
      </ShopifyNext.Components.Forms>
    )
  }

}

export namespace AccountAddressForm {
  export interface Props {
    defaultAddress: any;
    stateList: any;
    countryList: any;
    updateAddress: (key: string, value: string) => void;
    handleStateChange: (event: any) => void;
    handleCountryChange: (event: any) => void;
    toggleForm: () => void;
    handlePrimaryToggle: () => void;
  }
}
