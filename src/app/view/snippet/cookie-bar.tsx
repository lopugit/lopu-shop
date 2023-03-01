import * as React from 'react'
import * as Helpers from 'helpers'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'

export class CookieBar extends React.PureComponent<CookieBar.Props, CookieBar.State> {
  public static contextType = ShopifyNext.Context;

  public colours = {
    transparent: "backdrop-blur",
    white: "bg-white",
    grey: "bg-grey",
    "warm-grey": "bg-grey-warm",
  }

  public constructor(props) {
    super(props)
    this.state = {
      cookiePolicyAccepted: false
    }
  }

  private handleCookiePolicyAccept = (): void => {
    this.setState({
      cookiePolicyAccepted: true
    })
    this.context.update({
      cookiePolicyAccepted: true
    })
    ShopifyNext.Utils.setLocalStorage('theme:cookiepolicyaccepted', true)
    if(document.getElementById('gorgias-web-messenger-container')) {
      if(window.innerWidth < 415) {
        document.getElementById('gorgias-web-messenger-container').style.marginBottom = '35px'
      } else {
        document.getElementById('gorgias-web-messenger-container').style.marginBottom = '0px'
      }
    }
  }
  render() {
    const maxWidth = window.innerWidth - 200
    const colour = this.colours[this.props.data.section.header.settings.cookiestyle]

    return (
      <div className={`${this.state.cookiePolicyAccepted ? 'opacity-0 invisible pointer-events-none' : ' opacity-100 visible pointer-events-auto'} transition transition-delay`}>
        <div className={'flex px-1-6 pb-5-6 md:pb-1-6 fixed bottom-0 w-full'}>
          <div className={`flex-1 border border-black ${colour}`}>
            <div className={'flex justify-center items-center'}>
              <div className={'flex flex-row'}>
                <Helpers.Marquee style={{ maxWidth: maxWidth }} className={'h-4 flex items-center'} hoverToStop loop text={'We use cookies to give our customers the most relevant experience. By continuing to browse this site, you are consenting to our use of cookies. Read more about our'} />
                <Snippets.Button className={'flex items-center h-4 px-0-8'} colour={'blank'} title={'cookie policy'} href={Helpers.check(this, 'this.props.settings.cookie') ? this.props.settings.cookie : '/pages/our-policies#cookie-policy'}>
                  <span className={'underline whitespace-no-wrap'}>
                    Cookie Policy
                  </span>
                </Snippets.Button>
              </div>
            </div>
          </div>
          <Snippets.Button title={'accept cookie policy'} colour={'blank'} className={`flex items-center justify-center border-t border-r border-b border-black uppercase font-bold tracking-wide px-1 text-xs ${colour}`} onClick={this.handleCookiePolicyAccept}>
            I agree
          </Snippets.Button>
        </div>
      </div>
    )
  }
}

export namespace CookieBar {
  export interface Props extends GlobalProps{
    className?: string;
  }
  export interface State {
    cookiePolicyAccepted: boolean
  }
}