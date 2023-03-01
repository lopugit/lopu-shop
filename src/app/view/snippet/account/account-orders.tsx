import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

export class AccountOrders extends React.Component<AccountOrders.Props, AccountOrders.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      showOrderDetail: false,
      selectedOrder: this.props.data.orders[0]
    }
  }

  private handleSelectOrder = (order) => {
    this.setState({
      showOrderDetail: true,
      selectedOrder: { ...order }
    })
  }

  private closeOrderDetail = () => {
    this.setState({
      showOrderDetail: false
    })
  }

  public render(): JSX.Element {
    const { orders } = this.props.data
    const { selectedOrder } = this.state
    return (
      <React.Fragment>
        {!this.state.showOrderDetail ? <div className={'w-full'}>
          <Snippets.Heading size={'h3'} tag={'h1'} className={'hidden md:block leading-close'}>
            {'Order history'}
          </Snippets.Heading>
          {orders && orders.length > 0 ? <React.Fragment>
            <Snippets.Heading size={'p'} tag={'p'} className={'mt-2-1 mb-2 leading-normal pb-2 border-b md:border-b-0 border-grey-border'}>
              {'Please find below all of your orders. You can check order details to access your invoice and track your order'}
            </Snippets.Heading>
            <div className={''}>
              <div className={'w-full hidden md:flex flex-wrap pb-0-8 border-b border-grey-border'}>
                <div className={'w-1/2 text-left'}>
                  <Snippets.Heading size={'h5'} tag={'p'}>details</Snippets.Heading>
                </div>
                <div className={'w-1/2 text-left pl-1-2'}>
                  <Snippets.Heading size={'h5'} tag={'p'}>order status</Snippets.Heading>
                </div>
              </div>
              {orders.map(order => {
                const items = order.line_items.length > 2 ? [...order.line_items].slice(0, 2) : [...order.line_items]
                return (
                  <div key={order.id} className={'w-full flex flex-wrap mt-2-1 pb-1-8 border-b border-grey-border'}>
                    <div className={'w-full md:w-1/2 flex flex-wrap'}>
                      <div className={'hidden md:w-2/5 md:flex flex-row'}>
                        {items.map(item => {
                          return (
                            <div key={item.id} className={'w-9 h-9 border border-grey-border relative mr-1-6 last:mr-0'}>
                              <Snippets.Image
                                alt={`Product id: ${item.id} featured image`}
                                src={item.image}
                                ratio={'1:1'}
                                className={'bg-cover bg-center absolute inset-0'}
                              />
                            </div>
                          )
                        })}
                      </div>
                      <div className={'w-full md:w-3/5 flex flex-col items-start md:justify-center mb-1-6 md:mb-0'}>
                        <Snippets.Heading size={'h5'} tag={'p'} className={'md:hidden mb-0-4 md:mb-0'}>details</Snippets.Heading>
                        <Snippets.Heading size={'p'} tag={'p'} className={'text-xs leading-closer h-4-8 pl-0 md:pl-1-8'}>
                          {`Order no.${order.order_number}`}<br />
                          {`Date created: ${ShopifyNext.Utils.formatDate(selectedOrder.created_at, 'DD/MM/YY')}`}<br />
                          {`${order.line_items.length} ${order.line_items.length === 1 ? 'item' : 'items'} - `}<Snippets.Money price={order.total_price} />
                        </Snippets.Heading>
                      </div>
                    </div>
                    <div className={'w-full md:w-1/2 pl-0 md:pl-1-2 flex flex-wrap'}>
                      <div className={'w-full md:w-1/5 flex flex-col items-start mb-1-6 md:mb-0'}>
                        <Snippets.Heading size={'h5'} tag={'p'} className={'md:hidden mb-0-4 md:mb-0'}>order status</Snippets.Heading>
                        <Snippets.Heading size={'p'} tag={'p'} className={'text-xs leading-closer md:h-4-8 md:mt-2-1'}>
                          {order.financial_status.includes('refund') ? order.financial_status : order.fulfillment_status === 'unfulfilled' ? 'Processing' : order.fulfillment_status === 'fulfilled' ? 'Shipped': order.fulfillment_status}
                        </Snippets.Heading>
                      </div>
                      <div className={'md:hidden md:w-2/5 w-full flex flex-row mb-2'}>
                        {items.map(item => {
                          return (
                            <div key={item.id} className={'w-9 h-9 border border-grey-border relative mr-1-6 last:mr-0'}>
                              <Snippets.Image
                                alt={`Product id: ${item.id} featured image`}
                                src={item.image}
                                ratio={'1:1'}
                                className={'bg-cover bg-center absolute inset-0'}
                              />
                            </div>
                          )
                        })}
                      </div>
                      <div className={'w-full md:w-4/5 pl-0 md:pl-2 flex justify-end'}>
                        <div className={'w-full flex flex-row md:flex-col md:items-end'}>
                          <div className={'w-full md:w-16-6 pr-1 md:pr-0'}>
                            <Snippets.Button
                              title={'View Order Detail'}
                              colour={'secondary'}
                              onClick={() => this.handleSelectOrder(order)}
                              className={'w-full py-1-2 flex items-center justify-center mb-0-8'}
                            >
                              <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>View order details</Snippets.Heading>
                            </Snippets.Button>
                          </div>
                          <div className={'w-full md:w-16-6 pl-1 md:pl-0'}>
                            <Snippets.Button
                              title={'Track Order'}
                              colour={'secondary'}
                              href={order.order_status_url}
                              className={'w-full py-1-2 flex items-center justify-center mb-0-8 md:mb-0'}
                            >
                              <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Track Order</Snippets.Heading>
                            </Snippets.Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div></React.Fragment> : <Snippets.Heading size={'p'} tag={'p'} className={'mt-2-1 mb-2 leading-normal pb-2 border-b md:border-b-0 border-grey-border'}>
            {'You have no previous orders'}
          </Snippets.Heading>}
        </div> :  window.innerWidth >= 768 ? <Snippets.AccountOrder selectedOrder={this.state.selectedOrder}/> : <div style={{height: this.state.selectedOrder.line_items.length * 331 + 400 }}/>}
        {this.state.showOrderDetail && <div className={'absolute top-0 inset-x-0 z-10 bg-white px-1-7 md:px-0'}>
          <Snippets.Button
            title={'Cancel'}
            type={'button'}
            colour={'blank'}
            onClick={this.closeOrderDetail}
            className={'flex md:hidden flex-wrap items-center justify-center mb-3-2'}
          >
            <Snippets.Icon name={'chevron_left'} width={18} height={15} />
            <Snippets.Heading size={'h5'} tag={'p'} className={'ml-0-6 tracking-wider'}>Back</Snippets.Heading>
          </Snippets.Button>
          <div className={'mb-3-2 md:mb-3-8 lg:mb-0'}>
            <Snippets.Heading size={'h1'} tag={'p'} className={'w-full md:pb-3-2 md:border-b md:border-grey-border mb-2-4'}>{'Order details'}</Snippets.Heading>
          </div>
          {window.innerWidth < 768 && <Snippets.AccountOrder selectedOrder={this.state.selectedOrder}/>}
        </div>}
      </React.Fragment>
    )
  }
}

export namespace AccountOrders {
  export interface Props extends GlobalProps {
    mobile?: boolean
  }
  export interface State {
    showOrderDetail: boolean;
    selectedOrder: any;
  }
}
