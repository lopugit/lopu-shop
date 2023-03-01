import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class ProductRecommended extends React.PureComponent<ProductRecommended.Props, ProductRecommended.State> {
  private slider: any

  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  constructor(props) {
    super(props)
    this.slider = React.createRef()
    this.state = {
      recommendations: []
    }
  }

  public async componentDidUpdate(prevProps, prevState) {
    if(Helpers.check(this, 'this.context.state.recommendations')
      && this.context.state.recommendations.length !== prevState.recommendations.length){
      const recommendations = await this.getSwatchdata(this.context.state.recommendations)
      this.setState({
        recommendations
      })
    }
  }

  private getSwatchdata = async (products) => {
    const tags = []
    products.forEach(product => {
      tags.push(`colours:${[product.handle]}`)
    })
    const siblingsResults = await ProductRecommended.kewl.productsBySwatchTags(tags)
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
    let { recommendations } = this.state

    const sliderSettings = {
      centerPadding: '96px',
      arrows: false,
      infinite: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 5,
      centerMode: true,
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

    let results
    if (recommendations) {
      //@ts-ignore
      results = Helpers.check(this, 'this.props.data.section.product.settings.featuredcollection.products')
        && (recommendations.length < sliderSettings.slidesToShow)
        ? [...recommendations, ...this.props.data.section.product.settings.featuredcollection.products]
        : [...recommendations]
    } else {
      results = []
    }


    return (
      <section className={'mt-3-2'} aria-label="Recommend Products">
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
        {recommendations && recommendations.length ? (
          <div className={'sm:pl-2-4 lg:pl-2-8 xl:pl-12 2xl:pl-22 3xl:pl-32 4xl:pl-42 5xl:pl-25vw 6xl:pl-30vw'}>
            <Snippets.Slider refs={this.slider} settings={{ ...sliderSettings }} className={'theme-product-recommended'}>
              {results.map((product: any, i: number) => {
                product = {
                  ...product,
                  compare_at_price: product.compare_at_price_min,
                  price: product.price_min
                }
                return <Snippets.CollectionProduct
                  collection={Helpers.check(this, 'this.props.data.collection') ? this.props.data.collection : null}
                  key={product?.title} 
                  product={product}
                  list="Recommended products"
                  preventLazy
                />
              })}
            </Snippets.Slider>
            <div className={'mt-3-2 md:hidden flex flex-row'}>
              <button className={'outline-none opacity-30 hover:opacity-100 mr-2-2'} onClick={this.previous}>
                <span className={'block'}>
                  <Snippets.Icon name={'chevron_left'} width={18} label={"next slide"}/>
                </span>
              </button>
              <button className={'outline-none opacity-30 hover:opacity-100'} onClick={this.next}>
                <span className={'block'}>
                  <Snippets.Icon name={'chevron_right'} width={18} label={"previous slide"}/>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className={'sm:pl-2-4 lg:pl-2-8 xl:pl-12 2xl:pl-22 3xl:pl-32 4xl:pl-42 5xl:pl-25vw 6xl:pl-30vw flex items-center justify-between'}>
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
          </div>
        )}
      </div>
      </section>
    )
  }
}

export namespace ProductRecommended {
  export interface Props extends GlobalProps {
    title: string;
    className?: string;
  }
  export interface State {
    recommendations: any
  }
}
