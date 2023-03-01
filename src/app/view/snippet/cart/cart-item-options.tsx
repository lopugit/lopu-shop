import { getCookie } from 'helpers'
import * as React from 'react'
import * as Snippets from 'snippets'
import { LineItem } from 'types'

export const CartItemOptions: React.FC<IProps> = ({ lineitem, className }) => lineitem.options ? (
  <ul className={`flex flex-col-reverse${className ? ` ${className}` : ''}`}>
    {(lineitem.tags.includes('badge:Final Sale-red') || lineitem.tags.includes('badge:Final Sale-grey')) && (
      <li>
        <Snippets.Heading size={'p'} tag={'p'} className={'leading-close text-red'}>
          {'Final Sale - no returns unless faulty'}
        </Snippets.Heading>
      </li>
    )}
    {lineitem?.properties?.ribbon || lineitem?.properties?.size || lineitem?.properties?.brim || lineitem?.properties?._custom ? (
      <React.Fragment>
        <li className="mb-0-6">
          <p className={'leading-close font-semibold'}>
            {'This item is made to order & is non-refundable. Please allow 3-5 weeks for production + shipping'}
          </p>
        </li>
        <li>
          {lineitem?.properties?.ribbon ? (
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>
              {`Ribbon: ${lineitem?.properties?.ribbon}`}
            </Snippets.Heading>
          ) : null}
          {lineitem?.properties?.size ? (
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>
              {`Size: ${lineitem?.properties?.size}`}
            </Snippets.Heading>
          ) : null}
        </li>
      </React.Fragment>
    ) : null}
    {lineitem.options.slice(0, 2).map((option, i: number) => option === 'Size' && lineitem?.properties?.size ? null : (
      <li key={i}>    
        <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>
          {`${option}: ${option === 'Value' ? lineitem.product_type === 'Rise ai gift card' ? 'USD' : getCookie('cart_currency') : ''}${lineitem.variant_options[i]}`}
        </Snippets.Heading>
      </li>
    ))}
  </ul>
) : null

interface IProps {
  lineitem: LineItem;
  className?: string;
}