import * as React from 'react'
import * as Snippets from 'snippets'
import { JSONProduct } from 'types'
import { formatMoney } from '@dotdev/next-components/dist/utils'

export const GiftDrawer: React.FC<Props> = ({
  removed,
  product,
  message,
  removeGift,
  type,
  quantity
}) => {
  return (
    <div
      className={`flex flex-wrap border-b border-grey-border ${removed ? 'opacity-30' : ''}`}
      key={`gift-${product.id}`}
    >
      <div className={'pb-2-3 pt-2-4 w-full'}>
        <div className={'flex w-full'}>
          <div className={'w-1/2 md:w-3/10'}>
            <Snippets.Image
              alt={`${product.title} featured image`}
              src={product.image?.src}
              ratio={'1:1'}
              className={'relative'}
            />
          </div>
          <div className={'w-1/2 md:w-7/10 ml-2 flex flex-col relative'}>
            <div className={'flex-1'}>
              <Snippets.Heading
                size={'h3'}
                tag={'p'}
                className={'mb-1'}
              >
                {product.title}
              </Snippets.Heading>
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>
                {message}
              </Snippets.Heading>
            </div>
            <div className={'flex flex-wrap md:flex-no-wrap'}>
              <div className={'w-full flex items-center pt-0-6 md:pt-0'}>
                <div className={'flex flex-1 items-center py-0-4'}>
                  <Snippets.Button
                    title="Remove gift"
                    colour="blank"
                    onClick={() => removeGift(type, product.handle)}
                  >
                    {removed ? 'Add gift' : 'Remove gift'}
                  </Snippets.Button>
                </div>
                <Snippets.Heading
                  size={'h3'}
                  tag={'p'}
                  className={'inline'}
                >
                  { quantity && quantity > 1 ? quantity + 'x' : '' } {'Free'}
                </Snippets.Heading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  product: JSONProduct;
  message: string;
  type: 'collection' | 'product' | 'price';
  removed: boolean;
  removeGift: (type: 'collection' | 'product' | 'price', handle: string) => void;
  quantity: number;
}


