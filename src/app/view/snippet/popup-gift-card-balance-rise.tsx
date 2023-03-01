import * as React from 'react'
import * as Snippets from 'snippets'
import { CheckBalanceField } from './check-balance-rise'

declare const CONNECTOR_URL: string

export const PopupGiftCardBalanceRise: React.FC<Props> = ({ visible, handlePopup }) => {
  return (
    <div className={`fixed inset-0 z-40 items-center md:items-start justify-center ${visible ? 'flex' : 'hidden'}`} role="dialog">
      <div className={'cursor-pointer absolute bg-black opacity-50 inset-0 z-40'} onClick={() => handlePopup(false)} />
      <div className={'w-full mx-3-2 flex items-center md:max-w-md z-50 h-full'}>
        <div className={'bg-white relative w-full overflow-y-auto max-h-full'}>
          <div className={'absolute right-0 top-0 h-4 w-4 flex items-center justify-center'}>
            <Snippets.Button
              colour={'blank'}
              className={'underline'}
              type={'button'}
              onClick={() => handlePopup(false)}
              title={'Close popup'}
            >
              <Snippets.Icon name={'cross'} height={14} width={14} />
            </Snippets.Button>
          </div>
  
          <div className={'w-full max-w-md p-4-2 mx-auto text-center'}>
            <Snippets.Heading 
              size={'h3'} 
              tag={'h1'} 
              className={'mb-2'}
            >
              {'Check card balance'}
            </Snippets.Heading>
            <CheckBalanceField/>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  handlePopup: (open: boolean) => void
  visible: boolean
}

type GiftCardResponse = {
  data: {
    number: string
    available_amount: string
    expiry_date: string
  }
}