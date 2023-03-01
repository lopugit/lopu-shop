import * as React from 'react'
import { JSONProduct } from 'types'
import { GiftDrawer } from './gift-drawer'

/*
 * Note To Future maintainers. This isn't being used
 * Rendering empty Divs for the most Part. (The Gift Images are in the previous div)
 *
 */
export const GiftsDrawer: React.FC<Props> = ({ products, disabled, quantity = 1, ...props }) => {
  return (
    <div className="this_is_the_gifts_drawer">
      {products.map((product,index) => (
        <GiftDrawer 
          {...props}
          quantity={quantity}
          key={product?.id + index}
          removed={disabled.includes(product.handle)}
          product={product}
        />
      ))}
    </div>
  )
}
type Props = {
  products: Array<JSONProduct>;
  message: string;
  type: 'collection' | 'product' | 'price';
  disabled: Array<string>;
  removeGift: (type: 'collection' | 'product' | 'price', handle: string) => void;
  quantity: number | null;
}
