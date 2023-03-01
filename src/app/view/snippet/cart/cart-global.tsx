import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, GlobalState } from 'types'
import * as Snippets from 'snippets'

export class CartGlobal extends React.PureComponent<CartGlobal.Props, CartGlobal.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <button
          className={
            'block no-underline relative'
          }
          onClick={() => this.context.update({ cartActive: true })}
        >
          <Snippets.Icon name={'bag'} width={window.innerWidth < 768 ? 45 : 40} className={'inline-block align-middle mb-0-5'} />
          {this.context.state.cart && this.context.state.cart.item_count > 0 ? (
            <div
              className={
                'rounded-full top-0 text-black absolute text-sm flex items-center justify-center text-center w-4-5 h-4-5 md:w-4 md:h-4'
              }
            >
              <span className={'font-semibold leading-none pt-0-2'}>
                {this.context.state.cart.item_count}
              </span>
            </div>
          ) : null}
        </button>
      </React.Fragment>
    )
  }
}

export namespace CartGlobal {
  export interface Props extends GlobalProps {
    className?: string;
  }
  export interface State extends GlobalState {
    itemCount: number;
  }
}
