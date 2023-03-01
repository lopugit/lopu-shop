import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'


export class AccountWishlistSharelink extends React.Component<AccountWishlistSharelink.Props> {
  public static contextType = ShopifyNext.Context;

  private socailShare = (type: 'twitter' | 'facebook') => {
    switch (type) {
    case 'twitter':
      window.open('https://twitter.com/home?status=' + this.props.shareLink, 'twitter-popup', 'height=400,width=600')
      break
    case 'facebook':
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.props.shareLink, 'facebook-popup', 'height=400,width=600')
      break
    }
  };

  private CopyToClipboard(shareLink) {
    const el = document.createElement('textarea')
    el.value = shareLink
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    window.alert(`The share link ${el.value} has been copied to your clipboard`)
  }

  public render(): JSX.Element {
    const { shareLink } = this.props

    return (
      <div className={`${this.props.className? this.props.className: ''}`}>
        <Snippets.Heading size={'h3'} tag={'p'} className={'mr-1-6'}>Share Wishlist</Snippets.Heading>
        <Snippets.Button
          title={'Share to Facebook'}
          className={'w-4 h-4 mr-0-4 md:mr-0-8 flex items-center justify-center cursor-pointer'}
          onClick={() => this.socailShare('facebook')}
          colour={'blank'}
        >
          <Snippets.Icon name={'facebook'} width={18} height={18} />
        </Snippets.Button>
        <Snippets.Button
          title={'Share to Twitter'}
          className={'w-4 h-4 mr-0-4 md:mr-0-8 flex items-center justify-center cursor-pointer'}
          onClick={() => this.socailShare('twitter')}
          colour={'blank'}
        >
          <Snippets.Icon name={'twitter'} width={40} height={40} />
        </Snippets.Button>
        <Snippets.Button
          title={'share by email'}
          className={'w-4 h-4 mr-0-4 md:mr-0-8 flex items-center justify-center cursor-pointer'}
          href={`mailto:?subject=Check%20my%20wishlist&body=${shareLink ? shareLink : ''}`}
          colour={'blank'}
        >
          <Snippets.Icon name={'envelope'} width={40} height={40} />
        </Snippets.Button>
        <Snippets.Button
          title={'copy link'}
          className={'w-4 h-4 flex items-center justify-center cursor-pointer'}
          onClick={() => this.CopyToClipboard(shareLink)}
          colour={'blank'}
        >
          <Snippets.Icon name={'copy'} width={20} height={20} />
        </Snippets.Button>
      </div>
    )
  }
}

export namespace AccountWishlistSharelink {
  export interface Props {
    shareLink: any;
    className?: string;
  }
}
