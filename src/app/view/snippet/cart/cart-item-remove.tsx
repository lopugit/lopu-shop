import * as React from 'react'

export class CartItemRemove extends React.PureComponent<CartItemRemove.Props> {
  public render(): JSX.Element {
    const { lineitem, children, handleRemove } = this.props

    return (
      <button
        className={'text-black transition-fast underline focus:outline-none text-xs uppercase tracking-wider leading-loose font-medium'}
        title={`Remove ${lineitem.product_title} from your bag`}
        onClick={() => handleRemove(lineitem.key)}
      >
        {children}
      </button>
    )
  }
}

export namespace CartItemRemove {
  export interface Props {
    handleRemove: any;
    lineitem: any;
  }
}
