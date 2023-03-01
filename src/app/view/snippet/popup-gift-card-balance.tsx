import * as React from 'react'
import * as Snippets from 'snippets'

declare const CONNECTOR_URL: string

export const PopupGiftCardBalance: React.FC<Props> = ({ visible, handlePopup }) => {
  const [cardNumber, setCardNumber] = React.useState<string>("");
  const [pin, setPin] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [giftcard, setGiftCard] = React.useState<GiftCardResponse | null>(null);

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
  
          <div className={`w-full max-w-md p-4-2 mx-auto text-center`}>
            <Snippets.Heading 
              size={'h3'} 
              tag={'h1'} 
              className={'mb-2'}
            >
              {'Check card balance'}
            </Snippets.Heading>

            {giftcard ? (
              <>
                <p>{`Card Number: ${giftcard.data.number}`}</p>
                <p>{`Value remaining: AUD $${giftcard.data.available_amount}`}</p>
                <p className="mb-3">{`Expiry date: ${new Date(giftcard.data.expiry_date).getDate()}/${new Date(giftcard.data.expiry_date).getMonth() + 1}/${new Date(giftcard.data.expiry_date).getFullYear()}`}</p>
                <Snippets.Button
                  type="button"
                  name="Check a different card"
                  title="Check a different card"
                  colour={'primary'}
                  className={'mx-0-3 font-bold text-xs uppercase tracking-wider py-1-6 w-full'}
                  onClick={() => {
                    setPin("")
                    setCardNumber("");
                    setGiftCard(null)
                  }}
                >
                  {"Check a different card"}
                </Snippets.Button>
              </>
            ) : ( 
              <form className={'w-full block'} onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const res = await fetch(`${CONNECTOR_URL}api/check-balance`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    number: cardNumber,
                    pin,
                  })
                });
                if (res.status === 200) {
                  const json = await res.json();
                  setGiftCard(json);
                } else {
                  setError("Gift card not found");
                }
                setLoading(false);
              }}>
                <Snippets.Input
                  required
                  hideLabel
                  type="text"
                  label="Enter card number"
                  placeholder="Card number"
                  className={'mb-1-6 border border-grey-border'}
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <Snippets.Input
                  required
                  hideLabel
                  type="text"
                  label="Enter card PIN"
                  placeholder="Card PIN"
                  className={'mb-1-6 border border-grey-border'}
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                {error ? (
                  <div className={'text-left font-medium text-red italic leading-normal mt-0-6 px-1-6'}>
                    <p className={'mb-0-4'}>
                      {error}
                    </p>
                  </div>
                ) : null}
                 
              </form>
            )}
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