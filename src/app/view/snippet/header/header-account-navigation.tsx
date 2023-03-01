import * as React from 'react'
import * as Snippets from 'snippets'

export class HeaderAccountNavigation extends React.PureComponent<HeaderAccountNavigation.Props, HeaderAccountNavigation.State> {
  private links: any[] = [
    {
      url: '/account?view=details',
      title: 'My details',
    },
    {
      url: '/account?view=addresses',
      title: 'Address Book',
    },
    {
      url: '/account?view=wishlist',
      title: 'Wishlist',
    },
    {
      url: '/account?view=orders',
      title: 'Order History',
    },
    {
      url: '/account?view=preferences',
      title: 'Preferences',
    },
    {
      url: '/account?view=reset',
      title: 'Reset Password',
    },
    {
      url: '/account/logout',
      title: 'Sign Out'
    }
  ];

  public render(): JSX.Element {
    return (
      <section className={'w-1/4 mr-0-4 pt-0-8'}>
        <nav className={'max-w-lg mx-auto items-center content-center justify-between flex'} aria-label="account page menu">
          <ul className={'w-full'}>
            {this.links.map(({ url, title}) => {
              return (
                <li key={title}>
                  <Snippets.Link
                    title={title}
                    href={url}
                    className={'block transition mb-2 cursor-pointer'}
                  >
                    <Snippets.Heading size={'h5'} tag={'p'}>{title}</Snippets.Heading>
                  </Snippets.Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </section>
    )
  }
}

export namespace HeaderAccountNavigation {
  export interface Props { }
  export interface State { }
}
