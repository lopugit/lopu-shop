import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { SSResults, SSConsumer } from '@dotdev/reactive-searchspring'

export class SearchResults extends React.Component<SearchResults.Props, SearchResults.State> {
  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props: SearchResults.Props) {
    super(props)

    this.state = {
      results: [],
      loading: false
    }
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

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await SearchResults.kewl.productsBySwatchTags(tags)
    const newProducts = []
    products.forEach(product => {
      const underlinedHandle = product.handle.replace(/\-/g, '_')// eslint-disable-line no-useless-escape
      const siblingsQuantity = siblingsResults[underlinedHandle].length
      const filteredSiblings = siblingsResults[underlinedHandle].filter(sibling => sibling.handle !== product.handle)
      newProducts.push({ ...product, siblingsQuantity: siblingsQuantity, filteredSiblings: filteredSiblings })
    })
    return newProducts
  }


  public render(): JSX.Element {
    const { grid, settings } = this.props
    const sliderSettings = {
      centerPadding: '0',
      arrows: false,
      infinite: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: Number(settings.slidestoshow),
      centerMode: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: '84px',
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
          }
        }
      ]
    }
    if (this.props.results && !this.state.loading) {
      if (this.props.results.length > 0) {
        return (
          <React.Fragment>
            <div className={'border-t border-grey-border flex flex-wrap mb-3-2'}>
              {this.state.results.map((result: any, i: number) => {
                return (
                  <div key={`product-${i}`} className={`${grid === 'small' ? 'w-1/2 md:w-1/4' : ((i+1) % 6 === 0 || (i+2) % 6 === 0) ? 'w-full md:w-1/2' : 'w-full md:w-1/4'}`}>
                    <Snippets.SearchSpringProduct
                      {...this.props}
                      product={result}
                      position={i}
                    />
                  </div>
                )
              })}
            </div>
            
            <SSConsumer>
              {
                ({ searchspring }) => {
                  // @ts-ignore
                  const { perPage, totalResults } = searchspring.current.pagination
                  return totalResults > perPage ? <div className={'w-full text-center md:pt-12 clearfix'}><Snippets.Button
                    onClick={() => {
                      searchspring.setPagination(
                        1,
                        perPage + this.props.limit
                      )
                    }}
                    title={'View all'}
                    colour={'secondary'}
                    className={'uppercase'}
                    refs={'next'}
                  >
                    {`View ${totalResults - perPage} more`}
                  </Snippets.Button></div> : null
                }
              }
            </SSConsumer>
          </React.Fragment>
        )
      } else {
        return (
          <div className={'flex flex-col items-center justify-center text-center px-0-4 pb-6-4 pt-6-3 w-full max-w-7xl mx-auto'}>
            <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-3-2'}>
              {'Nothing matches your search'}
            </Snippets.Heading>
            <Snippets.Heading size={'p'} tag={'h2'} className={'mb-8'}>
              {'But don\'t give up – check the spelling or try less specific search terms.'}
            </Snippets.Heading>
            {Helpers.check(settings, 'settings.collection.products')
              && settings.collection.products.length > settings.slidestoshow
              && <div className={'w-full flex flex-col items-center'}>
                <Snippets.Heading size={'h3'} tag={'p'} className={'tracking-wider mb-2-4 md:mb-4'}>{settings.title}</Snippets.Heading>
                <div className={'w-full pl-0-8 md:pl-0'}>
                  <Snippets.Slider settings={{ ...sliderSettings }} className={'cart-slider'}>
                    {settings.collection.products.slice(0, 8).map((product: any, i: number) => {
                      return <Snippets.CollectionProduct
                        key={i}
                        product={product}
                        layout={'slider'}
                        border
                        list="Search results"
                      />
                    })}
                  </Snippets.Slider>
                </div>
              </div>}
          </div>
        )
      }
    } else {
      return (
        <React.Fragment>
          <div className={'flex flex-wrap'}>
            {Array.apply(null, { length: 8 }).map(i => {
              return (
                <div key={i} className={`${grid === 'small' ? 'w-1/2 md:w-1/4' : 'w-full md:w-1/2'} p-0-2`}>
                  <div className={'w-full content-placeholder ratio-3:4'}></div>
                </div>
              )
            })}
            <SSConsumer>
              {({searchspring}) => {
                const { perPage } = searchspring.current.pagination
                return Array.apply(null, { length: perPage }).map(i => {
                  return (
                    <div key={i} className={`${grid === 'small' ? 'w-1/2 md:w-1/4' : 'w-full md:w-1/2'} p-0-2`}>
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

export namespace SearchResults {
  export interface State {
    results: {}[];
    loading: boolean;
  }
  export interface Props extends React.Component<SSResults.Component.Results.Props> {
    grid: string;
    limit: number
    results: {}[];
    settings: {
      collection: any;
      title: string;
      slidestoshow: string
    }
  }
}
