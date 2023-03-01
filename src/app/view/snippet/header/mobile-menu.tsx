import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'

export class MobileMenu extends React.PureComponent<MobileMenu.Props, MobileMenu.State> {
  public render(): JSX.Element {
    const { visible, toggleMobileNav } = this.props

    return (
      <div className={'inline-block xl:hidden align-middle'}>
        {visible ? (
          <button type={"button"} aria-expanded={false} aria-control={"mobile-navigation"} onClick={() => toggleMobileNav()} className={'flex focus:outline-none h-4 w-4 items-center justify-center'}>
            <Snippets.Icon name={'cross'} width={14} className={'block'} label={"open menu"}/>
          </button>
        ) : (
          <button type={"button"} aria-expanded={true} onClick={() => toggleMobileNav()} className={'flex focus:outline-none items-center justify-center'}>
            <Snippets.Icon name={'hamburger'} width={40} className={'block text-black'} label={"close menu"}/>
          </button>
        )}
      </div>
    )
  }
}

export namespace MobileMenu {
  export interface Props extends GlobalProps {
    toggleMobileNav: any;
    visible: boolean;
  }
  export interface State {}
}
