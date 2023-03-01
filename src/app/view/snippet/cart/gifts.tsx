import * as React from "react"
import { JSONProduct } from "types"
import { Gift } from "./gift"

export const Gifts: React.FC<Props> = ({ products, disabled, quantity, ...props}) => (
  <div>
    {products.map((product) => (
      <Gift 
        {...props}
        removed={disabled.includes(product.handle)}
        product={product}
        quantity={quantity}
      />
    ))}
  </div>
)

type Props = {
  products: Array<JSONProduct>;
  message: string;
  type: 'collection' | 'product' | 'price';
  disabled: Array<string>;
  removeGift: (type: 'collection' | 'product' | 'price', handle: string) => void;
  quantity: number;
}