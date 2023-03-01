import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import Sticky from 'react-stickynode'

export class CheckBalancePageTemplate extends React.Component<CheckBalancePageTemplate.Props, CheckBalancePageTemplate.State> {
  public constructor(props) {
    super(props)
    this.state = {
      anchor: window.location.hash.slice(1)
    }
  }

  private navList = Helpers.check(this, 'this.props.data.page.metafields.dtk.fields.sections') ? this.props.data.page.metafields.dtk.fields.sections.filter(section => section._name === 'anchor') : []

  public componentDidUpdate = (prevState) => {
    if(prevState.anchor !== this.state.anchor) {
      this.anchorScroll()
    }
  }

  private anchorScroll = () => {
    const { anchor } = this.state
    if(anchor) {
      const anchorElement = document.getElementById(anchor)
      if(anchorElement) {
        Helpers.scrollTo(
          anchorElement.offsetTop - window.innerHeight / 8,
          undefined,
          300
        )
      }
    }
  }

  private handleNavButtonOnClick = (anchor) => {
    this.setState({
      anchor
    }, () => {window.location.hash = anchor})
  }


  public render(): JSX.Element {

    const { page } = this.props.data
    const  headingTextAlign = (sections) => {
      const layouts = sections?.filter(item => item._name == 'layouts')
      return layouts?.length > 0 ? layouts[0].titlealign : 'left'
    }

    fetch('https://application.rise-ai.com/v1/gift-cards/?shop_url=lopu-shop.myshopify.com&code=eb8ec8137e30eebf&from_check_balance=true')
    
    return (
      <Layouts.Theme {...this.props}>
        <div id="Rise-page-51b93601-43f1-404e-8df1-afefbbf53f31" className="Rise-page h-64">
          <div className="Rise-page-spinner">
            <svg fill="#023246" viewBox="0 0 44 44">
              <path d="M15.542 1.487A21.507 21.507 0 0 0 .5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 0 0-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 1 0-.9-2.863z"></path>
            </svg>
          </div>
          <iframe 
            sandbox="allow-same-origin allow-scripts"
            src="https://str.rise-ai.com/check-balance?iframe=true" frameBorder="0"></iframe>
        </div>
        
      </Layouts.Theme>
    )
  }
}

export namespace CheckBalancePageTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    anchor: string;
  }
}
