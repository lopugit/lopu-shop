import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { trackProductClick } from 'helpers'

export class CollectionProduct extends React.PureComponent<CollectionProduct.Props, CollectionProduct.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: any) {
    super(props)

    this.state = {
      wishlistActive: false,
    }
  }

  public async componentDidMount() {
    if (
      ShopifyNext.Wishlist &&
      Helpers.check(this, 'this.props.product.id') &&
      Helpers.check(this, 'this.props.product.variants.length')
    ) {
      this.setState({
        wishlistActive: ShopifyNext.Wishlist.checkItem(this.props.product.id, this.props.product.variants[0].id)
      })
    }
  }

  public render(): JSX.Element {
    const { product, variant, layout, collection, list } = this.props
    if (typeof product === 'string') {
      return (
        <div className={'block border border-grey-border border-r-0'}>
          <div className={'relative border-transparent group'}>
            <div className={'relative'}>
              <Snippets.BlockImage
                alt={'placeholder loading image'}
                image={''}
                className={'content-placeholder'}
                ratio={'1:1'}
              />
            </div>
            <div className={'p-1'}>
              <p className={'min-h-4 content-placeholder text-black'} />
              <p className={'min-h-4 content-placeholder text-black w-2/3 mt-0-8'} />
              <p className={'content-placeholder min-h-5 w-1/2 mt-3-4'} />
            </div>
          </div>
        </div>
      )
    }

    const { wishlistActive } = this.state
    const image =
      product.images && product.images[0]
        ? product.images[0].src
          ? product.images[0].src
          : product.images[0]
        : null
    const hoverimage =
      product.images && product.images.length > 1 && product.images[1]
        ? product.images[1].src
          ? product.images[1].src
          : product.images[1]
        : null

    return (
      <div className={`relative group ${this.props.noBorder ? '' : 'border border-grey-border'} ${this.props.border ? '' : 'border-r-0'} ${layout === 'slider' ? 'mx-0-8 md:mx-1-5' : ''}`} id={this.props.id ? this.props.id : null}>
        <div className={'absolute top-0 right-0 text-black pr-0-8 pt-0-8 z-10'}>
          <Snippets.Button
            title={'Add to wishlist'}
            colour={'link'}
            onClick={(event: React.MouseEvent) => {
              this.toggleWishlist(event, product)
            }}
          >
            <Snippets.Icon
              name={wishlistActive ? 'heart_fill' : 'heart_unfilling'}
              width={40}
              className={'text-black'}
              ariaHidden
            />
          </Snippets.Button>
        </div>
        <a
          href={`${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`}
          onClick={() => trackProductClick(
            [{
              id: product.id,
              name: product.title,
            }],
            `${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`,
            list
          )}
          className={'block h-full border-transparent group'}
          draggable={false}
        >
          <div className={'relative'}>
            <Snippets.BlockImage
              alt={product.title || "collection product image"}
              image={image}
              hoverImage={hoverimage}
              ratio={'1:1'}
              preventLazy={this.props.preventLazy}
            />
            <div className={'absolute inset-0 p-0-8 flex flex-row'}>
              {(product.tags && !this.props.small) ? product.tags.map((tag: string) => {
                if (tag.includes('badge:')) {
                  const tagsWithCustomStyles = {
                    'Final Sale-grey': {
                      bgColor: 'bg-grey-badge-dark group-hover:bg-white',
                      textColor: 'text-white group-hover:text-black',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                    'Final Sale-red': {
                      bgColor: 'bg-red group-hover:bg-white',
                      textColor: 'text-white group-hover:text-red',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                  }
                  
                  const badgeKey = tag.split(':')[1];
                  const badgeText = badgeKey.includes('-') ? badgeKey.split('-')[0] : badgeKey;
                  const badgeBg = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].bgColor : 'group-hover:bg-white bg-grey'
                  const badgeCol = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].textColor : 'text-black'
                  return (
                    <div
                      key={tag}
                      className={' flex items-center h-3 mb-0-8 capitalize mr-0-8 ' + badgeBg}
                    >
                      {tagsWithCustomStyles[badgeKey] && tagsWithCustomStyles[badgeKey].isLink ? (
                        <a className={'inline-block text-xs font-bold leading-tight px-1-6 ' + badgeCol} href={tagsWithCustomStyles[badgeKey].link}>
                        {badgeText}
                        </a>
                      ):(
                      <span className={'inline-block text-xs font-bold leading-tight px-1-6 ' + badgeCol}>
                        {badgeText}
                      </span>

                      )}
                    </div>
                  )
                }
                return null
              }) : null}
            </div>
          </div>
          <div className={`block pt-1-4 ${this.props.small ? 'px-0-8 pb-2-4' : this.props.layout === 'slider' ? 'px-0-8 md:px-1-6 pb-0-9 md:pb-2-7' : 'px-1-6 pb-3-2'}`}>
            <div className={'flex flex-row justify-between'}>
              {product.title ? (
                <Snippets.Heading size={'h5'} tag={'h3'} className={'text-left'}>{product.title}</Snippets.Heading>
              ) : null}
              {(layout !== 'wishlist'
                && Helpers.check(this, 'this.props.product.siblingsQuantity')
                && product.siblingsQuantity > 1)
                ? <Snippets.Heading size={'h5'} tag={'p'} className={'lowercase opacity-50 whitespace-no-wrap'}>
                  {`${product.siblingsQuantity} colours`}
                </Snippets.Heading>
                : (layout !== 'wishlist'
                  && product.tags
                  && product.tags.filter(tag => tag.includes('colours:')).length > 1)
                  ? <Snippets.Heading size={'h5'} tag={'p'} className={'lowercase opacity-50 whitespace-no-wrap'}>
                    {`${product.tags.filter(tag => tag.includes('colours:')).length} colours`}
                  </Snippets.Heading>
                  : null}
            </div>
            <div className={'flex flex-row justify-between'}>
              {product.type === "Gift card" ? null : (
                <Snippets.ProductPrice
                  variant={product}
                  layout={null}
                  multiCurrencyTransform={this.props.multiCurrencyTransform}
                />
              )}
              {(layout === 'wishlist'
                && Helpers.check(this, 'this.props.product.siblingsQuantity')
                && product.siblingsQuantity > 1)
                ? <Snippets.Heading size={'h5'} tag={'p'} className={'lowercase opacity-50'}>
                  {`${product.siblingsQuantity} colours`}
                </Snippets.Heading>
                : (layout === 'wishlist'
                  && product.tags
                  && product.tags.filter(tag => tag.includes('colours:')).length > 1)
                  ? <Snippets.Heading size={'h5'} tag={'p'} className={'lowercase opacity-50'}>
                    {`${product.tags.filter(tag => tag.includes('colours:')).length} colours`}
                  </Snippets.Heading>
                  : null}
            </div>
          </div>
        </a>
      </div>
    )
  }

  private toggleWishlist = (event: React.MouseEvent, product: any): void => {
    event.preventDefault()
    event.stopPropagation()
    ShopifyNext.Wishlist && product.id && product.variants.length && product.variants[0].id
      ? (
        ShopifyNext.Wishlist.toggleItem(product.id, product.variants[0].id),
        this.setState((prevState) => ({
          wishlistActive: !prevState.wishlistActive
        }))
      )
      : null
  }
}

export namespace CollectionProduct {
  export interface Props {
    list: string;
    collection?: any;
    product: any;
    className?: string;
    variant?: any;
    layout?: 'wishlist' | 'slider';
    border?: boolean;
    small?: boolean;
    preventLazy?: boolean;
    id?: string;
    multiCurrencyTransform?: boolean
    noBorder?: boolean
  }
  export interface State {
    wishlistActive: boolean;
  }
}
