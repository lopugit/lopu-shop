import * as React from 'react'
import * as Snippets from 'snippets'

export class ProductQuantity extends React.PureComponent<ProductQuantity.Props> {
  public render(): JSX.Element {
    const { quantity, max, toggleQuantity, hidden } = this.props
    return (
      <div className={`${hidden ? "hidden": "mb-1-6"}`}>
        {!this.props.hideLabel && <Snippets.Heading size={'h5'} tag={'p'} className={'mb-1-6'}>QTY</Snippets.Heading>}
        <div className={'w-full flex'}>
          <button
            aria-label="quantity minus one"
            type="button"
            role="button"
            className={`mr-0-8 w-4 h-4 flex items-center justify-center outline-none active:outline-none focus:outline-none${quantity <= 1 ? ' opacity-30 cursor-not-allowed' : ''}`}
            onClick={() => toggleQuantity('-')}>
            <Snippets.Icon stroke={'2'} name={'minus'} width={14} height={14} />
          </button>
          <input
            id={"quantity"}
            className={'w-4 h-4 appearance-none bg-grey font-bold text-xs tracking-wider text-center outline-none focus:outline-none'}
            type={'text'}
            value={quantity}
            min={1}
            max={max}
            pattern={'[0-9]*'}
            readOnly
            style={{ fontSize: 12, fontWeight: 700 }}
          />
          <label htmlFor="quantity" className={"visually-hidden"}>Quantity</label>
          <button
            aria-label="quantity plus one"
            type="button"
            role="button"
            className={`ml-0-8 w-4 h-4 flex items-center justify-center outline-none active:outline-none focus:outline-none${max >= 0 && quantity >= max ? ' opacity-30 cursor-not-allowed' : ''
              }`}
            onClick={() => toggleQuantity('+')}
          >
            <Snippets.Icon stroke={'2'} name={'plus'} width={14} height={14} />
          </button>
        </div>
      </div>
    )
  }
}

export namespace ProductQuantity {
  export interface Props {
    hidden?: boolean
    quantity: number;
    max: number;
    toggleQuantity: (type: '+' | '-') => void;
    hideLabel?: boolean;
  }
}
