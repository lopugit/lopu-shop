import * as React from "react"
import * as Snippets from "snippets"
import { JSONProduct } from "types"
import { formatMoney } from "@dotdev/next-components/dist/utils"

export const Gift: React.FC<Props> = ({
  removed,
  product,
  message,
  removeGift,
  type,
  quantity
}) => {
  return (
    <div key={product.id} className={`w-full flex flex-row px-1-6 md:px-0 pb-2-3 pt-2-6 md:pt-2 md:pb-2 md:border-b md:border-grey-border relative ${removed ? 'opacity-50' : ''}`}>
      <div className={'w-1/2 md:w-2/12 pr-0-9 md:pr-1-8'}>
        <div
          className={'block no-underline border border-grey-border w-full'}
        >
          <Snippets.Image
            alt={`${product.title} featured image`}
            src={product?.image?.src}
            ratio={'1:1'}
            className={'relative'}
          />      
        </div>
      </div>

      <div className={'w-1/2 md:w-10/12 flex items-center relative'}>
        <div className={'w-full h-full md:h-auto flex flex-wrap items-start pl-1 md:pl-0'}>

          <div className={'w-8/9 md:w-3/10 md:pl-0-6'}>
            <div
              className={'flex flex-col h-full transition-fast no-underline text-base leading-normal tracking-normal mb-1 md:mb-0 relative'}
            >
              <div className="flex-1 ">
                <Snippets.Heading
                  size={'h2'}
                  tag={'p'}
                  className={'mb-0-8'}
                >
                  {product.title}
                </Snippets.Heading>
                <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>
                  {message}
                </Snippets.Heading>
              </div>
              <div className={'hidden md:block'}>
                <Snippets.Button
                  title={'Remove'}
                  colour={'blank'}
                  onClick={() => removeGift(type, product.handle)}
                  className={'mr-1-6'}
                >
                  <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>{removed ? "Add Gift" : "Remove Gift"}</Snippets.Heading>
                </Snippets.Button>
              </div>
            </div>
          </div>
          <div className={'w-full md:w-3/10'}>
            <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>
              {'Free'}
            </Snippets.Heading>
          </div>

          <div className={'w-full md:w-3/10'}>
            {quantity}
          </div>

          <div className={'hidden w-1/10 md:flex justify-end'}>
            <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>
              {'Free'}
            </Snippets.Heading>
          </div>
        </div>

      </div>
      <Snippets.Button
        title={'add to wishlist'}
        colour={'blank'}
        className={'block md:hidden absolute bottom-0 left-0 pl-1-6'}
        onClick={() => removeGift(type, product.handle)}
      >
        <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>{removed ? 'Add gift' : 'Remove gift'}</Snippets.Heading>
      </Snippets.Button>
    </div>
  )
}

type Props = {
  product: JSONProduct;
  message: string;
  type: 'collection' | 'product' | 'price';
  removed: boolean;
  removeGift: (type: 'collection' | 'product' | 'price', handle: string) => void;
  quantity: number
}

