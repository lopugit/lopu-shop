import * as React from 'react'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { SearchGlobalResultsListing } from './search-global-results-listing'
import { GlobalSearchResultsLoading } from './search-global-results-loading'

export class SearchGlobalResults extends React.Component<SearchGlobalResults.Props> {
  public render(): JSX.Element {
    return (
      <SearchSpring.Component.Results
        pagination={{
          page: 1,
          limit: window.innerWidth > 768 ? 5 : 4
        }}
        component={{
          results: SearchGlobalResultsListing,
          loading: GlobalSearchResultsLoading
        }}
        props={{
          onType: this.props.onType,
        }}
      />
    )
  }
}

export namespace SearchGlobalResults {
  export interface Props {
    onType: (value: any) => void;
  }
}
