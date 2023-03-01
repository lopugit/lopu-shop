import * as React from 'react'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'
import { ShopifyNext } from '@dotdev/next-components'

export class ProductAddToCart extends React.PureComponent<ProductAddToCart.Props> {
  public render(): JSX.Element {
    const {
      variant,
      quantity,
      handleAddToCart,
      outofstock,
      hideMoney,
      orderedMaxQty,
    } = this.props
    return (
      <div className={`${this.props.className ? this.props.className : ''}`}>
        <Snippets.Button
          type={'button'}
          colour={'primary'}
          id={variant.id}
          title={'Add to Cart'}
          onClick={(event: React.MouseEvent) => handleAddToCart(event)}
          className={'flex flex-row items-center justify-between w-full h-5-6'}
          disabled={outofstock || orderedMaxQty || this.props.disabled}
        >
          {outofstock
            ? <Snippets.Heading size={'h5'} tag={'p'} className={'w-full'}>out of stock</Snippets.Heading>
            : orderedMaxQty
              ? <Snippets.Heading size={'h5'} tag={'p'} className={'w-full'}>{'Maximum quantity reached'}</Snippets.Heading>
              : <React.Fragment>
                <Snippets.Heading size={'h5'} tag={'p'} className={'select-none'}>{this.props.text ? this.props.text : 'Add to cart'}</Snippets.Heading>
                {this.props.showIcon
                  ? <Snippets.Icon name={'bag'} width={40} height={40}/>
                  : <Snippets.Heading size={'h5'} tag={'p'}>
                    { hideMoney || <Snippets.Money price={parseFloat(variant.price) * quantity}/>}
                  </Snippets.Heading>}
              </React.Fragment>}
        </Snippets.Button>
      </div>
    )
  }
}

export namespace ProductAddToCart {
  export interface Props extends GlobalProps {
    variant: any;
    quantity: number
    className?: string;
    handleAddToCart: (event: any) => void;
    outofstock?: boolean;
    orderedMaxQty?: boolean;
    showIcon?:boolean;
    text?:string;
    disabled?: boolean;
    hideMoney?: boolean;
  }
}
