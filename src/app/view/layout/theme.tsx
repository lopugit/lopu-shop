import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Sections from 'sections'
import * as Snippets from 'snippets'
import { GlobalProps, GlobalState } from 'types'
import * as Helpers from 'helpers'
declare const STOREFRONT_NAME: string
declare const STOREFRONT_PASSWORD: string
export class Theme extends React.Component<Theme.Props, Theme.State> {

  public static contextType = ShopifyNext.Context;
  private cart: any = this.props.data.cart;

  private static kewl = new Helpers.ShopifyKewl({
    store: STOREFRONT_NAME,
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props: Theme.Props) {
    super(props)
    const gender = ShopifyNext.Utils.getLocalStorage('gender') ? ShopifyNext.Utils.getLocalStorage('gender') : 'women'
    this.state = {
      cart: this.cart,
      locales: props.data.locales,
      wishlist: null,
      searchTerms: props.data.search ? props.data.search.terms : '',
      headerOffsetHeight: null,
      shop: this.props.data.shop,
      subscribePopup: false,
      gender: gender,
      cookiePolicyAccepted: ShopifyNext.Utils.getLocalStorage('theme:cookiepolicyaccepted'),
      geoRedirectionPopup: false
    }
  }

  public async componentDidMount() {
    const currencies = this.props.data.shop.enabled_currencies
    const baseCurrency = this.props.data.shop.currency
    //@ts-ignore
    const { cartCurrency } = this.props.data.shop
    //@ts-ignore
    window.baseCurrency = baseCurrency
    const exchangeRate = await Theme.kewl.getCurrencyExchangeRate(cartCurrency)
    //@ts-ignore
    window.exchangeRate = exchangeRate
    const newState = {
      ...this.state,
      cartActive: false,
      currencies,
      baseCurrency,
      cartCurrency,
      exchangeRate,
      limitedCartItems: {},
    }
    this.setState(newState, () => {
      this.context.update(newState)
      ShopifyNext.Cart.init(this.context, this.props.data)
      Helpers.check(this, 'this.props.match') ? ShopifyNext.Wishlist.init(this.context, this.props.data, this.props.match) : null
      ShopifyNext.Notifications.init(this.context, this.props.data)
      ShopifyNext.Helpers.init(this.context, this.props.data)
    })

    if (!ShopifyNext.Utils.getLocalStorage('subscribed')) {
      if (this.props.data.form.customer.posted_successfully) {
        ShopifyNext.Utils.setLocalStorage('subscribed', 'true')
        this.setState({
          subscribePopup: true
        })
      } else {
        setTimeout(() => {
          this.setState({
            subscribePopup: true
          })
        }, 5000)
      }
    }

    // If the user is logging in from the checkout page do not run this function because we do not want to change the cart.
    if (!window.location.search.includes('?checkout_url=')) {
      for (const item of this.cart.items) {
        if (item.properties._gift) {
          await ShopifyNext.Cart.removeItem(item.key)
        }
      }
    }

    document.getElementsByTagName('main')[0].id = 'main'
  }

  public render(): JSX.Element {
    const contentForLayout: string = window.location && window.location.pathname === '/challenge' ? document.querySelector('#content_for_layout').innerHTML : null
    const themeBackground = (window.location?.pathname?.includes('traceable-wool-') || window.location?.pathname?.includes('honest-wool-')) ? 'bg-beige' : window.location?.pathname?.includes('responsibility-') || window.location?.pathname?.includes('social-responsibility-') ? 'bg-grey' : 'bg-white'
    return (
      <>
        <a className="skip-link" href='#main'>Skip to content</a>
        <div className={`body-wrapper ${themeBackground}`}>
          <ShopifyNext.Context.Consumer>
            {() => (
              <React.Fragment>

                <Sections.Header {...this.props} section={this.props.data.section.header} searchValue={null} />
                {contentForLayout ? (
                  <div className={'min-h-half-screen flex items-center justify-center'}>
                    <div dangerouslySetInnerHTML={{ __html: contentForLayout }}>
                    </div>
                  </div>
                ) :
                  this.props.children
                }
                {this.props.data.template.name === 'index' && <h1 className={'hidden'}>Lopu</h1>}
                <footer>
                  <Sections.USP {...this.props} section={this.props.data.section.usp} />
                  <Sections.Footer {...this.props} section={this.props.data.section.footer} />
                </footer>
                <Sections.Instagram {...this.props} section={this.props.data.section.instagram} />
                {!window.location.pathname.includes('challenge') ? <Sections.PopupSubscribe
                  visible={this.state.subscribePopup}
                  toggleSubscribe={this.toggleSubscribe}
                  section={this.props.data.section['subscribe-popup']}
                  {...this.props}
                /> : null}
                {window.location.search === '?customer_posted=true' ? <Snippets.PopupSubscribeSuccess
                  visible={this.state.subscribePopup}
                  toggleSubscribe={this.toggleSubscribe}
                  section={this.props.data.section['subscribe-popup']}
                  {...this.props} /> : null}
                {window.location.search === '?form_type=customer' ? <Snippets.PopupSubscribeExisted
                  visible={this.state.subscribePopup}
                  toggleSubscribe={this.toggleSubscribe}
                  section={this.props.data.section['subscribe-popup']}
                  {...this.props} /> : null}
                <Sections.PopupGeoRedirecion geoRedirectionPopup={this.state.geoRedirectionPopup} handleGeoRedirectionPopup={this.handleGeoRedirectionPopup} section={this.props.data.section.geo} />
              </React.Fragment>
            )}
          </ShopifyNext.Context.Consumer>
        </div>
      </>
    )
  }

  toggleSubscribe = () => {
    this.setState((prevState) => {
      if (prevState.subscribePopup) {
        ShopifyNext.Utils.setLocalStorage('subscribed', 'true')
      }
      return {
        subscribePopup: !prevState.subscribePopup
      }
    })
  }

  handleGeoRedirectionPopup = (isActive) => {
    this.setState({
      geoRedirectionPopup: isActive
    })
  }
}

export namespace Theme {
  export interface Props extends GlobalProps { }
  export interface State extends GlobalState {
    cart: any;
    locales: any;
    searchTerms: string;
    shop: any;
    subscribePopup: boolean;
    wishlist: any;
    headerOffsetHeight: number;
    gender: string;
    cookiePolicyAccepted: boolean;
    geoRedirectionPopup: boolean;
  }
}
