import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import * as Snippets from 'snippets'

export class SearchGlobal extends React.PureComponent<SearchGlobal.Props> {
  public searchInput = null;
  public render(): JSX.Element {
    const { searchValue, toggleSearch, onType, searchOpen, onClear } = this.props

    return (
      <SearchSpring.Component.Search
        render={(props) => {
          return (
            <div className={'bg-white md:border-b border-black'}>
              <div className={'mx-auto max-w-container block w-full relative'}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const url = `/search?q=${props.value}`
                    window.location.href = url
                  }}
                  className={'w-full'}
                >
                  <div className={'flex items-center py-1-6 px-0-8 md:px-1-6'}>
                    <div>
                      <Snippets.Icon name={'magnifying_glass'} width={40} />
                    </div>
                    <div className={'flex-1'}>
                      <input
                        id={"search"}
                        type={'text'} 
                        className={'w-full text-center'} 
                        ref={(searchInput) => this.searchInput = searchInput}
                        value={props.autocomplete}
                        onChange={(event) => {
                          onType(event)
                          props.setAutocomplete(event.target.value);
                        }}
                      />
                      <label htmlFor="search" className={"visually-hidden"}>Search</label>
                    </div>
                    <SearchSpring.Component.Consumer
                      render={({ searchspring }) => <input type="hidden" name="q" value={searchspring.query.search} />}
                    />
                    <div className={'hidden md:block'}>
                      <Snippets.Button
                        title={'open search input'}
                        type={'submit'}
                        colour={'secondary'}
                        className={'uppercase tracking-wide'}
                      >
                        {'Search'}
                      </Snippets.Button>
                    </div>
                    <div className={'ml-1-6'}>
                      <Snippets.Button
                        title={'close search input'}
                        type={'button'}
                        colour={'blank'}
                        className={'p-1-3'}
                        onClick={() => {toggleSearch(false); onClear()}}
                      >
                        <Snippets.Icon name={'cross'} width={14} ariaHidden/>
                      </Snippets.Button>
                    </div>
                  </div>
                </form>
                <div className={`transition ${searchOpen ? 'h-screen md:h-full' : 'opacity-0 h-0'} bg-white overflow-y-auto`} style={{
                  maxHeight: 'calc(100vh - 72px)'
                }}>
                  {searchValue ? <Snippets.SearchGlobalResults onType={onType} /> : null}
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export namespace SearchGlobal {
  export interface Props extends ShopifyNext.Props {
    searchOpen: boolean
    searchValue: string;
    toggleSearch: (state: boolean) => void;
    onType: (event: any) => void;
    onClear: () => void
  }
}
