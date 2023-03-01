import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { SSResults, SSConsumer } from '@dotdev/reactive-searchspring'
import { Collection } from 'types'
import { XMasonry, XBlock } from 'react-xmasonry'
import throttle from 'lodash.throttle'

export class CollectionResults extends React.Component<CollectionResults.Props, CollectionResults.State> {
  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props: CollectionResults.Props) {
    super(props)

    this.state = {
      screenWidth: window.innerWidth,
      results: [],
      loading: false
    }
  }

  public componentDidMount = () => {
    window.addEventListener('resize', this.throttledHandleResize)
  }

  public componentDidUpdate = async (prevProps) => {
    if(this.props.results
        && typeof prevProps.results === 'undefined'
        && this.props.results.length > 0 ) {
      this.setState({
        loading: true
      })
      const results = await this.getSwatchdata(this.props.results)
      this.setState({
        results,
        loading: false
      })
    }

    if(this.props.results
        && prevProps.results
        && this.props.results.length > 0
        && prevProps.results.length > 0
        //@ts-ignore
        && this.props.results[0].handle !== prevProps.results[0].handle) {
      this.setState({
        loading: true
      })
      const results = await this.getSwatchdata(this.props.results)
      this.setState({
        results,
        loading: false
      })
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleResize)
  }

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await CollectionResults.kewl.productsBySwatchTags(tags)
    const newProducts = []
    products.forEach(product => {
      const underlinedHandle = product.handle.replace(/\-/g, '_')// eslint-disable-line no-useless-escape
      if (siblingsResults[underlinedHandle]) {
        const siblingsQuantity = siblingsResults[underlinedHandle].length
        const filteredSiblings = siblingsResults[underlinedHandle].filter(sibling => sibling.handle !== product.handle)
        newProducts.push({ ...product, siblingsQuantity: siblingsQuantity, filteredSiblings: filteredSiblings })
      }
    })
    return newProducts
  }

  private handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth
    })
  }

  private throttledHandleResize = throttle(this.handleResize, 500)

  public render(): JSX.Element {
    const { grid, collection, parentCollection, firstPageItems } = this.props
    const { screenWidth } = this.state
    if (this.props.results && !this.state.loading) {
      if (this.props.results.length > 0) {
        const doubleItemQuantity = this.props.results.reduce((acc, cur) => {
          //@ts-ignore
          return cur?.tags?.some(tag => tag.includes('double')) ? acc + 1 : acc
        }, 0)
        const cards = Helpers.check(collection, 'collection.metafields.dtk.fields.root.cards') ? collection.metafields.dtk.fields.root.cards : null
        let cardCount = 0
        const combinedResults = [...this.state.results]
        if (cards) {
          cards.forEach((card) => {
            if(card.position < firstPageItems) {
              combinedResults.splice((card.position - 1) + cardCount, 0, card)
            }
          })
          cardCount += 1
        }
        return (
          <React.Fragment>
            <div className={'border-t border-l border-grey-border mb-3-2'}>
              <XMasonry maxColumns={4} targetBlockWidth={screenWidth / 4}>
                {combinedResults.map((result: any, i: number) => {
                  return result.position ? (() => {
                    let width
                    if (screenWidth < 768) {
                      if (result.size === 'Small') {
                        if (grid === 'small') {
                          width = 2
                        } else {
                          width = 4
                        }
                      } else {
                        width = 4
                      }
                    } else {
                      if (result.size === 'Small') {
                        if (grid === 'small') {
                          width = 1
                        } else {
                          width = ((i + doubleItemQuantity + 1) % 6) == 0 || ((i + doubleItemQuantity + 2) % 6) == 0 ? 2 : 1
                        }
                      } else {
                        if (grid === 'small') {
                          width = 2
                        } else {
                          width = ((i + 1) % 6) == 0 || ((i + 2) % 6) == 0 ? 2 : 1
                        }
                      }
                    }

                    return (
                      <XBlock key={`card-${i}`} width={width}>
                        <a
                          href={result.link}
                          title={result.title}
                          className={`block bg-grey ${this.state.screenWidth > 768 && width === 2 ? 'ratio-product-2': 'ratio-product'} relative border-r border-b border-grey-border`}
                        >
                          <div className={'absolute inset-0'}>
                            <Snippets.Image
                              alt={result.title || 'Collection product image'}
                              src={result.image}
                              className={'absolute inset-0'}
                              preventLazy
                            />
                            <div className={'absolute inset-0 z-10 flex items-center justify-center p-10 text-center'}>
                              <Snippets.Heading tag={'h1'} className={'text-white'}>
                                {result.title}
                              </Snippets.Heading>
                            </div>
                          </div>
                        </a>
                      </XBlock>
                    )
                  })() : (() => {
                    let width
                    if (screenWidth < 768) {
                      if (grid === 'small') {
                        width = result?.tags?.includes('grid:double') ? 4 : 2
                      } else {
                        width = 4
                      }
                    } else {
                      if (grid === 'small') {
                        width = result?.tags?.includes('grid:double') ? 2 : 1
                      } else {
                        width = result?.tags?.includes('grid:double') ? 2 : ((i + doubleItemQuantity + 1) % 6) == 0 || ((i + doubleItemQuantity + 2) % 6) == 0 ? 2 : 1
                      }
                    }

                    return (
                      <XBlock key={`product-${i}`} width={width}>
                        <Snippets.SearchSpringProduct
                          {...this.props}
                          product={result}
                          position={i}
                          isCollectionItem
                          width={width}
                        />
                      </XBlock>
                    )
                  })()
                })}
              </XMasonry>
            </div>

            <SSConsumer>
              {
                ({ searchspring }) => {
                  // @ts-ignore
                  const { perPage, totalResults } = searchspring.current.pagination
                  return perPage < totalResults ?
                    parentCollection && parentCollection.template_suffix === 'landing' ? (
                      <div className={'w-full text-center clearfix'}><Snippets.Button
                        href={collection.url}
                        title={'View all'}
                        colour={'secondary'}
                        className={'uppercase tracking-wider'}
                      >
                        {`View ${collection.title}`}
                      </Snippets.Button></div>
                    ) : (
                      <div className={'w-full text-center md:pt-12 clearfix'}><Snippets.Button
                        onClick={() => {
                          searchspring.setPagination(
                            1,
                            perPage + this.props.limit
                          )
                        }}
                        title={'View all'}
                        colour={'secondary'}
                        className={'uppercase tracking-wider'}
                        refs={'next'}
                      >
                        {`View ${totalResults - perPage} more`}
                      </Snippets.Button></div>
                    ) :
                    null
                }
              }
            </SSConsumer>
          </React.Fragment>
        )
      } else {
        return (
          <div className={'flex flex-col items-center justify-center text-center px-0-4 pb-5 pt-3 w-full max-w-150 mx-auto'}>
            <Snippets.Heading size={'h2'} tag={'h2'}>
              {'No results'}
            </Snippets.Heading>
            <Snippets.Heading size={'h5'} tag={'p'} className={'mt-1-5'}>
              {'Try clearing filters or shopping in a different collection.'}
            </Snippets.Heading>
          </div>
        )
      }
    } else {
      let width
      if (this.state.screenWidth > 768) {
        width = this.props.grid === 'small' ? 'w-1/4' : 'w-1/2'
      } else {
        width = this.props.grid === 'small' ? 'w-1/2' : 'w-full'
      }
      return (
        <React.Fragment>
          <div className={'flex flex-wrap'}>
            {
              Array.apply(null, { length: 8 }).map(i => {
                return (
                  <div key={i} className={`${width} p-0-2`}>
                    <div className={'w-full content-placeholder ratio-3:4'}></div>
                  </div>
                )
              })
            }
            <SSConsumer>
              {({searchspring}) => {
                const { perPage } = searchspring.current.pagination
                return Array.apply(null, { length: perPage }).map(i => {
                  return (
                    <div key={i} className={`${width} p-0-2`}>
                      <div className={'w-full content-placeholder ratio-3:4'}></div>
                    </div>
                  )
                })}}
            </SSConsumer>
          </div>

        </React.Fragment>
      )
    }
  }
}

export namespace CollectionResults {
  export interface Props extends React.Component<SSResults.Component.Results.Props> {
    grid: string;
    limit: number;
    results: {}[];
    firstPageItems: number;
    collection: Collection;
    parentCollection: Collection;
  }
  export interface State {
    screenWidth: number;
    results: {}[],
    loading: boolean
  }
}
