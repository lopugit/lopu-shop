import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class SearchGlobalResultsListingItem extends React.Component<SearchGlobalResultsListingItem.Props, SearchGlobalResultsListingItem.State> {
  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props) {
    super(props)
    this.state = {
      results: [],
      loading: true
    }
  }

  public componentDidMount = async () => {
    const results = await this.getSwatchdata(this.props.results)
    this.setState({
      results,
      loading: false
    })
  }

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await SearchGlobalResultsListingItem.kewl.productsBySwatchTags(tags)
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
    const { results, loading } = this.state
    return (
      <div className={'flex flex-wrap'}>
        {loading ? [1, 2, 3, 4, 5].map((i) => (
          <div className={'w-1/2 md:w-1/5 px-1 py-0-8'} key={i}>
            <div className={'w-full flex flex-wrap transition-fast border-grey-border border  px-1 py-0-8'}>
              <div className={'w-full mb-0-8 content-placeholder relative ratio-3:4'}>
              </div>

              <div
                className={'flex flex-col flex-no-wrap flex-1 justify-between items-start w-full text-sm tracking-wide font-normal'}
              >
                <div className={'content-placeholder small py-0-6 mb-1-5'} />
                <div className={'content-placeholder xsmall py-0-6'} />
              </div>
            </div>
          </div>
        )) : results.map((result, index) => {
          return (
            <div key={index} className={'w-1/2 md:w-1/5 px-1 pb-2'}>
              <a className={'w-full flex flex-wrap transition-fast border-grey-border border'} href={`/products/${result.handle}`} title={result.name}>
                <div className={'w-full'}>
                  <div className={`relative ${result.ss_image_medium ? ' md:border md:border-secondary md:p-0-2' : ''}`}>
                    <Snippets.Image
                      alt={result.name || "search result image"}
                      className={'w-full block'}
                      ratio={'1:1'}
                      src={result.imageUrl}
                    />
                  </div>
                </div>
                <div className={'w-full p-0-8'}>
                  <div className={'w-full pb-0-4'}>
                    <Snippets.Heading size={'h5'} tag={'h3'} className={'text-left'}>{result.name}</Snippets.Heading>
                  </div>
                  <div className={'w-full flex flex-row justify-between'}>
                    {result.price && result.product_type !== "Gift card" ? (
                      <Snippets.Heading size={'h5'} tag={'p'}>
                        <Snippets.ProductPrice variant={{ price: result.price, compare_at_price: result?.variant_compare_at_price }} multiCurrencyTransform />
                      </Snippets.Heading>
                    ) : null}
                    {result.siblingsQuantity > 1 ? <Snippets.Heading size={'none'} tag={'p'} className={'text-xs font-light leading-tight lowercase opacity-50 whitespace-no-wrap'}>{`${result.siblingsQuantity} colours`}</Snippets.Heading> : null}
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    )
  }
}

export namespace SearchGlobalResultsListingItem {
  export interface Props {
    results: any;
  }
  export interface State {
    results: any;
    loading: boolean
  }
}
