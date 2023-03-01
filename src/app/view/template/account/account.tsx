import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class AccountTemplate extends React.Component<AccountTemplate.Props, AccountTemplate.State> {
  public constructor(props){
    super(props)
    this.state = {
      activeView: this.props.history.location.search ? this.props.history.location.search.slice(6) as 'details' | 'addresses' | 'wishlist' | 'orders' | 'preferences': 'details'
    }
  }

  private links: any[] = [
    {
      handle: 'details',
      title: 'My details',
      component: <Snippets.AccountDetails {...this.props}/>
    },
    {
      handle: 'addresses',
      title: 'Address Book',
      component: <Snippets.AccountAddresses mobile {...this.props}/>
    },
    {
      handle: 'wishlist',
      title: 'Wishlist',
      component: <Snippets.AccountWishlist {...this.props}/>
    },
    {
      handle: 'orders',
      title: 'Order History',
      component: <Snippets.AccountOrders mobile {...this.props}/>
    }, 
    {
      handle: 'preferences',
      title: 'Preferences',
      component: <Snippets.AccountPreferences  {...this.props}/>
    },
    {
      handle: 'reset',
      title: 'Reset Password',
      component: <Snippets.AccountReset {...this.props} />
    }
  ];

  private handleNav = (handle: 'details' | 'addresses' | 'wishlist' | 'orders' | 'preferences') => {
    this.setState({
      activeView: handle
    },() => this.props.history.push(`${this.props.history.location.pathname}?view=${handle}`))
  }

  public render(): JSX.Element {
    return (
      <Layouts.Theme {...this.props}>
        <main className={'max-w-7xl px-1-6 xl:px-0 mx-auto flex flex-wrap w-full md:pt-4'}>
          <Snippets.AccountNavigation links={this.links} active={this.state.activeView} handleClick={this.handleNav}/>
          <div className={'w-full md:w-9/12 px-1-7 pb-0 md:pb-6-4 md:px-0 relative'}>
            <div className={'mb-3-8 lg:mb-0'}>
              <Snippets.Heading size={'h1'} tag={'p'} className={'w-full md:pb-3-2 md:border-b md:border-grey-border mb-3-2'}>{'Welcome'}</Snippets.Heading>
            </div>
            {window.innerWidth < 768 && <div>
              {this.links.map(link => {
                const { handle, title, component } = link
                return (
                  <div key={`${handle} ${title}`} className={'pb-4-2 block'}>  
                    <div className={'flex flex-row justify-between md:hidden pr-1-3'} onClick={()=>this.handleNav(handle)}>
                      <Snippets.Heading size={'h5'} tag={'h2'}>{title}</Snippets.Heading>
                      <Snippets.Icon name={this.state.activeView === handle ? 'minus': 'plus'} width={14} height={14}/>
                    </div>
                    {this.state.activeView === handle && component}
                  </div>
                )})}
              <div className={'pb-4-2 block'}>  
                <a 
                  className={'flex flex-row justify-between md:hidden pr-1-3'}
                  href={'/account/logout'}
                >
                  <Snippets.Heading size={'h5'} tag={'h2'}>Sign Out</Snippets.Heading>
                </a>
              </div>
            </div>}
            
            {window.innerWidth >=768 && <div>
              {this.state.activeView === 'details' && <Snippets.AccountDetails {...this.props}/>}
              {this.state.activeView === 'addresses' && <Snippets.AccountAddresses {...this.props}/>}
              {this.state.activeView === 'wishlist' && <Snippets.AccountWishlist {...this.props}/>}
              {this.state.activeView === 'orders' && <Snippets.AccountOrders {...this.props} />}
              {this.state.activeView === 'preferences' && <Snippets.AccountPreferences {...this.props} />}
              {this.state.activeView === 'reset' && <Snippets.AccountReset {...this.props}/>}
            </div>}
          </div>
        </main>
      </Layouts.Theme>
    )
  }
}

export namespace AccountTemplate {
  export interface Props extends GlobalProps {}
  export interface State {
    activeView: 'details' | 'addresses' | 'wishlist' | 'orders' | 'preferences' | 'reset'
  }
}
