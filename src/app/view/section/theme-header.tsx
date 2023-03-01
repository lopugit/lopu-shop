import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { GlobalProps, LinkList } from 'types'
import * as Sections from 'sections'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import debounce from 'lodash.debounce'

declare const SEARCHSPRING_ID: string

export class Header extends React.Component<Header.Props, Header.State> {
  public static contextType = ShopifyNext.Context;
  public headerWrapper = React.createRef<HTMLDivElement>();
  public static sectionId = 'header';
  public headerElement = null;
  public searchContainer = null;

  public constructor(props: Header.Props) {
    super(props)
    const { data } = this.props
    this.state = {
      searchValue: null,
      menuVisible: false,
      searchOpen: false,
      prevScroll: 0,
      currentDirection: 'up',
      navOpen: false,
      mainMenu: data.linklist[ShopifyNext.Utils.getMenu('desktop-women-new')],
      secondaryMenu: data.linklist[ShopifyNext.Utils.getMenu('desktop-men-new')],
      mobileMenMenu: data.linklist[ShopifyNext.Utils.getMenu('mobile-men')],
      mobileWomenMenu: data.linklist[ShopifyNext.Utils.getMenu('mobile-women')],
      isHeaderFixed: true,
      hover: false
    }
  }

  public componentDidMount = async () => {
    window.addEventListener('scroll', this.debouncedHandleScroll)

    this.state.searchValue !== this.context.state.searchTerms
      ? this.setState({
        searchValue: this.context.state.searchTerms,
        searchOpen:
          this.context.state.searchTerms &&
            this.context.state.searchTerms.length &&
            Helpers.check(this, 'window.location.pathname') &&
            window.location.pathname !== 'search'
            ? true
            : false
      })
      : null

    const res = await fetch('/?view=navigation', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    const text = await res.text()
    // Strip html comments so the JSON can be fetched in the theme customiser
    const json = JSON.parse(text.replace(/(<([^>]+)>)/gi, ''))
    this.setState({
      mainMenu: json.navigation['desktop-women-new'],
      secondaryMenu: json.navigation['desktop-men-new'],
      mobileMenMenu: json.navigation['mobile-men'],
      mobileWomenMenu: json.navigation['mobile-women'],
    })
  }

  public componentDidUpdate(prevProps, prevState) {
    if (prevState.menuVisible !== this.state.menuVisible) {
      Helpers.fixedBodyScroll(this.state.menuVisible)
    }
    if (this.context.state.cartActive && this.state.isHeaderFixed === false) {
      this.setState({
        isHeaderFixed: true,
      })
    }

    if (document.getElementById('gorgias-web-messenger-container') && !ShopifyNext.Utils.getLocalStorage('theme:cookiepolicyaccepted')) {
      if (window.innerWidth < 415) {
        document.getElementById('gorgias-web-messenger-container').style.marginBottom = '75px'
      } else {
        document.getElementById('gorgias-web-messenger-container').style.marginBottom = '40px'
      }
    }

    if (document.getElementById('gorgias-web-messenger-container') && ShopifyNext.Utils.getLocalStorage('theme:cookiepolicyaccepted') && document.getElementById('gorgias-web-messenger-container').style.marginBottom !== '35px' && window.innerWidth < 415) {
      document.getElementById('gorgias-web-messenger-container').style.marginBottom = '35px'
    }
  }

  public componentWillUnmount = () => {
    window.removeEventListener('scroll', this.debouncedHandleScroll)
  }

  private handleScroll = (): void => {
    this.setState((prevState) => {
      const { prevScroll } = prevState
      if (prevScroll === 0) {
        return window.scrollY > 40 ? (
          {
            ...prevState,
            prevScroll: window.scrollY,
            currentDirection: 'down'
          }
        ) : (
          {
            ...prevState,
            currentDirection: 'up'
          }
        )
      } else {
        const changeY = window.scrollY > 0 ? window.scrollY - prevScroll : 0 - prevScroll
        return ({
          ...prevState,
          prevScroll: window.scrollY > 0 ? window.scrollY : 0,
          currentDirection: changeY > 0 ? 'down' : 'up',
        })
      }
    })

    this.context.update({
      cartActive: false,
      currencySelectorActive: false
    })

    this.setState({
      isHeaderFixed: false
    })

    if (this.state.searchOpen) {
      this.toggleSearch(false)
    }
  }

  private debouncedHandleScroll = debounce(this.handleScroll, 250, { 'maxWait': 1000 })

  private handleType = (event: any): void => {
    const { value: searchValue } = event.target
    this.setState({
      searchValue: searchValue,
    }, () => {
      this.context.update({ searchTerms: searchValue })
    })
  }

  private toggleMobileNav = (): void => {
    this.setState(function (prevState) {
      return {
        menuVisible: !prevState.menuVisible
      }
    })
  }

  private toggleSearch = (state: boolean): void => {
    this.searchContainer.searchInput.focus()

    return this.setState(() => ({
      searchOpen: state
    }))
  };

  private onClear = (): void => {
    this.setState({ searchValue: '', searchOpen: false })
    this.context.update({ searchTerms: '' })
  };

  private navActive = (): void => {
    this.setState({
      navOpen: true
    })
  };

  private navInactive = (): void => {
    this.setState({
      navOpen: false
    })
  };

  private debouncedHandleHover = debounce(this.handleHover, 200)

  public handleHover(status: boolean): void {
    this.setState({
      hover: status
    })
  }

  public render(): JSX.Element {
    const { data } = this.props
    const {
      menuVisible,
      searchOpen,
      navOpen,
      mainMenu,
      secondaryMenu,
      mobileMenMenu,
      mobileWomenMenu,
      currentDirection,
      isHeaderFixed,
    } = this.state

    return (
      <SearchSpring.Component.Provider
        searchspringOptions={{
          siteId: SEARCHSPRING_ID,
          apiEndpoints: {
            suggest: `https://${SEARCHSPRING_ID}.a.searchspring.io/api/suggest/query`,
            search: `https://${SEARCHSPRING_ID}.a.searchspring.io/api/search/autocomplete.json`
          },
          debounce: {
            search: 0,
            autocomplete: 200,
            suggest: 0,
          }
        }}
      >
        <Sections.Announcement {...this.props} section={this.props.data.section.announcement} />
        <header className={'sticky top-0 flex flex-col inset-x-0 z-30 transition transition-delay bg-white'} ref={(header) => {
          if (!this.context.state.headerElement) {
            const announcementElement = document.getElementById('announcement-section')
            let height = header.clientHeight
            if (announcementElement) {
              height += announcementElement.clientHeight
            }
            this.headerElement = header
            this.context.update({
              headerElement: header,
              initialHeight: height
            })
          }
        }}>
          <section className={`z-30 relative transition transition-delay border-b border-grey-border sticky top-0 ${menuVisible || this.context.state.cartActive ? 'bg-white' : 'bg-transparent'}`}>
            <div className={'flex justify-center w-full mx-auto max-w-container h-5-6 md:h-7-2'}>
              <div className={'hidden xl:w-1/3 xl:flex items-center justify-center'}>
                <li className={'inline-block mr-2 md:mr-1-6'} />
              </div>
              <div className={'absolute left-0 xl:hidden h-5-6 md:h-7-2 flex items-center ml-0-8'}>
                <div className="text-white">
                  <Snippets.MobileMenu
                    visible={menuVisible}
                    toggleMobileNav={this.toggleMobileNav}
                    {...this.props}
                  />
                </div>
              </div>
              <div className={'absolute left-48 flex items-center justify-center h-full md:hidden'}>
                <Snippets.Button onClick={() => this.toggleSearch(true)} className={'relative'} colour={'blank'} title={'Search'}>
                  <Snippets.Icon name={'magnifying_glass'} width={window.innerWidth < 768 ? 40: 40} className={'relative inline-block align-middle'} />
                </Snippets.Button>
              </div>
              <div className={'md:ml-7-2 xl:ml-0 w-1/2 xl:w-1/3 flex items-center justify-center md:justify-start xl:justify-center'}>
                <div className={`w-25 md:ml-1-6 ${data.sections.some(section => section.name === 'heroalt') ? 'hidden' : 'block'}`}>
                  <Snippets.Logo
                    alt={data.shop.name}
                    className={'block max-w-full text-center'}
                    version={ShopifyNext.Utils.getLocalStorage('gender') === 'men' ? 'logo_man' : 'logo_woman'}
                  />
                </div>
              </div>
              <div className={'absolute right-8 flex items-center justify-center h-full md:hidden'} onMouseEnter={() => this.debouncedHandleHover(true)} onMouseLeave={() =>  this.debouncedHandleHover(false)}
              >
                <Snippets.CartGlobal {...this.props} />
              </div>
              <div className={'w-full fixed md:static bottom-4 md:bottom-auto md:w-1/2 xl:w-1/3 flex items-center justify-center md:justify-end bg-white md:bg-transparent border-t border-black md:border-0 md:mr-1-6'}>
                <Snippets.UtilityNavigation
                  {...this.props}
                  navActive={this.navActive}
                  navInactive={this.navInactive}
                  toggleSearch={this.toggleSearch}
                />
              </div>
            </div>
            <div className={'hidden lg:flex justify-center w-full mx-auto max-w-container'}>
              <Snippets.Navigation
                id={'main'}
                linklist={this.context.state.gender === 'women' ? mainMenu : secondaryMenu}
                navActive={this.navActive}
                navInactive={this.navInactive}
                className={'bg-white transition transition-delay'}
              />
            </div>
            <div
              className={`bg-white absolute inset-0 transition z-10  ${searchOpen ? 'translate-y:0 opacity-100' : 'translate-y:-100 opacity-0 pointer-events-none'}`}>
              <Snippets.SearchGlobal
                {...this.props}
                searchValue={this.state.searchValue}
                onClear={this.onClear}
                onType={this.handleType}
                toggleSearch={this.toggleSearch}
                searchOpen={this.state.searchOpen}
                ref={(searchContainer) => this.searchContainer = searchContainer}
              />
            </div>
          </section>
          {!ShopifyNext.Utils.getLocalStorage('theme:cookiepolicyaccepted') ? <Snippets.CookieBar {...this.props} /> : null}
          <Snippets.MobileNavigation
            {...this.props}
            id={'mobile-navigation'}
            toggleMobileNav={this.toggleMobileNav}
            linklist={this.context.state.gender === 'women' ? mobileWomenMenu : mobileMenMenu}
            visible={menuVisible}
          />
          <Snippets.CartDrawer {...this.props} />
        </header>
      </SearchSpring.Component.Provider>
    )
  }
}
export namespace Header {
  export type Options = ShopifyNext.Section<{
    main_menu: string;
    secondary_menu: string;
    background: string;
    colour: string;
    cookiestyle: string;
  }>;
  export interface Props extends GlobalProps {
    section: Header.Options;
    data: any;
    searchValue?: string;
  }
  export interface State {
    searchValue: string;
    searchOpen: boolean;
    menuVisible: boolean;
    prevScroll: number;
    currentDirection: 'up' | 'down';
    navOpen: boolean;
    mainMenu: LinkList;
    secondaryMenu: LinkList;
    mobileMenMenu: LinkList;
    mobileWomenMenu: LinkList;
    isHeaderFixed: boolean; 
    hover: boolean;
  }
}
