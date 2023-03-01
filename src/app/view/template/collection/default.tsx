import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { GlobalProps, GlobalState } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Sections from 'sections'
import * as Helpers from 'helpers'

export class DefaultCollectionTemplate extends React.Component<DefaultCollectionTemplate.Props, DefaultCollectionTemplate.State> {
  public render(): JSX.Element {
    //@ts-ignore
    const collection = { ...this.props.data.collection, ...this.props.data.section.collection.settings }
    return (
      <Layouts.Theme {...this.props}>
        <div>
          <SearchSpring.Component.Provider
            searchspringOptions={{
              siteId: SEARCHSPRING_ID,
              querystring: true,
              query: collection.id
                ? {
                  bgFilters: {
                    collection_id: collection.id
                  }
                }
                : null
            }}
          >
            {collection ? <Snippets.CollectionTitle {...this.props} /> : null}
            <Sections.ProductResults {...this.props} collection={collection} />
          </SearchSpring.Component.Provider>
          {collection?.metafields?.dtk?.fields?.sections?.length > 0 ? (
            <ShopifyNext.Components.DynamicSections
              {...this.props}
              dtkSections={collection.metafields.dtk.fields.sections}
            />
          ) : null}
        </div>
      </Layouts.Theme>
    )
  }
}

declare const SEARCHSPRING_ID: string

export namespace DefaultCollectionTemplate {
  export interface Props extends GlobalProps { }
  export interface State extends GlobalState { }
}
