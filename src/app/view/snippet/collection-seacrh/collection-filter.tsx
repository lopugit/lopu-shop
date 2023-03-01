import * as React from 'react'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { Collection } from 'types'
import * as Snippets from 'snippets'

export class CollectionFilter extends React.PureComponent<CollectionFilter.Props> {
  public render(): JSX.Element {
    const { collection } = this.props
    return (
      <div className={'mt-3-3 h-full overflow-x-hidden overflow-y-auto hide-scrollbar pb-8'}>
        <SearchSpring.Component.Consumer
          render={({ searchspring }) => {
            return searchspring.current.results.length > 0 ? (
              <React.Fragment>
                <SearchSpring.Component.Filter
                  component={{
                    grid: Snippets.CollectionFilterItem,
                    list: Snippets.CollectionFilterItem,
                    slider: Snippets.FilterSlider
                  }}
                  props={{
                    resetPagination: () => {
                      searchspring.setPaginationPage(1, true)
                    },
                    collection
                  }}
                  hideFacets={collection ? ['collection_id'] : []}
                  hideSingleValue={false}
                />
                <div className={'w-full flex md:hidden justify-center mt-2'}>
                  <Snippets.Button
                    colour={'secondary'}
                    title={'Apply Filter'}
                    className={'w-1/2'}
                    onClick={this.props.toggleFilters}
                  >
                    <Snippets.Heading
                      size={'h5'}
                      tag={'p'}
                    >
                    Apply
                    </Snippets.Heading>
                  </Snippets.Button>
                </div>
              </React.Fragment>
            ) : <Snippets.Heading size={'h5'} tag={'p'} className={'w-full text-center text-error'}>No result, clear filter</Snippets.Heading>
          }}
        />
      </div>
    )
  }
}

export namespace CollectionFilter {
  export interface Props {
    collection?: Collection;
    toggleFilters: () => void
  }
}
