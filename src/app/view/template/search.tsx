import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Sections from 'sections'

export class SearchTemplate extends React.Component<SearchTemplate.Props, SearchTemplate.State> {
  public static contextType = ShopifyNext.Context;
  public typingTimer = null;

  public constructor(props: SearchTemplate.Props) {
    super(props)
  }

  public render(): JSX.Element {
    //@ts-ignore
    const search = { ...this.props.data.search, ...this.props.data.section.search.settings }
    return (
      <Layouts.Theme {...this.props}>
        <main>
          <SearchSpring.Component.Provider
            searchspringOptions={{
              siteId: SEARCHSPRING_ID,
              querystring: true,
              query: {
                search: search.terms
              },
              debounce: {
                search: 500,
                suggest: 500
              }
            }}
          >
            <SearchSpring.Component.Consumer
              render={({ searchspring }) => {
                return searchspring.current.pagination.totalResults > 0 ? (
                  <section className={'max-w-container mx-auto px-3-2 py-3-2 md:py-6-4'}>
                    <div className={'w-full text-black sm:mb-1-6 text-center'}>
                      <Snippets.Heading size={'h1'} tag={'h1'}>
                        {search.terms
                          ? `Search results for “${search.terms}”`
                          : 'Search Results'}
                      </Snippets.Heading>
                    </div>
                  </section>
                ) : null
              }}
            />
            <Sections.ProductResults {...this.props} search={search} />
          </SearchSpring.Component.Provider>
        </main>
      </Layouts.Theme>
    )
  }
}

declare const SEARCHSPRING_ID: string

export namespace SearchTemplate {
  export interface State {
    typedValue: string | null;
    searchValue: string | null;
  }
  export interface Props extends GlobalProps { }
}
