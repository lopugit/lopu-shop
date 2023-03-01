import * as React from 'react'
import * as Snippets from 'snippets'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { Collection } from 'types'
import { ShopifyNext } from '@dotdev/next-components'

export class FilterSidebar extends React.PureComponent<FilterSidebar.Props, FilterSidebar.State> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    const { toggleFilters, visible, collection } = this.props
    return (
      <aside 
        className={`fixed inset-0 z-50 ${visible ? '' : 'pointer-events-none'}`}
      >
        <div
          className={'absolute inset-0'}
          onClick={(e) => {
            e.stopPropagation()
            toggleFilters()
          }}
        />
        <div 
          className={`fixed left-0 top-0 bottom-0 bg-grey p-1-6 w-full max-w-mobile transition-fast ${visible ? 'translate-x:0' : 'translate-x:-100'}`}
        >
          <div className={'flex items-center'}>
            <div className={'w-1/2'}>
              <Snippets.Button 
                title={'Close Filter side bar'}
                colour={'blank'} 
                className={'flex items-center'}
                onClick={toggleFilters}
              >
                <span
                  className={'bg-white p-1-3 border-black border'}
                >
                  <Snippets.Icon name={'cross'} width={14} label={'Close Filter side bar'}/>
                </span>
                <span className={'font-serif ml-1-3'}>
                  Filter
                </span>
              </Snippets.Button>
            </div>
            <div className={'w-1/2 text-right'}>
              <SearchSpring.Component.Consumer
                render={({ searchspring }) => {
                  const activeFilterCount = Object.keys(searchspring.changed).length
                  return (
                    <Snippets.Button
                      title={'Clear Filters'}
                      colour={'blank'}
                      onClick={() => {
                        searchspring.unsetFacetValues()
                        this.context.update({
                          willFilterReset: true
                        })
                      }}
                      className={`uppercase text-black ${activeFilterCount ? '' : 'opacity-30 pointer-events-none'} font-bold text-xs p-0-8 tracking-wide`}
                    >
                      {'Clear Filters'}
                    </Snippets.Button>
                  )
                }}
              />
            </div>  
          </div>
          <Snippets.CollectionFilter 
            collection={collection} 
            toggleFilters={this.props.toggleFilters}
          />
        </div>
      </aside>
    )
  }
}

export namespace FilterSidebar {
  export interface Props {
    visible: boolean;
    toggleFilters: () => void;
    collection?: Collection;
  }
  export interface State {}
}
