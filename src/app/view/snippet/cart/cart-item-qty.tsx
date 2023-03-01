import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class CartItemQty extends React.PureComponent<CartItemQty.Props, CartItemQty.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      quantity: props.lineitem.quantity
    }
  }

  private changeQuantity = (amount: number): void => {
    this.props.cartChange(amount, this.props.lineitem)
    this.setState({
      quantity: amount
    })
  }

  private toggleQuantity = (amount: number): void => {
    this.setState((state) => {
      const val = state.quantity + amount < 0 ? 0 : state.quantity + amount
      this.props.cartChange(val, this.props.lineitem)
      return {
        quantity: val
      }
    })
  }

  componentDidUpdate = () => {
    if (this.state.quantity !== this.props.lineitem.quantity) {
      this.setState({
        quantity: this.props.lineitem.quantity
      })
    }
  }

  public render(): JSX.Element {
    return (
      <div className={'flex'}>
        <button type="button" role="button" className={`flex justify-center items-center ${this.props.mini ? 'h-3-2 w-3-2':'h-4 w-4 mr-0-8'} text-black`} onClick={() => this.toggleQuantity(-1)}>
          <Snippets.Icon name={'minus'} width={11} height={11} />
        </button>
        <input
          className={`appearance-none ${this.props.mini ? 'w-4-6': 'w-4'} max-w-full bg-grey text-left ${this.props.mini ? 'pl-1-9' : 'pl-1-7'} font-bold text-xs text-black`}
          type="number"
          value={this.state.quantity}
          name="quantity"
          onChange={(e) => this.changeQuantity(Number(e.target.value))}
        />
        <button type="button" role="button" className={`flex justify-center items-center ${this.props.mini ? 'h-3-2 w-3-2':'h-4 w-4 mr-0-8'} text-black`} onClick={() => this.toggleQuantity(1)}>
          <Snippets.Icon name={'plus'} width={11} height={11} />
        </button>
      </div>
    )
  }
}

export namespace CartItemQty {
  export interface Props {
    cartChange?: any;
    lineitem: any;
    currentQuantity: number;
    className?: string;
    mini?: boolean
  }
  export interface State {
    quantity: number;
  }
}
