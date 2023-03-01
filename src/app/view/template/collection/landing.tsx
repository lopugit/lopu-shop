import * as Layouts from 'layouts'
import * as React from 'react'
import * as Snippets from 'snippets'
import * as Sections from 'sections'
import * as Helpers from 'helpers'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import { GlobalProps } from 'types'

export class LandingCollectionTemplate extends React.Component<LandingCollectionTemplate.Props> {
  public constructor(props: LandingCollectionTemplate.Props) {
    super(props)
  }

  public render(): JSX.Element {
    const { collection } = this.props.data
    return (
      <Layouts.Theme {...this.props}>
        {collection ? <Snippets.CollectionTitle {...this.props} /> : null}
        {
          Helpers.check(collection, 'collection.metafields.dtk.fields.root.blocks') ? collection.metafields.dtk.fields.root.blocks.map(block => (
            <section key={block.collection.id}>
              <header className={'mb-3-2 md:pl-6-1 text-center md:text-left'}>
                <a href={block.collection.url} title={block.collection.title}>
                  <Snippets.Heading tag={'h2'}>
                    {block.collection.title}
                  </Snippets.Heading>
                </a>
              </header>
              <main>
                <SearchSpring.Component.Provider
                  searchspringOptions={{
                    siteId: SEARCHSPRING_ID,
                    querystring: true,
                    query: block.collection.id
                      ? {
                        bgFilters: {
                          collection_id: block.collection.id
                        }
                      }
                      : null
                  }}
                >
                  <Sections.ProductResults
                    {...this.props}
                    collection={block.collection}
                    parentCollection={collection}
                  />
                </SearchSpring.Component.Provider>
              </main>
            </section>
          )) : (
            <p>No subcollections</p>
          )
        }
      </Layouts.Theme>
    )
  }
}

declare const SEARCHSPRING_ID: string

export namespace LandingCollectionTemplate {
  export interface Props extends GlobalProps { }
}
