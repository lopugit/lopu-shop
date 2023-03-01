import * as React from 'react'
import * as Helpers from 'helpers'
import { JSONProduct } from 'types'
import { LineItem } from 'types'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

async function changeGiftProperty(lineitem: LineItem, opt_out: boolean) {
  ShopifyNext.Cart.updateProperties(lineitem.key, {_gift_opt_out: opt_out? 'yes': 'no'})
}


export const GiftWithPurchase: React.FC<{
  tags: string[];
  quantity: number;
  lineitem: LineItem;
}> = ({ tags, quantity, lineitem }) => {
  const [gift, setGift] = React.useState<JSONProduct>(null)
  const [opt_out, setOptOut] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    (async () => {
      const boxPrefix = 'x_tag-list-entry:gift:'
      const giftTag = tags.find((tag) => tag.includes(boxPrefix))
      if (!giftTag) return
      const handle = giftTag.split(boxPrefix)[1]
      const _product = await Helpers.getGiftProduct(handle)
      if (_product) {
        setGift(_product.product)
      }
    })()

  }, [])

  const buttonHandler = () => {
    changeGiftProperty(lineitem, !opt_out)
    setOptOut(current => !current)
  }

  return gift ? (
    <div className={`w-full flex flex-row px-1-6 md:px-0 pb-2-3 pt-2-6 md:pt-2 md:pb-2 md:border-b md:border-grey-border relative ${opt_out ? 'opacity-30' : ''}`}>
      <div className={'w-1/2 md:w-2/12 pr-0-9 md:pr-1-8'}>
        <Snippets.Image
          alt={`${gift.title} featured image`}
          src={gift.image.src}
          ratio={'1:1'}
          className={'relative border border-grey-border'}
        />
      </div>

      <div className={'w-1/2 md:w-10/12 flex items-center relative'}>
        <div className={'w-full h-full md:h-auto flex flex-wrap items-start pl-1 md:pl-0'}>
          <div className={'w-8/9 md:w-3/10 md:pl-0-6'}>
            <div
              className={'block transition-fast no-underline text-base leading-normal tracking-normal mb-1 md:mb-0 pr-1-6'}
            >
              <Snippets.Heading 
                size={'h2'} 
                tag={'p'} 
                className={'mb-0-8'}>
                {gift.title}
              </Snippets.Heading>
            </div>
          </div>
          <div className={'w-3/10'}>
            <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>Free</Snippets.Heading>
          </div>
          <div className={'w-3/10'}>
            <Snippets.Heading size={'h3'} tag={'p'} className={'inline'}>
              {quantity}
            </Snippets.Heading>
          </div>

          <div className={'hidden w-1/10 md:flex justify-end'}>
            <Snippets.Heading size={'h3'} tag={'p'} className={'inline text-right'}>
              {`Complimentary gift worth ${ShopifyNext.Utils.formatMoney((Number(gift.variants[0].price) * quantity) * 100, '${{amount_no_decimals}}')}`}
            </Snippets.Heading>
          </div>
          <div className={'flex md:w-1/10 justify-start -ml-0-2 md:pl-0-6'}>
            <Snippets.Button
              title={opt_out ? 'opt out' : 'opt in'}
              onClick={buttonHandler}
              colour={'blank'}
              className={'mr-1-6'}
            >
              {
                /*
        <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light underline'}>Remov{opt_out ? "ing...": "e"}</Snippets.Heading>
                 * */
              }
              <Snippets.Heading size={'none'} tag={'p'} className={'text-xs leading-tight font-light flex justify-start items-center min-w-10'}>
                <Snippets.Icon
                  name={opt_out ? 'checkbox_no' : 'checkbox_yes'}
                  width={18}
                  ariaHidden
                  className={'bg-white text-black inline-block border-white mr-0-5'}
                />
                {opt_out ? 'removing...' : 'Remove gift'}
              </Snippets.Heading>
            </Snippets.Button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
