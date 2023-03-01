import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import debounce from 'lodash.debounce'

export class UtilityNavigation extends React.PureComponent<UtilityNavigation.Props, UtilityNavigation.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: UtilityNavigation.Props) {
    super(props)
    this.state = {
      hover: false,
      wishlistItemsQuantity: null
    }
  }

  public handleHover(status: boolean): void {
    this.setState({
      hover: status
    })
  }

  private debouncedHandleHover = debounce(this.handleHover, 200)

  private handleCartHover = (status :boolean) => {
    this.context.update({
      cartActive: status
    })
  }

  private debouncedHandleCartHover = debounce(this.handleCartHover, 200)

  public componentDidUpdate = () => {
    const { wishlistItemsQuantity } = this.state

    // initalize wishlist items quantity
    if (this.context.state.wishlist) {
      if(!wishlistItemsQuantity && wishlistItemsQuantity !== 0 ) {
        this.setState({
          wishlistItemsQuantity: this.context.state.wishlist.items.length
        })
      }
    }
    // update wishlist items quantity
    if (typeof(wishlistItemsQuantity) === 'number' && this.context.state.wishlist.items) {
      if (wishlistItemsQuantity < this.context.state.wishlist.items.length) {
        this.setState({
          wishlistItemsQuantity: this.context.state.wishlist.items.length
        }, () => {
          this.handleHover(true)
          setTimeout(() => this.handleHover(false), 3000)
        })
      } else if (wishlistItemsQuantity > this.context.state.wishlist.items.length) {
        this.setState({
          wishlistItemsQuantity: this.context.state.wishlist.items.length
        })
      }
    }
  }

  public render(): JSX.Element {
    const { navActive, navInactive, toggleSearch } = this.props
    return (
      <React.Fragment>
        <ul className={'block text-sm text-black'} onMouseEnter={navActive} onMouseLeave={navInactive}>
          <li className={'inline-block mr-2 md:mr-1-6'}>
            <Snippets.Button href="/pages/stores-stockists" className={'relative'} colour={'blank'} title={'Store Locator'}>
              <Snippets.Icon
                name={'location'}
                width={window.innerWidth < 768 ? 50: 40}
                className={'inline-block align-middle'}
              />
            </Snippets.Button>
          </li>
          <li className={'hidden md:inline-block mr-2 md:mr-1-6'}>
            <Snippets.Button onClick={() => toggleSearch(true)} className={'relative'} colour={'blank'} title={'Store Locator'}>
              <Snippets.Icon name={'magnifying_glass'} width={window.innerWidth < 768 ? 50: 40} className={'relative inline-block align-middle'} />
            </Snippets.Button>
          </li>
          <li className={'inline-block mr-2 md:mr-1-6'}>
            <Snippets.CurrencySelector {...this.props} navInactive={navInactive}/>
          </li>
          <li className={'inline-block mr-2 md:mr-1-6'}
            onMouseEnter={() => this.debouncedHandleHover(true)}
            onMouseLeave={() =>  this.debouncedHandleHover(false)}
          >
            <a href="/account" className={'relative block no-underline'} title={'Account'}>
              <Snippets.Icon name={'account_icon'} width={window.innerWidth < 768 ? 50: 40} className={'inline-block align-middle md:h-7-2'} />
            </a>
            <Snippets.HeaderAccount
              {...this.props}
              className={`absolute inset-x-0 transition transition-delay border-b border-black ${this.state.hover ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
            />
          </li>
          <li className={'hidden md:inline-block mr-2 md:mr-1-6'}>
            <Snippets.CartGlobal {...this.props} />
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export namespace UtilityNavigation {
  export interface Props extends GlobalProps {
    navActive: () => void;
    navInactive: () => void;
    toggleSearch: (state: boolean) => void;
  }
  export interface State {
    hover: boolean;
    wishlistItemsQuantity: number;
  }
}
