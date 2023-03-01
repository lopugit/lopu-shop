import * as React from 'react'
import { LinkList } from 'types'
import * as Snippets from 'snippets'

export class AccountNavigation extends React.PureComponent<AccountNavigation.Props, AccountNavigation.State> {
  public render(): JSX.Element {
    return (
      <section className={'hidden md:block md:w-1/6 mr-0-4 pt-0-8'}>
        <nav className={'max-w-lg mx-auto items-center content-center justify-between hidden md:flex'} aria-label="account page menu">
          <ul className={'w-full'}>
            {this.buildItems(this.props.links)}
            <li>
              <a
                title={'Sign out'}
                className={'block mb-2 cursor-pointer opacity-50'}
                href={'/account/logout'}
              >
                <Snippets.Heading size={'h5'} tag={'p'}>Sign Out</Snippets.Heading>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }

  private buildItems = (links: LinkList['links']): JSX.Element[] => {
    return links
      ? links.map((link: any, i: number) => {
        return (
          <li key={i} className={`${link.secondary ? 'ml-auto' : ''}`}>
            <a
              title={link.title}
              className={`block transition mb-2 cursor-pointer ${
                link.handle == this.props.active ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => this.props.handleClick(link.handle)}
            >
              <Snippets.Heading size={'h5'} tag={'p'}>{link.title}</Snippets.Heading>
            </a>
          </li>
        )
      })
      : []
  };
}

export namespace AccountNavigation {
  export interface Props {
    active?: string;
    links: LinkList['links'];
    handleClick: (handle: 'details' | 'addresses' | 'wishlist' | 'orders' | 'preferences') => void
  }
  export interface State { }
}
