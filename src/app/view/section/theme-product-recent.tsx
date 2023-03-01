import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class ProductRecent extends React.PureComponent<ProductRecent.Props, ProductRecent.State> {
  private static recentlyViewedKey = 'theme:recently-viewed:product-handles';
  public static contextType = ShopifyNext.Context;
  private slider: any
  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props: ProductRecent.Props) {
    super(props)
    this.state = {
      fetched: false,
      products: []
    }
    this.slider = React.createRef()
  }

  private recent: any = ShopifyNext.Utils.getLocalStorage(ProductRecent.recentlyViewedKey)
    ? ShopifyNext.Utils.getLocalStorage(ProductRecent.recentlyViewedKey).split(',')
    : []

  public componentDidMount = async () => {
    if (this.recent.length) {

      const recentSliced = this.recent.slice(this.recent.length-6, this.recent.length).reverse()

      const products = await ProductRecent.kewl.productsByHandles(recentSliced, ['handle', 'price', 'tags', 'title', 'id', 'variants', 'images'])

      const filteredProducts = products.filter(value => Object.keys(value).length !== 0)

      const newProducts = await this.getSwatchdata(filteredProducts)

      this.setState({
        fetched: true,
        products: newProducts
      })
    } else {
      this.setState({
        fetched: true
      })
    }
  };

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await ProductRecent.kewl.productsBySwatchTags(tags)
    const newProducts = []
    products.forEach(product => {
      const underlinedHandle = product.handle.replace(/\-/g, '_')// eslint-disable-line no-useless-escape
      const siblingsQuantity = siblingsResults[underlinedHandle].length
      const filteredSiblings = siblingsResults[underlinedHandle].filter(sibling => sibling.handle !== product.handle)
      newProducts.push({ ...product, siblingsQuantity: siblingsQuantity, filteredSiblings: filteredSiblings })
    })
    return newProducts
  }

  public next = () => {
    this.slider.current.slickNext()
  }
  public previous = () => {
    this.slider.current.slickPrev()
  }

  public render(): JSX.Element {
    const { products } = this.state

    const recentSliderSettings = {
      centerPadding: '96px',
      arrows: false,
      infinite: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 5,
      centerMode: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: '40px',
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            centerPadding: '40px',
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            centerPadding: '40px',
          }
        },
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 4,
            centerPadding: '40px',
          }
        }
      ]
    }

    return (
      this.recent.length ? 
        <section aria-label="Recently viewed Products">
          <div className={`mb-6-4 pl-1-6 md:pl-0 ${this.props.className ? this.props.className : ''}`}>
            <div className={'max-w-7xl px-1-6 xl:px-0 mx-auto flex justify-center md:justify-between mb-3-2'}>
              <Snippets.Heading size={'h1'} tag={'h2'} className={'leading-none'}>
                {this.props.title}
              </Snippets.Heading>
              <div className={'hidden md:flex flex-row'}>
                <button className={'outline-none opacity-30 hover:opacity-100 mr-2-2'} onClick={this.previous}>
                  <span className={'block'}>
                    <Snippets.Icon name={'chevron_left'} width={18} />
                  </span>
                </button>
                <button className={'outline-none opacity-30 hover:opacity-100'} onClick={this.next}>
                  <span className={'block'}>
                    <Snippets.Icon name={'chevron_right'} width={18} />
                  </span>
                </button>
              </div>
            </div>
            {this.state.fetched ?
              <div className={'sm:pl-2-4 lg:pl-2-8 xl:pl-12 2xl:pl-22 3xl:pl-32 4xl:pl-42 5xl:pl-25vw 6xl:pl-30vw'}>
                {
                  products.length <= 3 && window.innerWidth > 1024 || products.length ===  1 ? <div className={'flex flex-row'}>
                    {products.map((product: any, i: number) => {
                      product = {
                        ...product,
                        price: product.price_min,
                      }
                      const width = document.querySelector('#slider-product') ? document.querySelector('#slider-product').clientWidth : window.innerWidth / 4
                      return <div key={i} style={{ width }}>
                        <Snippets.CollectionProduct
                          collection={Helpers.check(this, 'this.props.data.collection') ? this.props.data.collection : null}
                          product={product} 
                          border={i == products.length - 1}
                          list="Recent products"
                          multiCurrencyTransform
                        />
                      </div>
                    })}
                  </div> : <Snippets.Slider refs={this.slider} settings={{ ...recentSliderSettings }} className={'theme-product-recent'}>
                    {products.map((product: any, i: number) => {
                      product = {
                        ...product,
                        compare_at_price: product.compare_at_price_min,
                        price: product.price_min,
                      }
                      return <Snippets.CollectionProduct
                        collection={Helpers.check(this, 'this.props.data.collection') ? this.props.data.collection : null}
                        key={i}
                        product={product}
                        list="Recent products"
                        multiCurrencyTransform
                      />
                    })}
                  </Snippets.Slider>
                }

                <div className={'mt-3-2 md:hidden flex flex-row'}>
                  <button className={'outline-none opacity-30 hover:opacity-100 mr-2-2'} onClick={this.previous}>
                    <span className={'block'}>
                      <Snippets.Icon name={'chevron_left'} width={18} />
                    </span>
                  </button>
                  <button className={'outline-none opacity-30 hover:opacity-100'} onClick={this.next}>
                    <span className={'block'}>
                      <Snippets.Icon name={'chevron_right'} width={18} />
                    </span>
                  </button>
                </div>
              </div> : <div className={'sm:pl-2-4 lg:pl-2-8 xl:pl-12 2xl:pl-22 3xl:pl-32 4xl:pl-42 5xl:pl-25vw 6xl:pl-30vw flex items-center justify-between'}>
                <div className={'block w-full md:w-1/4 md:px-0-8'}>
                  <div className={'ratio-5:6 content-placeholder mb-1'} />
                  <p className={'content-placeholder w-3/4 py-1 mb-1'} />
                  <p className={'content-placeholder w-1/4 py-0-5'} />
                </div>
                <div className={'block w-full md:w-1/4 md:px-0-8'}>
                  <div className={'ratio-5:6 content-placeholder mb-1'} />
                  <p className={'content-placeholder w-3/4 py-1 mb-1'} />
                  <p className={'content-placeholder w-1/4 py-0-5'} />
                </div>
                <div className={'block w-full md:w-1/4 md:px-0-8'}>
                  <div className={'ratio-5:6 content-placeholder mb-1'} />
                  <p className={'content-placeholder w-3/4 py-1 mb-1'} />
                  <p className={'content-placeholder w-1/4 py-0-5'} />
                </div>
                <div className={'block w-full md:w-1/4 md:px-0-8'}>
                  <div className={'ratio-5:6 content-placeholder mb-1'} />
                  <p className={'content-placeholder w-3/4 py-1 mb-1'} />
                  <p className={'content-placeholder w-1/4 py-0-5'} />
                </div>
              </div>}
          </div>
        </section> : null
    )
  }
}

export namespace ProductRecent {
  export interface Props extends GlobalProps {
    title: string;
    className?: string;
  }
  export interface State {
    fetched: boolean;
    products: any;
  }
}
