import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { Collection, GlobalProps } from 'types'
import * as Helpers from 'helpers'
import throttle from 'lodash.throttle'

export class ProductResults extends React.PureComponent<ProductResults.Props, ProductResults.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: ProductResults.Props) {
    super(props)

    this.state = {
      filtersActive: false,
      grid: ShopifyNext.Utils.getLocalStorage('collection:grid') || 'small',
      sort: 'hidden',
      prevScroll: 0,
      currentDirection: 'up',
    }
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.throttledHandleScroll)
    this.context.update({
      collection: this.props.collection
    })
  }
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll)
  }

  public componentDidUpdate(prevProps, prevState){
    if (prevState.filtersActive !== this.state.filtersActive) {
      Helpers.fixedBodyScroll(this.state.filtersActive)
    }
  }

  private handleScroll = (): void => {
    this.setState((prevState) => {
      const { prevScroll } = prevState
      if (prevScroll === 0) {
        return window.scrollY > 100 ? (
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
        const changeY = window.scrollY - prevScroll
        return ({
          ...prevState,
          prevScroll: window.scrollY,
          currentDirection: changeY > 0 ? 'down' : 'up',
        })
      }
    })
  }

  private throttledHandleScroll = throttle(this.handleScroll, 500)

  private toggleFilters = (): void => {
    this.setState((state) => {
      return {
        filtersActive: !state.filtersActive
      }
    })
  }

  private toggleSort = (): void => {
    this.setState((state) => {
      return {
        sort: state.sort === 'visible' ? 'hidden' : 'visible'
      }
    })
  }

  private changeGrid = (): void => {
    this.setState((state) => {
      return {
        grid: state.grid === 'small' ? 'large' : 'small'
      }
    }, () => {
      ShopifyNext.Utils.setLocalStorage('collection:grid', this.state.grid)
    })
  }
  public render(): JSX.Element {
    const firstPageItems = 8;
    const { filtersActive, grid, sort, currentDirection } = this.state
    const { collection, search, parentCollection } = this.props

    const cards = Helpers.check(this.props.collection, 'collection.metafields.dtk.fields.root.cards') ? this.props.collection.metafields.dtk.fields.root.cards : []
    const cardsInFold = cards ? cards.filter(card => card.position <= firstPageItems) : []
    
    return <React.Fragment>
      <SearchSpring.Component.Consumer
        render={({ searchspring }) => {
          let filterItems = 0
          Object.keys(searchspring.query.filters).forEach(() => filterItems = filterItems + 1)
          Object.keys(searchspring.query.ranges).length !== 0 && (filterItems = filterItems + 1)
          return (search && searchspring.current.pagination.totalResults !== 0) || (collection && !parentCollection) ? <div className={`flex bg-white sticky transition transition-delay ${currentDirection == 'down' ? 'top-0' : 'top-96 md:top-112'} z-20 overflow-hidden`}>
            <div className={`bg-grey absolute inset-0 z-20 transition flex items-center md:p-1-6 ${sort === 'visible' ? '' : 'opacity-0 pointer-events-none translate-y:100'}`}>
              <div className={'hidden md:block w-1/4 flex items-center pl-0-8'}>
                <p className={'font-serif whitespace-no-wrap'}>
                  {'Sort by:'}
                </p>
              </div>
              <div className={'w-full md:w-1/2 px-0-8'}>
                <SearchSpring.Component.Sort
                  render={({ value, sorting, setSort }) => (
                    <ul className={'flex flex-no-wrap items-center justify-start md:justify-center md:px-0 w-full overflow-x-auto hide-scrollbar'}>
                      {sorting.options.map((option, i) => (
                        <li
                          className={`${value === option.value ? '' : 'opacity-30'} ${i === sorting.options.length - 1 ? 'pr-6-6' : ''}`}
                          key={i}
                        >
                          <button
                            className={'w-full uppercase px-0-8 font-bold text-xs tracking-wide whitespace-no-wrap'}
                            onClick={() => setSort(option.value)}
                            aria-label={option.label}
                          >
                            {option.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                />
              </div>
              <div className={'absolute md:relative right-0 pr-1-6 md:w-1/4 flex items-center justify-end'}>
                <Snippets.Button
                  title={'Close Sort By'}
                  colour={'blank'}
                  className={'flex items-center'}
                  onClick={this.toggleSort}
                >
                  <span
                    className={'bg-white p-1-3 border-black border'}
                  >
                    <Snippets.Icon name={'cross'} width={14} label={"Close sort by"}/>
                  </span>
                </Snippets.Button>
              </div>
            </div>
            <div className={`bg-white border-b border-black w-full z-20 transition flex flex-row justify-between items-center p-1-6 ${sort === 'visible' ? 'opacity-0 pointer-events-none translate-y:-100' : ''}`}>
              <div className={'w-1/3 flex flex-row items-center'}>
                <Snippets.Button
                  title={'Open filter menu'}
                  colour={'blank'}
                  className={'flex items-center mr-1-6'}
                  onClick={() => this.toggleFilters()}
                >
                  <Snippets.Icon name={'filter'} width={40} />
                  <Snippets.Heading tag={'h6'} className={'font-serif ml-0-8 hidden lg:block'}>
                    {'Filter by shape, material and more'}
                  </Snippets.Heading>
                </Snippets.Button>
                {filterItems > 0 ? <Snippets.Button
                  title={'Clear filter'}
                  colour={'blank'}
                  onClick={() => {
                    searchspring.unsetFacetValues()
                    this.context.update({
                      willFilterReset: true
                    })
                  }}
                  className={'flex flex-row items-center'}
                >
                  <div className={'border-15 rounded-half border-gray mr-1-6 relative'}>
                    <Snippets.Heading size={'h5'} tag={'h5'} className={'absolute transform-xy'}>{filterItems}</Snippets.Heading>
                  </div>
                  <Snippets.Heading size={'h5'} tag={'p'} className={'hidden 2xl:block'}>clear filter</Snippets.Heading>
                </Snippets.Button> : null}
              </div>
              <div className={'w-1/3 flex justify-center items-center'}>
                <Snippets.Button
                  title={'Display uniform layout grid'}
                  colour={'blank'}
                  className={`transition-opacity ${grid === 'large' ? 'opacity-30' : ''}`}
                  onClick={this.changeGrid}
                >
                  <Snippets.Icon
                    name={'layout_2_2'}
                    width={40}
                    className={'lg:hidden'}
                  />
                  <Snippets.Icon
                    name={'layout_4_4'}
                    width={40}
                    className={'hidden lg:block'}
                  />
                </Snippets.Button>
                <Snippets.Button
                  title={'Display alternate layout grid'}
                  colour={'blank'}
                  className={`transition-opacity ${grid === 'small' ? 'opacity-30' : ''}`}
                  onClick={this.changeGrid}
                >
                  <Snippets.Icon
                    name={'layout_1_1'}
                    width={40}
                    className={'lg:hidden'}
                  />
                  <Snippets.Icon
                    name={'layout_4_2'}
                    width={40}
                    className={'hidden lg:block'}
                  />
                </Snippets.Button>
              </div>
              <div className={'w-1/3 flex justify-end'}>
                <Snippets.Button
                  title={'Change sort method'}
                  colour={'blank'}
                  className={'flex items-center'}
                  onClick={this.toggleSort}
                >
                  <Snippets.Heading tag={'h6'} className={'font-serif mr-0-8 hidden lg:block'}>
                    {'Sort'}
                  </Snippets.Heading>
                  <Snippets.Icon name={'sort'} width={40} label={"Sort by"} />
                </Snippets.Button>
              </div>
            </div>
          </div> : null
        }}
      />
      {search ? <SearchSpring.Component.Consumer
        render={({ searchspring }) => {
          return searchspring.current.pagination.totalResults > 0 ? (
            <div className={'mt-3-2 md:mt-6-1 mb-3-2 md:pl-6-1 text-center md:text-left'}>
              <Snippets.Heading size={'h2'} tag={'h2'}>
                {`${searchspring.current.pagination.totalResults} ${
                  searchspring.current.pagination.totalResults == 1 ? 'item' : 'items'
                } found`}
              </Snippets.Heading>
            </div>
          ) : null
        }}
      /> : null}
      <section className={'pb-6-4'}>
        <main>
          {collection ? (
            <SearchSpring.Component.Results
              props={{
                collection,
                parentCollection,
                grid,
                limit: collection.limit ? Number(collection.limit) : 8,
                firstPageItems: firstPageItems
              }}
              pagination={{
                page: 1,
                limit: firstPageItems - cardsInFold.length
              }}
              component={{
                results: Snippets.CollectionResults,
                empty: Snippets.CollectionResults,
                loading: Snippets.CollectionResults
              }}
            />
          ) : null}

          {search ? (
            <SearchSpring.Component.Results
              props={{
                grid,
                settings: { ...search.settings },
                limit: Number(search.limit)
              }}
              pagination={{
                page: 1,
                limit: 8
              }}
              component={{
                results: Snippets.SearchResults,
                empty: Snippets.SearchResults,
                loading: Snippets.SearchResults
              }}
            />
          ) : null}
        </main>
      </section>
      <Snippets.FilterSidebar
        visible={filtersActive}
        toggleFilters={this.toggleFilters}
        collection={collection}
      />
    </React.Fragment>

  }
}

export namespace ProductResults {
  export interface Props extends GlobalProps {
    collection?: any;
    grid?: string;
    parentCollection?: Collection;
    search?: any;
  }
  export interface State {
    filtersActive: boolean;
    grid: string;
    sort: string;
    prevScroll: number;
    currentDirection: string;
  }
}
