import * as React from 'react'
import * as Snippets from 'snippets'

export const PopupGiftCard: React.FC<Props> = ({ visible, handlePopup, type, recipient, handleRecipient, email, handleEmail, sender, handleSender, message, handleMessage, children }) => (
<div className={`fixed inset-0 z-40 items-center md:items-start justify-center py-2 ${visible ? 'flex' : 'hidden'}`} role="dialog">
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
          size={'h2'} 
          tag={'h1'} 
          className={'mb-1'}
        >
          {'Send this eGift card to'}
        </Snippets.Heading>
        <p className="mb-0-8">
          Send the eGift card to yourself to print or direct to your recipient's inbox
        </p>
        <form className={'w-full block'}>
          <Snippets.Input
            required
            hideLabel
            type="text"
            label="Recipient name"
            placeholder="Recipient name"
            className={'mb-1-6 border border-grey-border'}
            value={recipient}
            onChange={(e) => handleRecipient(e.target.value)}
            maxLength={50}
          />
          <Snippets.Input
            required
            hideLabel
            type="email"
            label="Recipient email"
            placeholder="Recipient email"
            className={'mb-1-6 border border-grey-border'}
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
            maxLength={50}
          />
          <Snippets.Input
            required
            hideLabel
            type="text"
            label="From"
            placeholder="From"
            className={'mb-1-6 border border-grey-border'}
            value={sender}
            onChange={(e) => handleSender(e.target.value)}
            maxLength={50}
          />
          <textarea
            placeholder="Add your message here..."
            rows={3}
            className={'w-full block relative w-full h-full py-1-3 px-1-6 outline-none focus:outline-none border border-grey-border'}
            value={message}
            onChange={(e) => handleMessage(e.target.value)}
            maxLength={4000}
          />
          {children}
          <p className="text-center mt-0-8">Expect to recieve your eCard within 24 hours</p>
        </form>
      </div>
    </div>
  </div>
</div>
)

type Props = {
  handlePopup: (open: boolean) => void
  visible: boolean
  type: "Physical" | "Digital"
  recipient: string
  handleRecipient: (value: string) => void
  email: string
  handleEmail: (value: string) => void
  sender: string
  handleSender: (value: string) => void
  message: string
  handleMessage: (value: string) => void
}