import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'

export class Money extends React.PureComponent<Props, State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return this.context.state.exchangeRate && this.context.state.baseCurrency && this.context.state.cartCurrency ? (
      <span>
        {this.props.multiCurrencyTransform ? ShopifyNext.Utils.formatMoney(
          this.convert(this.props.price, this.context.state.baseCurrency, this.context.state.cartCurrency),
          this.context.state.shop.money_format
        ) : ShopifyNext.Utils.formatMoney(
          this.props.price,
          this.context.state.shop.money_format
        )}
      </span>
    ) : null
  }

  private convert(price, base, selected) {
    if (base != selected) {
      if(selected === 'JPY') {
        return Math.ceil((price * this.context.state.exchangeRate / 1000000) / 10000) * 10000
      }
      else {
        return Math.ceil((price * this.context.state.exchangeRate / 1000000) / 100) * 100
      }
    } else {
      return price
    }
  }
}

export default Money
export interface Props {
  price: number;
  trim?: boolean;
  multiCurrencyTransform?: boolean
}
export interface State {
  selectedCurrency: string;
}
