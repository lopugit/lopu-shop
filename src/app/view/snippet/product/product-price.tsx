import * as React from 'react'
import * as Snippets from 'snippets'

export class ProductPrice extends React.PureComponent<ProductPrice.Props> {
  public render(): JSX.Element {
    const { variant, layout } = this.props
    const compare_at_price = typeof variant.compare_at_price == 'string' ? parseFloat(variant.compare_at_price) * 100 : variant.compare_at_price
    const variant_price = typeof variant.price == 'string' ? parseFloat(variant.price) * 100 : variant.price
    const onSale = compare_at_price > variant.price
    return layout === 'product' ? (
      <div className={this.props.className}>
        <div className={'flex items-end'}>
          <span className={'inline-block align-middle text-base font-bold tracking-wider'}>
            <Snippets.Money price={variant_price ? variant_price : variant.price_min} multiCurrencyTransform={this.props.multiCurrencyTransform}/>
          </span>

          {onSale ? (
            <span className={'inline-block align-middle ml-1 opacity-50 text-base'}>
              <span className={'line-through'}>
                <Snippets.Money price={compare_at_price} multiCurrencyTransform={this.props.multiCurrencyTransform}/>
              </span>
            </span>
          ) : null}
        </div>
      </div>
    ) : (
      <div>
        <div className={'font-semibold flex items-end'}>
          <span className={'inline-block align-middle font-bold uppercase text-xs tracking-wide'}>
            <Snippets.Money price={variant_price} multiCurrencyTransform={this.props.multiCurrencyTransform}/>
          </span>

          {onSale ? (
            <span className={'inline-block align-middle pl-0-8 opacity-50 uppercase text-xs'}>
              <span className={'line-through'}>
                <Snippets.Money price={compare_at_price} multiCurrencyTransform={this.props.multiCurrencyTransform}/>
              </span>
            </span>
          ) : null}
        </div>
      </div>
    )
  }
}

export namespace ProductPrice {
  export interface Props {
    variant: any;
    layout?: string;
    className?: string;
    multiCurrencyTransform?: boolean
  }
}
