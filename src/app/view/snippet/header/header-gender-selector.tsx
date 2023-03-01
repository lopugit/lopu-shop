import * as React from 'react'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

export class GenderSelector extends React.PureComponent<GenderSelector.Props> {
  public static contextType = ShopifyNext.Context;


  private handleClick = (gender) => {
    this.context.update({
      gender: gender
    })
    ShopifyNext.Utils.setLocalStorage('gender', gender)
  }

  public render(): JSX.Element {
    return (
      <div className={`${this.props.className}`}>
        
        <ul className={'mx-3-2 text-center md:text-left text-white flex flex-row w-full md:w-auto'}>
          <li className="w-1/2 whitespace-no-wrap inline-block cursor-pointer md:mr-3-2" onClick={() => this.handleClick('women')}>
            <Snippets.Heading size={'h5'} tag={'p'} className={`${this.context.state.gender === 'women' ? 'opacity-100': 'opacity-50'}`}>women</Snippets.Heading>
          </li>
          <li className="w-1/2 whitespace-no-wrap inline-block cursor-pointer" onClick={() => this.handleClick('men')}>  
            <Snippets.Heading size={'h5'} tag={'p'} className={`${this.context.state.gender === 'men' ? 'opacity-100': 'opacity-50'}`}>men</Snippets.Heading>
          </li>
        </ul>
      </div>
    )
  }
}

export namespace GenderSelector {
  export interface Props {
    className?: string;
  }
}
