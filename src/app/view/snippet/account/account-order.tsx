import * as React from 'react'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'
import moment from 'moment'

export class AccountOrder extends React.Component<AccountOrder.Props> {
  public render(): JSX.Element {
    const { selectedOrder } = this.props
    return (
      <div>
        <div className={'mb-3 md:mb-1-9 w-full flex justify-between items-center relative'}>
          <Snippets.Heading size={'h3'} tag={'p'} className={'leading-close tracking-wide'}>{`Your Order No. ${selectedOrder.order_number}`}</Snippets.Heading>
          <Snippets.Button
            title={'Track Order'}
            colour={'secondary'}
            href={selectedOrder.order_status_url}
            className={'hidden w-full md:w-16 py-1-2 md:flex items-center justify-center'}
          >
            <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Track Order</Snippets.Heading>
          </Snippets.Button>
        </div>
        <div className={'w-full flex flex-wrap md:mb-4-8'}>
          <div className={'w-full flex flex-wrap md:mb-3-4'}>
            <div className={'w-full md:w-1/3 flex flex-col mb-2-4 md:mb-0'}>
              <Snippets.Heading size={'h3'} tag={'p'} className={'mb-0-8 tracking-wide'}>Order Details</Snippets.Heading>
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
                {`Order No. ${selectedOrder.order_number}`} <br />
                {`Ordered ${ShopifyNext.Utils.formatDate(selectedOrder.created_at, 'YYYY-MM-DD HH:mm:ss')}`} <br />
                {`${selectedOrder.line_items.length} ${selectedOrder.line_items.length === 1 ? 'item' : 'items'}`} <br />
                {'You will receive 1 parcels'}
              </Snippets.Heading>
            </div>
            <div className={'w-full md:w-2/3 flex flex-col pl-0 md:pl-0-4 mb-2-4 md:mb-0'}>
              <Snippets.Heading size={'h3'} tag={'p'} className={'mb-0-8 tracking-wide'}>Shipping Address</Snippets.Heading>
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
                {`${selectedOrder.shipping_address.first_name} ${selectedOrder.shipping_address.last_name}`} <br />
                {`${selectedOrder.shipping_address.address1}`} <br />
                {`${selectedOrder.shipping_address.city}, ${selectedOrder.shipping_address.province_code}, ${selectedOrder.shipping_address.zip}`} <br />
                {`${selectedOrder.shipping_address.country}`}
              </Snippets.Heading>
            </div>
          </div>
          <div className={'w-full flex flex-wrap'}>
            <div className={'w-full md:w-1/3 flex flex-col mb-1-8 md:mb-0'}>
              <Snippets.Heading size={'h3'} tag={'p'} className={'mb-0-8 tracking-wide'}>Estimate delivery</Snippets.Heading>
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
                {moment(selectedOrder.created_at).add(5, 'd').format('dddd Do MMMM')}
              </Snippets.Heading>
            </div>
            <div className={'w-full md:w-2/3 flex flex-col pl-0 md:pl-0-4 mb-2 md:mb-0'}>
              <Snippets.Heading size={'h3'} tag={'p'} className={'mb-0-8 tracking-wide'}>Parcel status</Snippets.Heading>
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
                {selectedOrder.fulfillment_status === 'unfulfilled' ? 'Processing' : 'Shipped'}
              </Snippets.Heading>
            </div>
            <div className={'md:hidden w-full mb-0-8 md:mb-0'} >
              <Snippets.Button
                title={'Track Order'}
                colour={'secondary'}
                href={selectedOrder.order_status_url}
                className={'w-full py-1-2 flex items-center justify-center'}
              >
                <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Track Order</Snippets.Heading>
              </Snippets.Button>
            </div>
          </div>
        </div>
        <div className={'hidden md:flex flex-wrap w-full pr-0-8 pb-0-8 border-b border-grey-border'}>
          <div className={'w-5/9 flex justify-start'}>
            <Snippets.Heading size={'h5'} tag={'p'}>Details</Snippets.Heading>
          </div>
          <div className={'w-4/9 flex flex-wrap justify-between'}>
            <Snippets.Heading size={'h5'} tag={'p'}>Unit Price</Snippets.Heading>
            <Snippets.Heading size={'h5'} tag={'p'}>Amount Paid</Snippets.Heading>
          </div>
        </div>
        <div className={'flex flex-wrap w-full md:pr-0-8 mb-1-6'}>
          {selectedOrder.line_items.map(item => {
            return (
              <div key={item.id} className={'w-full flex flex-wrap py-2-1 border-b border-grey-border'}>
                <div className={'w-1/2 md:w-5/9 flex flex-wrap justify-start pr-1 md:pl-0'}>
                  <div className={'w-full md:w-12-4 md:h-12-4 relative md:mr-2'}>
                    <Snippets.Image
                      alt={`Product id: ${item.id} featured image`}
                      src={item.image}
                      ratio={'1:1'}
                      className={'bg-cover bg-center absolute inset-0 border border-grey-border'}
                    />
                  </div>
                  <Snippets.Heading size={'p'} tag={'p'} className={'hidden md:block leading-tight'}>
                    {item.title} <br />
                    <Snippets.Money price={item.final_price}/><br />
                    {`Qty: ${item.quantity}`} <br />
                    {`Size: ${item.size}`} <br />
                    {`Colour: ${item.color}`} <br />
                    {`Status: ${selectedOrder.fulfillment_status === 'unfulfilled' ? 'Processing' : 'Shipped'}`}
                  </Snippets.Heading>
                </div>
                <div className={'w-1/2 md:w-4/9 flex flex-wrap justify-between pl-1 md:pl-0'}>
                  <div className={'w-full flex md:hidden flex-col items-start mb-1-6 md:mb-0'}>
                    <Snippets.Heading size={'h3'} tag={'p'} className={'mb-0-8'}>Details</Snippets.Heading>
                    <Snippets.Heading size={'p'} tag={'p'} className={'block leading-tight'}>
                      {item.title} <br />
                      <Snippets.Money price={item.final_price}/><br />
                      {`Qty: ${item.quantity}`} <br />
                      {`Size: ${item.size}`} <br />
                      {`Colour: ${item.color}`} <br />
                      {`Status: ${selectedOrder.fulfillment_status === 'unfulfilled' ? 'Processing' : 'Shipped'}`}
                    </Snippets.Heading>
                  </div>
                  <div className={'w-full md:w-auto flex flex-col items-start mb-1-6 md:mb-0'}>
                    <Snippets.Heading size={'h3'} tag={'p'} className={'md:hidden mb-0-8'}>Unit Price</Snippets.Heading>
                    <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}><Snippets.Money price={item.final_price}/></Snippets.Heading>
                  </div>
                  <div className={'w-full md:w-auto flex flex-col items-start'}>
                    <Snippets.Heading size={'h3'} tag={'p'}className={'md:hidden mb-0-8'}>Amount Paid</Snippets.Heading>
                    <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}><Snippets.Money price={item.final_line_price}/></Snippets.Heading>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={'flex flex-col w-full pr-0-8 items-end'}>
          <div className={'w-full md:w-4/9 flex flex-wrap justify-between mb-0-8'}>
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>Subtotal</Snippets.Heading>
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}><Snippets.Money price={selectedOrder.total_price - selectedOrder.shipping_price} /></Snippets.Heading>
          </div>
          <div className={'w-full md:w-4/9 flex flex-wrap justify-between mb-0-8 md:mb-1-1'}>
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>Shipping</Snippets.Heading>
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>{selectedOrder.shipping_price != 0 ? <Snippets.Money price={selectedOrder.shipping_price}/> : 'Free'}</Snippets.Heading>
          </div>
          <div className={'w-full md:w-4/9 flex flex-wrap justify-between'}>
            <Snippets.Heading size={'h3'} tag={'p'}>Total</Snippets.Heading>
            <Snippets.Heading size={'h3'} tag={'p'}><Snippets.Money price={selectedOrder.total_price}/></Snippets.Heading>
          </div>
        </div>
      </div>
    )
  }
}

export namespace AccountOrder {
  export interface Props {
    selectedOrder: any;
  }
}
