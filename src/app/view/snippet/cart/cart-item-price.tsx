import * as React from 'react'
import * as Snippets from 'snippets'

export class CartItemPrice extends React.PureComponent<CartItemPrice.Props> {
  public render(): JSX.Element {
    const { lineitem } = this.props
    const onSale = lineitem.compare_at_price > lineitem.price

    return (
      <div className={`${this.props.textRight ? 'text-right': 'text-left'}`}>
        <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>
          <Snippets.Money price={lineitem.price}/>
        </Snippets.Heading>
        {onSale ? (
          <Snippets.Heading size={'none'} tag={'p'} className={'ml-0-5 inline line-through opacity-50 text-base font-normal'}>
            <Snippets.Money price={lineitem.compare_at_price}/>
          </Snippets.Heading>
        ) : null}
      </div>
    )
  }
}

export namespace CartItemPrice {
  export interface Props {
    lineitem: any;
    inline?: boolean;
    textRight?: boolean
  }
}
