import * as React from 'react'
import { Address } from 'types'
import * as Snippets from 'snippets'

export class AccountAddressDetail extends React.PureComponent<AccountAddressDetail.Props> {
  public render() {
    const { address } = this.props
    return (
      <Snippets.Heading size={'p'} tag={'p'} className={'block w-full md:w-18-2 leading-close'}>
        {address.first_name ? (
          <React.Fragment>
            {address.first_name}{' '}
          </React.Fragment>
        ) : null}
        {address.last_name ? (
          <React.Fragment>
            {address.last_name}<br />
          </React.Fragment>
        ) : null}
        {address.company ? (
          <React.Fragment>
            {address.company}<br />
          </React.Fragment>
        ) : null}
        {address.address1 ? (
          <React.Fragment>
            {address.address1}<br />
          </React.Fragment>
        ) : null}
        {address.address2 ? (
          <React.Fragment>
            {address.address2}<br />
          </React.Fragment>
        ) : null}
        {address.city ? (
          <React.Fragment>
            {address.city}<br />
          </React.Fragment>
        ) : null}
        {address.province ? (
          <React.Fragment>
            {address.province}<br />
          </React.Fragment>
        ) : null}
        {address.zip ? (
          <React.Fragment>
            {address.zip}<br />
          </React.Fragment>
        ) : null}
        {address.country ? (
          <React.Fragment>
            {address.country}<br />
          </React.Fragment>
        ) : null}
        {address.phone ? (
          <React.Fragment>
            {address.phone}<br />
          </React.Fragment>
        ) : null}
      </Snippets.Heading>
    )
  }
}

export namespace AccountAddressDetail {
  export interface Props {
    address: Address
  }
}