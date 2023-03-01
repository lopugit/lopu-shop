import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import { SSResults } from '@dotdev/reactive-searchspring'

export class GlobalSearchResultsLoading extends React.Component<SSResults.Component.Loading.Props> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return (
      <div className={'w-full'}>
        <div className={'max-w-7xl mx-auto pb-4 md:pt-2 md:pt-3-4'}>
          <div className={'flex flex-wrap'}>
            <div className={'w-full md:w-1/6 px-2 md:px-0 pb-3 md:pb-0'}>
              <Snippets.Heading size={'h5'} tag={'h5'} className={'pb-0-7 md:pb-2 leading-loose'}>
                Search Suggestions
              </Snippets.Heading>
              <ul className={'list-reset'}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <li className={'block py-0-7'} key={i}>
                    <div className={`content-placeholder ${i % 2 ? 'xsmall' : i % 3 ? 'medium' : 'small'} py-0-6 my-0-5`} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={'w-full md:w-5/6'}>
              <p className={'pb-0-7 text-xs text-black uppercase font-bold px-1'}>
                {'Products'}
              </p>
              <div className={'flex flex-wrap'}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className={'w-1/2 md:w-1/5 px-1 py-0-8'} key={i}>
                    <div className={'w-full flex flex-wrap transition-fast border-grey-border border  px-1 py-0-8'}>
                      <div className={'w-full mb-0-8 content-placeholder relative ratio-3:4'}>
                      </div>

                      <div
                        className={'flex flex-col flex-no-wrap flex-1 justify-between items-start w-full text-sm tracking-wide font-normal'}
                      >
                        <div className={'content-placeholder small py-0-6 mb-1-5'} />
                        <div className={'content-placeholder xsmall py-0-6'} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
