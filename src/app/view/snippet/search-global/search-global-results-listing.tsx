import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import { SearchSpring, SSResults } from '@dotdev/reactive-searchspring'
import { SearchGlobalResultsListingItem } from './search-global-results-listing-items'
export class SearchGlobalResultsListing extends React.Component<SearchGlobalResultsListing.Props> {
  public static contextType = ShopifyNext.Context;

  public render(): JSX.Element {
    return (
      <div className={'w-full'}>
        <div className={'max-w-7xl mx-auto pb-12 md:pb-4 md:pt-2 md:pt-3-4'}>
          <div className={'flex flex-wrap'}>
            <div className={'w-full md:w-1/6 px-2 md:px-0 pb-3 md:pb-0'}>
              <Snippets.Heading size={'h5'} tag={'h5'} className={'pb-0-7 md:pb-2 leading-loose'}>
                Search Suggestions
              </Snippets.Heading>
              <SearchSpring.Component.Suggest
                render={({ search, suggestions, setAutocomplete, getSuggestions }) => {

                  return suggestions.length > 0 ? (
                    <ul className={'list-reset'}>
                      <li className={'inline-block w-1/2 lg:w-full'}>
                        <span
                          className={'block leading-loose text-base font-light cursor-pointer'}
                          onClick={(e) => {
                            e.preventDefault()
                            const url = `/search?q=${search}`
                            window.location.href = url
                          }}
                        >
                          <strong className={'font-blod'}>
                            {search}
                          </strong>
                        </span>
                      </li>
                      {suggestions.map((suggestion) => {
                        const split = suggestion.toLowerCase().split(this.context.state.searchTerms.toLowerCase())
                        return (
                          <li key={suggestion} className={'inline-block w-1/2 lg:w-full'}>
                            <span
                              className={'block leading-loose text-base font-light cursor-pointer'}
                              onClick={() => {
                                this.props.onType({
                                  target: {
                                    value: suggestion,
                                  },
                                })
                                setAutocomplete(suggestion)
                                getSuggestions()
                              }}
                            >
                              {split.length > 1 ? (
                                <span>
                                  {split[0]}
                                  <strong className={'font-blod'}>
                                    {this.context.state.searchTerms}
                                  </strong>
                                  {split[1]}
                                </span>
                              ) : (
                                suggestion
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p>No suggestions, try a different query</p>
                  )
                }}
              />
            </div>
            <div className={'w-full md:w-5/6 px-1 md:px-0 md:pl-0-4'}>
              <SearchSpring.Component.Consumer
                render={({ searchspring }) => {
                  const { results } = searchspring.current
                  return results && results.length ? <React.Fragment>
                    <Snippets.Heading size={'h5'} tag={'h5'} className={'pb-1-7 md:pb-2 pl-1 leading-loose'}>
                      Products
                    </Snippets.Heading>
                    <SearchGlobalResultsListingItem results={results} />
                  </React.Fragment> : null
                }}
              />
            </div>
          </div>
          <div className={'w-full text-right px-1'}>
            <SearchSpring.Component.Consumer
              render={({ searchspring }) => {
                return (
                  <a
                    href={`/search?q=${searchspring.query.search}`}
                    className="cursor-pointer"
                  >
                    {`${searchspring.current.pagination.totalResults} results for `}
                    <span
                      className="font-bold"
                    >
                      {searchspring.query.search}
                    </span>
                  </a>
                )
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export namespace SearchGlobalResultsListing {
  export interface Props extends SSResults.Component.Results.Props {
    onType: (value: any) => void;
  }
}
