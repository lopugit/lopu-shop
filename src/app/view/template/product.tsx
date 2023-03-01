/* eslint-disable no-console */
import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { CustomSize, GlobalProps, GlobalState, Variant } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import * as Sections from 'sections'
import Sticky from 'react-stickynode'
import throttle from 'lodash.throttle'
import './product.css'

export class ProductTemplate extends React.Component<ProductTemplate.Props, ProductTemplate.State> {
  private shippingMap: {}
  private static recentlyViewedKey = 'theme:recently-viewed:product-handles';

  public static contextType = ShopifyNext.Context;

  private static kewl = new Helpers.ShopifyKewl({
    //@ts-ignore
    store: STOREFRONT_NAME,
    //@ts-ignore
    storeFrontKey: STOREFRONT_PASSWORD
  })

  public constructor(props: ProductTemplate.Props) {
    super(props)

    const { product } = this.props.data
    product.colourName = product.options_with_values[0].values[0]
    const variantId: number = parseInt(new URLSearchParams(this.props.history.location.search.split('?')[1]).get('variant'), 10)

    const selectedOptions = this.findOptions(variantId ? variantId : product.selected_or_first_available_variant, product.variants)

    const variant: Variant = variantId
      ? this.findVariant(selectedOptions, product.variants)
      : this.getVariant(product.selected_or_first_available_variant, product.variants)

    const onSaleOptions = product.variants.filter((v: Variant) => v.compare_at_price > v.price).map((v: Variant) => v.title)

    const ribbons = product.tags.filter((tag) => tag.includes('x_tag-list-entry:ribbon:')).map((tag) => tag.replace('x_tag-list-entry:ribbon:', ''))
    const brims = product.tags.filter((tag) => tag.includes('x_tag-list-entry:brims:')).map((tag) => tag.replace('x_tag-list-entry:brims:', ''))
    const sizeGuidePopupType = product?.collections?.find(c => this.props.data.section['size-guide-popup']?.settings?.outwear_collection?.handle === c?.handle)
      ? 'outwear' : product?.collections?.find(c => this.props.data.section['size-guide-popup']?.settings?.footwear_collection?.handle === c?.handle)
        ? 'footwear' : null

    this.state = {
      prevScroll: 0,
      currentDirection: 'up',
      variant: variant,
      selected: variant,
      options: product.options,
      quantity: 1,
      showMore: false,
      notifyPopup: false,
      selected_options: selectedOptions,
      enabled_options: product.variants.filter((v: Variant) => v.available === true).map((v: Variant) => v.title),
      onSaleOptions: onSaleOptions,
      inWishlist: ShopifyNext.Wishlist.checkItem(product.id, product.variants[0].id),
      sticky: false,
      siblingsQuantity: 0,
      filteredSiblings: [],
      ribbons,
      brims,
      selectedRibbon: ribbons[0],
      giftCardPopup: false,
      giftCardBalancePopup: false,
      sender: '',
      recipient: '',
      recipientEmail: '',
      message: '',
      selectedBrim: brims.find((tag) => tag.includes(product.handle)),
      selectedSize: ribbons[0] ? 'S' : null,
      selectableQuantity: Helpers.getMaxSelectableQuantity(variant),
      sizeGuidePopupType,
      sizeGuidePopupVisible: false
    }
  }

  public componentDidMount = async () => {
    const { product, section } = this.props.data
    this.setRecentViewProducts()

    section.product.settings.stickyaddtocart ? window.addEventListener('scroll', this.throttledHandleScroll) : null

    const siblings = await ProductTemplate.kewl.productsBySwatchTag(`colours:${product.handle}`)
    this.setState({
      siblingsQuantity: siblings.length,
      filteredSiblings: siblings.filter(sibling => sibling.handle !== product.handle)
    })
    await ShopifyNext.Cart.getProductRecommendations(this.props.data.product.id, 6)

    if(product.product_type === 'Rise ai gift card') {
      this.handleChange(product.options_with_values[0], 0)
    }
  }

  public componentDidUpdate(): void {
    const { limitedCartItems } = this.context.state
    const { variant } = this.state
    const maxSelectableQuantity = Helpers.getMaxSelectableQuantity(variant)
    let newSelectableQty = maxSelectableQuantity
    if (variant && limitedCartItems && limitedCartItems[`${variant.id}`]) {
      newSelectableQty = maxSelectableQuantity - limitedCartItems[`${variant.id}`]
    }

    if (newSelectableQty !== this.state.selectableQuantity) {
      this.setState({
        selectableQuantity: newSelectableQty
      })
    }
  }

  public componentWillUnmount(): void {
    const { section } = this.props.data
    section.product.settings.stickyaddtocart ? window.removeEventListener('scroll', this.throttledHandleScroll) : null
  }

  private handleClick(): void {
    this.state.showMore
      ? this.setState({
        showMore: false
      })
      : this.setState({
        showMore: true
      })
  }

  public render(): JSX.Element {
    const { variant, inWishlist, quantity, ribbons, selectedRibbon, brims, selectedBrim, selectedSize, selectableQuantity } = this.state
    const { headerOffsetHeight } = this.context.state
    const { settings, product, section, form } = this.props.data
    const altText = Helpers.getAltText(product.tags, product.title)
    const isRiseGiftCard = product.product_type === 'Rise ai gift card'
    const isShopifyGiftCard = product.product_type.toLowerCase() === 'gift card'
    const maxSelectableQuantity = Helpers.getMaxSelectableQuantity(variant)

    const madeToOrder = Boolean(selectedBrim || selectedRibbon)

    const changeRiseSettings = () => {
      //@ts-ignore
      // eslint-disable-next-line no-console
      //@ts-ignore
      if(window.Rise?.settings.shopify_variant_id_on_window_flow === false) {
        //@ts-ignore
        window.Rise.settings.shopify_variant_id_on_window_flow = true
        //@ts-ignore
        window.Rise.settings.white_label = true
        //@ts-ignore
        const gallery = JSON.parse(window.Rise.settings.popup_gallery_selected_images)
        if(gallery.length > 1) {
          gallery.shift()
          //@ts-ignore
          window.Rise.settings.popup_gallery_main_image = gallery[0]
          //@ts-ignore
          window.Rise.settings.popup_gallery_selected_images = JSON.stringify(gallery)
        }
        return
      }

      //@ts-ignore
      if(!window.Rise?.settings.shopify_variant_id_on_window_flow) {
        setTimeout(changeRiseSettings, 1000)
      }
    }

    changeRiseSettings()

    return (
      <Layouts.Theme {...this.props}>
        <main itemID={`#${product.id}`} itemScope itemType="http://schema.org/Product">
          <section className={'max-w-container mx-auto px-3-2 py-2-5 lg:block hidden'}>
            <div className={'flex'}>
              <div className={'md:w-1/2'}>
                <Snippets.Breadcrumbs {...this.props} />
              </div>
              <div className={'hidden'}>
                <span>{`SKU: ${this.state.variant.sku}`}</span>
              </div>
            </div>
          </section>

          <section className={'mx-auto max-w-container w-full pb-8'}>
            <div className={'block lg:flex relative'}>
              <div className={'absolute top-0 inset-x-0 flex lg:hidden flex-row justify-between px-1-6 pt-1-6 z-10'}>
                <div className={'flex flex-row items-center'}>
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
                          className={'inline-block  px-1-6 mr-0-8 pb-0-4 ' + badgeBg }
                        >
                          {tagsWithCustomStyles[badgeKey] && tagsWithCustomStyles[badgeKey].isLink ? (
                            <a className={'inline-block text-xs font-sans font-regular capitlize ' + badgeCol} href={tagsWithCustomStyles[badgeKey].link}>
                              {badgeText}
                            </a>
                          ): (
                            <span className={'inline-block text-xs font-sans font-regular capitlize ' + badgeCol}>
                              {badgeText}
                            </span>

                          )}
                        </div>
                      )
                    }
                  }) : null}
                </div>
                {!isRiseGiftCard &&
                <div className={'w-4 h-4'}>
                  <Snippets.Button
                    title={'Add to wishlist'}
                    colour={'blank'}
                    className={'flex justify-center items-center'}
                    onClick={() => {
                      ShopifyNext.Wishlist.toggleItem(product.id, (this.state.variant && this.state.variant.id ? this.state.variant.id : product.variants[0].id))
                      this.setState((prevState) => ({
                        inWishlist: !prevState.inWishlist
                      }))
                    }}
                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Snippets.Icon
                      name={inWishlist ? 'heart_fill' : 'heart_unfilling'}
                      width={40}
                      stroke={'2'}
                      ariaHidden
                    />
                  </Snippets.Button>
                </div>}
              </div>
              <div className={'w-full lg:w-7/10 lg:px-1-6 lg:mb-0 mb-3-2'}>
                <div className={'w-full h-full'}>
                  <Snippets.ProductSlider
                    {...this.props}
                    altText={altText}
                    images={product.images}
                    videos={product.videos}
                    selectedRibbon={selectedRibbon}
                    imageHandle={product.title}
                    colour={product.colourName}
                  />
                </div>
              </div>

              <div className={'w-full lg:w-3/10 mt-1-6 md:mt-0 text-left px-1-6 lg:px-3-2 lg:pt-5-3'}>
                {/*
                // @ts-ignore */}
                <ShopifyNext.Components.Forms data={form.product} className={'relative block'}>
                  <select className='hidden' name="id" defaultValue={variant.id}>
                    <option value={variant.id}>{variant.id}</option>
                  </select>
                  <div className={'hidden lg:flex flex-row justify-between'}>
                    <div className={'flex flex-row items-center'}>
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
                              className={'inline-block  px-1-6 mr-0-8 pb-0-4 ' + badgeBg }
                            >
                              {tagsWithCustomStyles[badgeKey] && tagsWithCustomStyles[badgeKey].isLink ? (
                                <a className={'inline-block text-xs font-sans font-regular capitlize ' + badgeCol} href={tagsWithCustomStyles[badgeKey].link}>
                                  {badgeText}
                                </a>
                              ): (
                                <span className={'inline-block text-xs font-sans font-regular capitlize ' + badgeCol}>
                                  {badgeText}
                                </span>

                              )}
                            </div>
                          )

                        }
                      }) : null}
                    </div>
                    {!isRiseGiftCard && <div className={'w-4 h-4'}>
                      <Snippets.Button
                        title={'Add to wishlist'}
                        colour={'blank'}
                        className={'flex justify-center items-center'}
                        onClick={() => {
                          ShopifyNext.Wishlist.toggleItem(product.id, (this.state.variant && this.state.variant.id ? this.state.variant.id : product.variants[0].id))
                          this.setState((prevState) => ({
                            inWishlist: !prevState.inWishlist
                          }))
                        }}
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Snippets.Icon
                          name={inWishlist ? 'heart_fill' : 'heart_unfilling'}
                          width={40}
                          stroke={'2'}
                          ariaHidden
                        />
                      </Snippets.Button>
                    </div>}
                  </div>

                  <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-0-8'} itemprop="name">
                    {product.title}
                  </Snippets.Heading>
                  {!isRiseGiftCard && (
                    <Snippets.ProductPrice
                      {...this.props}
                      variant={variant}
                      className={'mb-1-5 md:mb-1-8 text-black'}
                      layout={'product'}
                    />
                  )}
                  <div className={'mb-3'}>
                    {product.description ? (
                      <React.Fragment>
                        <div className={`${this.state.showMore ? 'max-h-screen' : 'max-h-12'} overflow-hidden relative transition-fast`}>
                          <Snippets.RichText className={'text-base leading-base mb-2-5 richtext'}>
                            {product.description}
                          </Snippets.RichText>
                          <div className={`white-overlay h-6-4 absolute w-full left-0 bottom-0 transition-fast ${this.state.showMore ? 'opacity-0' : ''}`}></div>
                        </div>
                        <div className={'flex mt-1'}>
                          <a className={'uppercase text-xs tracking-wide font-bold cursor-pointer block leading-base'}
                            onClick={() => this.handleClick()}>
                            Read {this.state.showMore ? 'Less' : 'More'}
                          </a>
                          <span className={'flex-grow text-xs opacity-50 ml-0-8 leading-base'}>{`Item ${this.state.variant.sku}`}</span>
                        </div>
                      </React.Fragment>)
                      : null
                    }
                  </div>

                  <Sticky enabled={this.state.sticky} top={this.handleStickyPosition()} innerZ={20}>
                    <div className={'bg-white'}>
                      <div className={`w-full h-5-6 flex-row justify-between items-center border-t border-l border-r border-grey-border ${this.state.sticky ? 'flex' : 'hidden'}`}>
                        <Snippets.Heading size={'h2'} tag={'p'} className={'pl-1-6'}>{product.title}</Snippets.Heading>
                        <div className={'flex flex-row items-center'}>
                          {product.images && product.images.length ? <Snippets.Image
                            alt={altText || 'product image'}
                            src={product.images[0].src}
                            ratio={'1:1'}
                            className={'w-5-5 border-r md:border-0 border-grey-border'}
                            preventLazy
                          /> : null}
                          <Snippets.Button
                            title={'scroll to top'}
                            onClick={this.scrollToTop}
                            colour={'blank'}
                            className={'md:hidden'}
                          >
                            <Snippets.Icon
                              name={'arrow'}
                              className={'text-black mx-0-8'}
                              width={40}
                              height={40}
                            />
                          </Snippets.Button>
                        </div>
                      </div>

                      <div className={`h-full ${(this.state.sticky && window.innerWidth < 768) ? 'hidden' : 'block'}`}>
                        {this.state.siblingsQuantity > 0 ? (
                          <div className={'mb-1-6'}>
                            <div className={'w-full flex justify-between mb-1-6'}>
                              <Snippets.Heading size={'h5'} tag={'h3'}>
                                {madeToOrder ? 'Step 1: Choose a Hat colour' : 'Colour'}
                              </Snippets.Heading>
                              <p className={'text-xs font-regular capitalize opacity-50 leading-tight'}>{product.colourName}</p>
                            </div>
                            <Snippets.ProductSwatches product={{ ...product, filteredSiblings: this.state.filteredSiblings }} />
                          </div>
                        ) : null}
                        {selectedRibbon ? (
                          <React.Fragment>
                            <Snippets.Heading size={'h5'} tag={'h3'}>
                              Step 2: Choose a ribbon colour
                            </Snippets.Heading>
                            <div
                              className={'my-1-6 w-full h-4-8 border border-grey-border flex items-center justify-center'}
                            >
                              <div className={'w-full h-full relative z-20'}>
                                <select
                                  onChange={(e) => this.setState({
                                    selectedRibbon: e.target.value
                                  })}
                                  value={selectedRibbon}
                                  className={'w-full h-full pl-1-6 appearance-none bg-white'}
                                >
                                  {ribbons.map((color) => (
                                    <option key={color} value={color}>
                                      {color}
                                    </option>
                                  ))}
                                </select>
                                <span className={'absolute'} style={{ right: '16px', top: '15px' }}>
                                  <Snippets.Icon name="chevron_down" width={12} height={18} />
                                </span>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : null}
                        {selectedBrim ? (
                          <React.Fragment>
                            <Snippets.Heading size={'h5'} tag={'h3'}>
                              Step 2: Choose your brim size
                            </Snippets.Heading>
                            <div
                              className={'my-1-6 w-full h-4-8 border border-grey-border flex items-center justify-center'}
                            >
                              <div className={'w-full h-full relative z-20'}>
                                <select
                                  onChange={(e) => window.location.href = `/products/${e.target.value}`}
                                  value={selectedBrim.split('|')[1]}
                                  className={'w-full h-full pl-1-6 appearance-none bg-white'}
                                >
                                  {brims.map((brim) => {
                                    const [label, value] = brim.split('|')
                                    return (
                                      <option key={value} value={value}>
                                        {label}
                                      </option>
                                    )
                                  })}
                                </select>
                                <span className={'absolute'} style={{ right: '16px', top: '15px' }}>
                                  <Snippets.Icon name="chevron_down" width={12} height={18} />
                                </span>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : null}

                        <Snippets.ProductOptions
                          options={isRiseGiftCard ? [{value: '', name: 'Select an amount'},...product.options_with_values] :product.options_with_values}
                          config={{
                            size: {
                              layout: 'grid',
                              sizeGuideUrl: selectedRibbon ? '/pages/size-fit-guide#made-to-order' : section.product.settings.sizeguideurl
                            },
                            value: {
                              layout: 'dropdown',
                              title: false,
                            },
                            type: {
                              layout: 'toggle',
                              title: false,
                            }
                          }}
                          sizeGuidePopupEnabled={!!this.state.sizeGuidePopupType}
                          variant={variant}
                          selected={this.state.selected}
                          selectedOptions={this.state.selected_options}
                          enabledOptions={this.state.enabled_options}
                          onSaleOptions={this.state.onSaleOptions}
                          showTitles={true}
                          optionPrefix={isRiseGiftCard && 'USD'}
                          onChange={(value: any, index: number) => this.handleChange(value, index)}
                          selectedRibbon={selectedRibbon}
                          selectedBrim={selectedBrim}
                          selectedSize={selectedSize}
                          onSizeChange={(size: CustomSize) => this.setState({ selectedSize: size })}
                          handleSizeGuidePopup={this.handleSizeGuidePopup}
                        />

                        <Snippets.ProductQuantity
                          hidden={isShopifyGiftCard || isRiseGiftCard}
                          quantity={quantity}
                          max={this.state.variant.inventory_policy === 'continue' ? Helpers.UNLIMITED_SELECTABLE_QTY : (this.state.variant.inventory_quantity >= maxSelectableQuantity ? maxSelectableQuantity : this.state.variant.inventory_quantity)}
                          toggleQuantity={this.handleQtyChange}
                        />
                      </div>

                      {!isRiseGiftCard && (variant.available
                        ? <Snippets.ProductAddToCart
                          {...this.props}
                          variant={variant}
                          quantity={quantity}
                          handleAddToCart={product.product_type === 'Gift card' && this.state.selected.options[1] === 'Digital' ? () => this.setState({ giftCardPopup: true }) : this.handleAddToCart}
                          outofstock={!variant.available}
                          orderedMaxQty={selectableQuantity < 1}
                        />
                        : this.state.sticky ?
                          <Snippets.ProductAddToCart
                            {...this.props}
                            variant={variant}
                            quantity={quantity}
                            hideMoney={isRiseGiftCard}
                            handleAddToCart={isShopifyGiftCard ? () => this.setState({ giftCardPopup: true }) : this.handleAddToCart}
                            outofstock={!variant.available}
                            orderedMaxQty={selectableQuantity < 1}
                          /> : <Snippets.ProductBackToStock
                            {...this.props}
                            variant={variant}
                          />)}

                      {isRiseGiftCard &&
                        <button type="submit" className="GiftWizard-gift-button cursor-pointer bg-black text-white tracking-wide border border-black text-center px-1-6 font-bold text-xs hover:bg-white hover:text-black flex flex-row items-center justify-between w-full h-5-6 no-underline transition-fast">
                          <Snippets.Heading size={'h5'} tag={'p'} className={'select-none'}>Add to cart</Snippets.Heading>
                        </button>
                      }

                    </div>
                  </Sticky>
                </ShopifyNext.Components.Forms>

                {(isShopifyGiftCard || isRiseGiftCard) &&
                  <Snippets.Button
                    colour="secondary"
                    type="button"
                    title={'Check gift voucher balance'}
                    onClick={() => this.setState({
                      giftCardBalancePopup: true,
                    })}
                    className="w-full mt-1-6 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 32 32" width={20} height={20}>
                      <g fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2">
                        <path d="M1 10h30M1 15h30M5 21h7M25 21h2M1 25V7c0-1.105.895-2 2-2h26c1.105 0 2 .895 2 2v18c0 1.105-.895 2-2 2H3c-1.105 0-2-.895-2-2z"/>
                      </g>
                    </svg>
                    <span className="inline-block ml-0-4">
                      {'Check gift voucher balance'}
                    </span>
                  </Snippets.Button>
                }
                {settings.shipping_message && !selectedRibbon ?
                  <div className={'flex items-center mt-1-6'}>
                    <span className={'flex w-4 h-4 justify-center items-center'}>
                      <Snippets.Icon name={'delivery'} width={20} height={20} />
                    </span>
                    <p className={'text-xs'}>{settings.shipping_message}</p>
                  </div>
                  : null}
              </div>
            </div>
          </section>
          <Snippets.SizeGuidePopup
            section={this.props.data.section['size-guide-popup']}
            sizeGuidePopupType={this.state.sizeGuidePopupType}
            visible={this.state.sizeGuidePopupVisible}
            handleSizeGuidePopup={this.handleSizeGuidePopup}
          />
          {product.product_type !== 'Gift card' ? (
            <Snippets.ProductContent
              product={product}
              section={section}
              shippingOptions={section.product.blocks.filter(block => block.type === 'shippingoptions')}
            />
          ) : null}
        </main>

        {product?.metafields?.dtk?.fields?.sections.length > 0 ? (
          <ShopifyNext.Components.DynamicSections
            {...this.props}
            dtkSections={product.metafields.dtk.fields.sections}
          />
        ) : null}
        {product.product_type !== 'Gift card' ? (
          <Sections.ProductRecommended
            {...this.props}
            title={'You’ll also like'}
          />
        ) : null}
        <Sections.ProductRecent
          {...this.props}
          title={'Recently viewed'}
        />
        {isShopifyGiftCard && <Snippets.PopupGiftCardBalance
          visible={this.state.giftCardBalancePopup}
          handlePopup={(open: boolean) => this.setState({
            giftCardBalancePopup: open
          })}
        />}

        {isRiseGiftCard && <Snippets.PopupGiftCardBalanceRise
          visible={this.state.giftCardBalancePopup}
          handlePopup={(open: boolean) => this.setState({
            giftCardBalancePopup: open
          })}
        />}


        <Snippets.PopupGiftCard
          visible={this.state.giftCardPopup}
          handlePopup={(open: boolean) => this.setState({
            giftCardPopup: open
          })}
          sender={this.state.sender}
          recipient={this.state.recipient}
          email={this.state.recipientEmail}
          message={this.state.message}
          handleEmail={(value) => this.setState({
            recipientEmail: value
          })}
          handleSender={(value) => this.setState({
            sender: value
          })}
          handleRecipient={(value) => this.setState({
            recipient: value
          })}
          handleMessage={(value) => this.setState({
            message: value
          })}
          type={'Physical'}
        >
          <Snippets.ProductAddToCart
            {...this.props}
            variant={variant}
            quantity={quantity}
            handleAddToCart={(val) => {
              this.setState({
                giftCardPopup: false
              })
              this.handleAddToCart(val)
            }}
            outofstock={!variant.available}
            orderedMaxQty={selectableQuantity < 1}
            disabled={!this.state.recipient || !this.state.recipientEmail || !this.state.sender}
          />
        </Snippets.PopupGiftCard>

      </Layouts.Theme>
    )
  }

  private handleAddToCart = async (event) => {
    event.preventDefault()
    const milliseconds = (new Date).getTime()
    const { variant, quantity, selectedSize, selectedRibbon, sender, recipient, recipientEmail, message, selectableQuantity } = this.state
    const { product } = this.props.data

    // early exit if reached maximum quantity
    if (selectableQuantity < quantity) {
      this.context.update({
        cartActive: true,
        message: 'CART_ITEM_REACHED_MAX_QTY',
        showMessage: true
      })
      setTimeout(() => {
        this.context.update({
          showMessage: false
        })
      }, 3000)

      return false
    }

    // Leaving Bugsnag breadcrumb
    (window as unknown as { Bugsnag: any }).Bugsnag.leaveBreadcrumb('Adding item to cart', {
      variantID: variant.id,
      quantity,
    })

    const properties: any = {
      properties: {
        _key: milliseconds,
        ribbon: selectedRibbon,
        _custom: product.tags.includes('x_tag-list-entry:Custom') ? true : undefined
      }
    }

    const giftCardProperties: any = {
      properties: {
        _key: milliseconds,
        ribbon: selectedRibbon,
        Sender: sender,
        Recipient: recipient,
        'Recipient email': recipientEmail,
        Message: message,
        _custom: product.tags.includes('x_tag-list-entry:Custom') ? true : undefined
      }
    }

    if (selectedSize) {
      properties.properties.size = selectedSize
    }

    if (sender && recipient) {
      await ShopifyNext.Cart.addItem(parseInt(variant.id, 10), quantity ? quantity : 1, giftCardProperties)
    } else {
      await ShopifyNext.Cart.addItem(parseInt(variant.id, 10), quantity ? quantity : 1, properties)
    }

    this.context.update({
      cartActive: true,
      showMessage: true
    })
    setTimeout(() => {
      this.context.update({
        showMessage: false
      })
    }, 3000)
  }

  private handleChange = (value: any, index: number): void => {
    const selectedOptions = {
      ...this.state.selected_options,
      [`option${index}`]: value.name ? value.name : value
    }
    let selectedVariant = this.findVariant(selectedOptions, this.props.data.product.variants)
    if (!selectedVariant && value.value == 'Colour') {
      selectedVariant = this.props.data.product.variants.find((v: any) => v.option2 === selectedOptions.option2)
    } else if (!selectedVariant) {
      return
    }

    this.setState({
      ...this.state,
      variant: selectedVariant,
      selected: selectedVariant,
      selected_options: selectedOptions,
      quantity: 1,
      inWishlist: ShopifyNext.Wishlist.checkItem(this.props.data.product.id, selectedVariant.id)
    })
    if (!selectedVariant) return
    this.props.history.push(`?variant=${selectedVariant.id}`)
  }

  private getVariant = (id: number, variants: any): any => variants.filter((v: any) => v.id === id)[0];

  private findVariant = (selected: any, variants: any): any => {
    const variant = variants.filter(
      (v: any) => v.option1 === selected.option1 && v.option2 === selected.option2 && v.option3 === selected.option3
    )
    return variant ? variant[0] : null
  }

  private findOptions = (id: number, variants: any): any => {
    const variant = variants.filter((v: any) => v.id === id)
    return {
      option1: variant[0].option1,
      option2: variant[0].option2,
      option3: variant[0].option3
    }
  }

  public handleQtyChange = (type: '+' | '-'): void => {
    const { quantity, variant } = this.state
    const maxSelectableQuantity = Helpers.getMaxSelectableQuantity(variant)
    let newQuantity: number = quantity

    type == '+' && (quantity + 1 <= variant.inventory_quantity || variant.inventory_policy === 'continue') && newQuantity < maxSelectableQuantity ? (newQuantity = newQuantity + 1) : null
    type == '-' && quantity > 1 ? (newQuantity = newQuantity - 1) : null

    quantity != newQuantity ? this.setState({ quantity: newQuantity }) : null
  };

  public getElementViewTop = (element) => {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    let elementScrollTop
    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }

    if (document.compatMode == 'BackCompat') {
      elementScrollTop = document.body.scrollTop
    } else {
      elementScrollTop = document.documentElement.scrollTop
    }

    return actualTop - elementScrollTop
  }

  private handleScroll = (): void => {
    const { prevScroll } = this.state
    if (prevScroll === 0) {
      window.scrollY > 100
        ? this.setState({
          prevScroll: window.scrollY,
          currentDirection: 'down'
        })
        : this.setState({
          currentDirection: 'up'
        })
    } else {
      const changeY = window.scrollY - prevScroll
      this.setState({
        prevScroll: window.scrollY,
        currentDirection: changeY > 0 ? 'down' : 'up',
      })
    }

    const stickElement = document.querySelector('.sticky-outer-wrapper')
    let distanceToViewTop = this.getElementViewTop(stickElement)

    if (distanceToViewTop < window.innerHeight / 3) {
      this.setState({
        sticky: true
      })
    } else {
      this.setState({
        sticky: false
      })
    }
  }

  private throttledHandleScroll = throttle(this.handleScroll, 500)

  private handleStickyPosition = () => {
    if (window.innerWidth < 768) {
      if (this.state.currentDirection === 'up') {
        return window.innerHeight - 169
      } else {
        return window.innerHeight - 128
      }
    } else {
      if (this.state.currentDirection === 'up') {
        return 145
      } else {
        return 32
      }
    }
  }

  private scrollToTop() {
    event.preventDefault()
    Helpers.scrollToTop()
  }

  private setRecentViewProducts = () => {
    const recent: any = ShopifyNext.Utils.getLocalStorage(ProductTemplate.recentlyViewedKey)
      ? ShopifyNext.Utils.getLocalStorage(ProductTemplate.recentlyViewedKey).split(',')
      : []

    const viewedKey = `${this.props.data.product.handle}`
    const currentItem: number = recent.findIndex((item) => item === viewedKey)
    recent.push(currentItem > -1 ? recent.splice(currentItem, 1)[0] : viewedKey)

    ShopifyNext.Utils.setLocalStorage(ProductTemplate.recentlyViewedKey, recent)
  }

  private handleSizeGuidePopup = (show: boolean) => {
    this.setState({
      sizeGuidePopupVisible: show
    })
  }
}



export namespace ProductTemplate {
  export interface Props extends GlobalProps { }
  export interface State extends GlobalState {
    sticky: boolean
    prevScroll: number;
    currentDirection: 'down' | 'up';
    showMore: boolean;
    notifyPopup: boolean;
    quantity: number;
    variant: any;
    options: any;
    selected: any;
    selected_options: any;
    enabled_options: any;
    onSaleOptions: any;
    inWishlist: boolean
    siblingsQuantity: number;
    filteredSiblings: {}[];
    ribbons?: string[];
    brims?: string[];
    selectedRibbon?: string;
    selectedBrim?: string;
    selectedSize?: CustomSize;
    giftCardPopup: boolean;
    giftCardBalancePopup: boolean;
    sender: string
    recipient: string
    recipientEmail: string
    message: string
    selectableQuantity: number
    sizeGuidePopupType: string | null
    sizeGuidePopupVisible: boolean
  }

}
