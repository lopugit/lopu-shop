import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class CurrencySelector extends React.PureComponent<CurrencySelector.Props, CurrencySelector.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return (
      <div className={'relative'}>
        <button
          aria-label="open currency selector list"
          className={'cursor-pointer'}
          onClick={() => {
            this.toggleOpen(true)
          }}
        >
          <Snippets.Heading size={'h5'} tag={'p'} className={'text-black'}>{this.context.state.cartCurrency}</Snippets.Heading>
        </button>
        <div className={`${this.context.state.currencySelectorActive ? 'block md:hidden' : 'hidden'} md:hidden w-screen h-screen fixed inset-0 bg-transparent z-40`}>
          <div className={`absolute w-31-1 transform-currency z-50 bg-white flex md:hidden flex-col items-center justify-center text-center pt-5-6 pb-4-8 border border-grey-border ${this.context.state.currencySelectorActive ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'}`}>
            <Snippets.Heading size={'h2'} tag={'h2'} className={'w-full mb-2 leading-close'}>Choose a currency</Snippets.Heading>
            <ul>
              {this.buildList()}
            </ul>
            <div className={'absolute right-0 top-0 pt-1-4 pr-1-4'} onClick={() => { this.toggleOpen(false); this.props.navInactive() }}>
              <Snippets.Icon name={'cross'} width={14}/>
            </div>
          </div>
        </div>
        {this.context.state.currencySelectorActive ? <div className={'md:block hidden w-screen h-screen fixed inset-0 bg-transparent z-40'} onClick={() => { this.toggleOpen(false); this.props.navInactive() }}></div> : null}
        <ul
          className={`hidden md:block absolute z-50 bg-white md:left-0 md:mt-3-1 md:translate-x:-25 py-0-8 ${
            this.context.state.currencySelectorActive ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
          }`}
        >
          {this.buildList()}
        </ul>
      </div>
    )
  }

  private toggleOpen = (state:boolean) => {
    this.context.update({
      currencySelectorActive: state
    })
  }

  private updateSelection = async (selected: string) => {
    if(window.location.search.includes('&currency')){
      const urlSearch = window.location.search
      
      window.location.search = urlSearch.replace( /\&currency=[A-Z]{3}/,`&currency=${selected}`)// eslint-disable-line no-useless-escape
    } else {
      window.location.search = `currency=${selected}`
    }
    this.context.update({
      //@ts-ignore
      cartCurrency: this.props.data.shop.cartCurrency
    })
  }

  private buildList = (): JSX.Element[] => {
    const { enabled_currencies } = this.props.data.shop
    return enabled_currencies ? enabled_currencies.map((currency, i: number) => {
      return (
        <li
          key={i}
          //@ts-ignore
          className={`py-1-2 md:py-0-8 px-1-5 cursor-pointer transition bg-transparent hover:text-white hover:bg-black text-black bg-white ${this.props.data.shop.cartCurrency === currency.iso_code ? 'hidden' : 'block'}`}
          onClick={(e) => {
            this.updateSelection(currency.iso_code); this.toggleOpen(false)
          }}
        >
          <Snippets.Heading size={window.innerWidth > 768 ? 'h5' : 'h3'} tag={'p'} className={'leading-close md:leading-tight'}>{currency.iso_code}</Snippets.Heading>
        </li>
      )
    })
      : []
  };
}

export namespace CurrencySelector {
  export interface Props extends GlobalProps {
    navInactive: () => void
  }
  export interface State {
    selectedCurrency: number;
  }
}
