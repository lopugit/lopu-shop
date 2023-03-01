import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { Collection, Product } from 'types'
import { Animate } from 'react-show'
import debounce from 'lodash.debounce'

export class SearchSpringProduct extends React.PureComponent<SearchSpringProduct.Props, SearchSpringProduct.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: SearchSpringProduct.Props) {
    super(props)

    this.state = {
      wishlistActive: false,
      hover: false,
      buttonHover: false
    }
  }

  public componentDidMount(): void {
    if (
      ShopifyNext.Wishlist &&
      Helpers.check(this, 'this.props.product.uid') &&
      Helpers.check(this, 'this.props.product.variant_id.length')
    ) {
      this.setState({
        wishlistActive: ShopifyNext.Wishlist.checkItem(this.props.product.uid, this.props.product.variant_id[0])
      })
    }
  }

  private getVariants = () => {
    return JSON.parse(decodeURIComponent(this.props.product.variants).replace(/&quot;/g, '"'))
  }

  private handleHover = (state: boolean) => {
    this.setState({
      hover: state
    })
  }

  private handleButtonHover = (state: boolean) => {
    this.setState({
      buttonHover: state
    })
  }

  private debouncedHandleHover = debounce(this.handleHover, 300)
  private debouncedHandleButtonHover = debounce(this.handleButtonHover, 300)

  private handleAddToCart = async (variant) => {
    const variantId = variant.id
    const { limitedCartItems } = this.context.state
    const hasReachedMaximumQty = limitedCartItems[`${variantId}`] && Helpers.getMaxSelectableQuantity(variant) <= limitedCartItems[`${variantId}`]

    // early exit if reached maximum quantity
    if (hasReachedMaximumQty) {
      this.context.update({
        cartActive: true,
        message: 'CART_ITEM_REACHED_MAX_QTY',
        showMessage: true
      })
    } else {
      await ShopifyNext.Cart.addItem(parseInt(variantId, 10), 1)
      this.context.update({
        cartActive: true,
        showMessage: true
      })
    }

    setTimeout(() => {
      this.context.update({
        showMessage: false
      })
    }, 3000)
  }

  public buildWishlist(product) {
    const { wishlistActive } = this.state
    const variants = JSON.parse(product?.variants?.replace(/&quot;/g, '"'))
    return (
      <Snippets.Button
        className={'block'}
        title={'Add to wishlist'}
        colour={'link'}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          ShopifyNext.Wishlist && product.uid && variants && variants.length
            ? (
              ShopifyNext.Wishlist.toggleItem(product.uid, variants[0]?.id),
              this.setState((prevState) => ({
                wishlistActive: !prevState.wishlistActive
              }))
            )
            : null
        }}
      >
        <Snippets.Icon
          name={wishlistActive ? 'heart_fill' : 'heart_unfilling'}
          width={40}
          className={'text-black'}
        />
      </Snippets.Button>
    )
  }

  private buildItem({ collection, product, colours, currentColorName, currentColor, altText }) {
    const double = product?.tags?.includes('grid:double')
    const variants = this.getVariants()
    return (
      <div
        className={`${window.innerWidth <= 768 && double || (window.innerWidth <= 768 && this.props.grid !== 'small') ? 'ratio-double-product' : (this.props.width === 2 && window.innerWidth > 768) ? 'ratio-product-2' : 'ratio-product'} block relative border-r border-b border-grey-border group`}
        onMouseEnter={() => this.debouncedHandleHover(true)}
        onMouseLeave={() => this.debouncedHandleHover(false)}
      >
        <div className={'absolute inset-0 flex flex-col'}>
          <div className={'absolute top-0 right-0 pr-0-8 pt-0-8 z-10'}>
            {this.buildWishlist(product)}
          </div>
          <a
            href={`${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`}
            className={'relative'}
          >
            <Snippets.BlockImage
              alt={altText || 'collection product image'}
              image={product.images ? product.images[0] : null}
              hoverImage={product.images && product.images[1] ? product.images[1] : null}
              href={product.url}
              className={''}
              ratio={'1:1'}
              preventLazy
            />
            <div className={'absolute inset-0 p-0-8'}>
              {product.tags ? product.tags.map((tag: string) => {
                if (tag.includes('badge:')) {
                  const tagsWithCustomStyles = {
                    'Final Sale-grey': {
                      bgColor: 'bg-grey-badge-dark',
                      textColor: 'text-white',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                    'Final Sale-red': {
                      bgColor: 'bg-red',
                      textColor: 'text-white',
                      isLink: true,
                      link: '/pages/terms-of-use#promotions'
                    },
                  }
                  const badgeKey = tag.split(':')[1]
                  const badgeText = badgeKey.includes('-') ? badgeKey.split('-')[0] : badgeKey
                  const badgeBg = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].bgColor : 'bg-grey'
                  const badgeCol = tagsWithCustomStyles[badgeKey] ? tagsWithCustomStyles[badgeKey].textColor : 'text-black'
                  return (
                    <div
                      key={tag}
                      className={'inline-block font-regular mb-0-8 px-2-4 py-0-1 mr-0-8 ' + badgeBg}
                    >
                      {tagsWithCustomStyles[badgeKey] && tagsWithCustomStyles[badgeKey].isLink ? (
                        <a className={'inline-block  text-xs pb-0-4 ' + badgeCol} href={tagsWithCustomStyles[badgeKey].link}>
                          {badgeText}
                        </a>
                      ) : (
                        <span className={'inline-block  text-xs pb-0-4 ' + badgeCol}>
                          {badgeText}
                        </span>

                      )}
                    </div>
                  )
                }
                return null
              }) : null}
            </div>
          </a>
          <div className={'flex flex-col justify-center md:justify-start w-full h-full relative'}>
            <a
              href={`${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`}
              className={`flex justify-between w-full pt-0-8 md:mt-1-6 ${double || this.props.grid !== 'small' ? 'px-1-6' : 'px-0-8 md:px-1-6'}`}
            >
              <div className={'flex flex-col'}>
                {product.title ? (
                  <Snippets.Heading size={'h5'} tag={'p'} className={'mb-0-4'}>
                    {product.title}
                  </Snippets.Heading>
                ) : null}
                {product.price ? (
                  <Snippets.Heading size={'h5'} tag={'div'}>
                    <Snippets.ProductPrice variant={{ price: product.price, compare_at_price: product?.variant_compare_at_price }} multiCurrencyTransform />
                  </Snippets.Heading>
                ) : null}
              </div>
              {colours.length > 0 && currentColor ? (
                <div className={'text-right'}>
                  <span className={'md:hidden block text-black opacity-50 text-xs'}>
                    <span className={'whitespace-no-wrap'}>
                      {`${colours.length + 1} colours`}
                    </span>
                  </span>
                  <span className={'hidden md:block text-black opacity-50 text-xs'}>
                    <span className={'block group-hover:hidden whitespace-no-wrap'}>
                      {`${colours.length + 1} colours`}
                    </span>
                    {currentColorName && <span className={'hidden group-hover:block whitespace-no-wrap'}>
                      {`${currentColorName.split('colour:')[1]}`}
                    </span>}
                  </span>
                </div>
              ) : null}
            </a>
            <div className={'hidden md:block w-full relative'}>
              <Animate
                show={this.state.hover}
                transitionOnMount
                stayMounted
                style={{
                  height: 'auto',
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  boxShadow: '0 16px 16px 0 rgba(0, 0, 0, 0.15)',
                  zIndex: 20,
                  position: 'absolute'
                }}
                start={{
                  height: 0,
                  display: 'hidden'
                }}
              >
                <div className={'w-full -mt-0-1 -mx-0-1 bg-white pt-1-9 pb-1-6 px-1-6 z-20'}>
                  {colours.length && currentColor ? (
                    <Snippets.ProductSwatches
                      className={'mb-1-6 flex flex-wrap'}
                      product={product}
                      collection={collection ? collection : null}
                    />
                  ) : null}
                  <div
                    onMouseEnter={() => this.debouncedHandleButtonHover(true)}
                    onMouseLeave={() => this.debouncedHandleButtonHover(false)}
                  >
                    {!this.state.buttonHover
                      ? <Snippets.Button
                        title={'Add To Bag'}
                        className={'w-full uppercase pl-1-6 pr-0-8 py-0-8 flex items-center z-20 bg-black text-white'}
                        colour={'blank'}
                      >
                        <Snippets.Heading size={'h5'} tag={'p'} className={'flex-1 text-left select-none'}>{'Add To Bag'}</Snippets.Heading>
                        <Snippets.Icon name={'bag'} width={40} />
                      </Snippets.Button>
                      : variants.length > 1
                        ? <div className={'py-0-8 w-full bg-white flex justify-center items-center'}>
                          {variants.map((variant, i) => {
                            const {
                              id: variantId,
                              option2: size,
                            } = variant
                            return <Snippets.Button
                              key={i}
                              title={'Add To Bag'}
                              colour={'blank'}
                              className={'w-3-8 h-3-8 transition flex items-center justify-center text-black bg-white hover:text-white hover:bg-black border border-grey-border hover:border-black'}
                              onClick={() => this.handleAddToCart(variant)}
                            >
                              <Snippets.Heading size={'h5'} tag={'p'}>{size}</Snippets.Heading>
                            </Snippets.Button>
                          })}
                        </div>
                        : <Snippets.Button
                          title={'Add To Bag'}
                          className={'w-full uppercase pl-1-6 pr-1-9 h-5-6 flex items-center z-20 bg-black text-white'}
                          colour={'blank'}
                          onClick={() => this.handleAddToCart(variants[0])}
                        >
                          <Snippets.Heading size={'h5'} tag={'p'} className={'flex-1 text-left select-none'}>{'Add To Bag'}</Snippets.Heading>
                          <Snippets.Icon name={'chevron_right'} width={18} height={8} />
                        </Snippets.Button>
                    }
                  </div>
                </div>
              </Animate>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private filterTagsBySiblingsHandle = (tags: string[], filteredSiblings: { handle: string }[]): string[] => {
    const result = []
    tags?.forEach(tag => {
      filteredSiblings.some(sibling => tag.includes(sibling.handle))
        ? result.push(tag)
        : null
    })
    return result
  }

  public render(): JSX.Element {
    const { product, collection, isCollectionItem } = this.props

    const filteredColoursTags = product?.tags?.filter((tag: string) => tag.includes('colours:') && !tag.includes(product.handle))

    const colours = Helpers.check(product, 'product.filteredSiblings')
      ? this.filterTagsBySiblingsHandle(filteredColoursTags, product.filteredSiblings)
      : filteredColoursTags

    const currentColor = product?.tags?.filter((tag: string) => tag.includes('colours:') && tag.includes(product.handle))[0]
    const currentColorName = product?.tags?.filter((tag: string) => tag.includes('colour:'))[0]
    const double = product?.tags?.includes('grid:double')
    const bodyHTML = this.htmlDecode(product.body_html)
    const altText = Helpers.getAltText(product.tags, product.title)
    return double && isCollectionItem ? (
      <React.Fragment>
        <a
          className={'md:block hidden'}
          href={`${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`}
        >
          <div className={'flex ratio-double-product relative border-r border-b border-grey-border group'}>
            <div className={'w-full md:w-1/2'}>
              <Snippets.BlockImage
                alt={altText || 'collection product image'}
                image={product.images ? product.images[0] : null}
                hoverImage={product.images && product.images[1] ? product.images[1] : null}
                href={product.url}
                className={'absolute inset-0 h-full'}
                innerClass={'h-full'}
                preventLazy
              />
            </div>
            <div className={'w-full md:w-1/2 flex items-center pt-1-6 pl-1-6 pr-8-3 relative'}>
              <div className={'absolute top-0 right-0 pr-0-8 pt-0-8 z-10'}>
                {this.buildWishlist(product)}
              </div>
              <div>
                <Snippets.Heading
                  tag={'h2'}
                  className={'mb-0-3'}
                >
                  {product.title}
                </Snippets.Heading>
                {product.price ? (
                  <Snippets.Heading tag={'h5'} className={'mb-1-6'}>
                    <Snippets.Money price={product.price * 100} multiCurrencyTransform />
                  </Snippets.Heading>
                ) : null}
                {bodyHTML ? (
                  <Snippets.RichText firstLine size={6} className={'mb-1-6'}>
                    {bodyHTML}
                  </Snippets.RichText>

                ) : null}
                <Snippets.Heading tag={'h5'}>
                  See product
                </Snippets.Heading>
              </div>
            </div>
          </div>
        </a>
        <div className={'block md:hidden'}>
          {this.buildItem({
            collection,
            product,
            currentColor,
            currentColorName,
            colours,
            altText
          })}
        </div>
      </React.Fragment>
    ) : this.buildItem({
      collection,
      product,
      currentColor,
      currentColorName,
      colours,
      altText
    })
  }

  private htmlDecode = (input) => {
    const e = document.createElement('textarea')
    e.innerHTML = input
    // handle case of empty input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }
}

export namespace SearchSpringProduct {
  export interface Props {
    product: any;
    className?: string;
    ratio?: string;
    reduced?: boolean;
    simple?: boolean;
    variant?: any;
    hideWishlist?: any;
    collection?: Collection;
    grid?: string;
    position?: number;
    isCollectionItem?: boolean;
    width?: number
  }
  export interface State {
    wishlistActive: boolean | number;
    hover: boolean;
    buttonHover: boolean;
  }
}
