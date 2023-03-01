import * as React from 'react'
import Slick from 'react-slick'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

const awsUrl = '//lopu-shop-images.s3.ap-southeast-2.amazonaws.com/ribbon'

export class ProductSlider extends React.PureComponent<ProductSlider.Props, ProductSlider.State> {
  private container
  public constructor(props: ProductSlider.Props) {
    super(props)
    const { images, videos, externalvideos } = props
    const preloadImages = []
    images && images.length > 0 ? images.forEach(image => preloadImages.push(image.src)) : null
    Helpers.preload(preloadImages, '2000x')

    this.state = {
      slider: null,
      thumbSlider: null,
      currentSlide: 0,
      imageWidth: 0,
      images,
      videos,
      externalvideos,
      media: this.getMedia(),
    }
  }

  private getMedia = () => {
    const { images, videos, externalvideos } = this.props

    const media = []

    for (const video of videos) {
      media.push({
        type: 'video',
        content: {
          src: video.sources[0],
          image: video.image,
          position: video.position - 0.5,
        },
      })
    }

    for (const image of images) {
      media.push({
        type: 'image',
        content: image,
      })
    }

    return media.sort((a,b) => ((a.content.position < b.content.position) || b.type === 'video') ? -1 : 1)
  }

  private sliderSettings = {
    adaptiveHeight: true,
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: true,
    swipe: false,
    pauseOnHover: true,
    swipeToSlide: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    draggable: false,
    beforeChange: (_current: number, next: number) => this.selectMedia(next)
  }

  private thumbSliderSettings = {
    slidesToScroll: 1,
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: false,
    arrows: false,
    centerMode: true,
    centerPadding: `${(window.innerWidth-96) / 2 }px`,    
    beforeChange: (_current: number, next: number) => this.selectMedia(next),
    responsive: [
      {
        breakpoint: 360,
        settings: {
          centerMode: true
        }
      }
    ]
  }

  private selectMedia = (index: number): any => {
    this.state.currentSlide !== index
      ? this.setState({
        currentSlide: index
      })
      : null
  };

  public componentDidUpdate(prevState) {
    this.state.slider && this.state.currentSlide !== prevState.currentSlide ? (this.state.slider.slickGoTo(this.state.currentSlide)) : null
    this.state.thumbSlider && this.state.currentSlide !== prevState.currentSlide ? this.state.thumbSlider.slickGoTo(this.state.currentSlide) : null
    if (this.container && this.state.imageWidth !== this.container.clientWidth) {
      this.setState({
        imageWidth: this.container.clientWidth
      })
    }
  }

  public render(): JSX.Element {
    const { images, videos, media, currentSlide } = this.state
    const { data, altText, selectedRibbon, imageHandle, colour } = this.props

    return images.length > 0 ? (
      <div className={'w-full flex flex-col-reverse lg:flex-row justify-between h-full'}>
        <div className={'hidden lg:flex flex-row lg:flex-col justify-center w-full lg:w-10 lg:min-w-10 pr-2 h-full'}>
          {media.map((media, index) => {
            if (media.type === 'video' || media.type === 'external_video') {
              return (
                <div
                  key={index}
                  className={`w-full transition-fast cursor-pointer border mb-1-6 relative ${currentSlide === index ? 'border-black' : 'border-transparent'}`}
                  onClick={() => this.selectMedia(index)}
                >
                  <Snippets.Image
                    ratio={'1:1'}
                    className={'block'}
                    alt={altText || 'product image'}
                    src={media.content.image}
                    overlay={(
                      <Snippets.Icon
                        className="text-transparent opacity-75 stroke-white stroke-5"
                        width={20}
                        height={20}
                        name={'play'}
                      />
                    )}
                    preventLazy
                  />
                </div>
              )
            }
            if (media.type === 'image') {
              return (
                <div
                  key={index}
                  className={`w-full transition-fast cursor-pointer border mb-1-6 relative ${currentSlide === index ? 'border-black' : 'border-transparent'}`}
                  onClick={() => this.selectMedia(index)}
                >
                  <Snippets.Image
                    ratio={'1:1'}
                    className={'block'}
                    alt={altText || 'product image'}
                    src={media.content.src}
                    preventLazy
                  />
                  {selectedRibbon ? (
                    <div className="absolute inset-0">
                      <Snippets.Image
                        ratio={'1:1'}
                        alt={altText || 'product image'}
                        src={`${awsUrl}_${imageHandle}_${colour}_${selectedRibbon}_${index + 1}.png`}
                        preventLazy
                      />
                    </div>
                  ) : null}
                </div>
              )
            }
          })}
        </div>
        {window.innerWidth <= 1024 ? <div className={'lg:hidden w-full'}>
          {media.length > 1 ? (
            <Slick
              {...this.thumbSliderSettings}
              ref={(thumbSlider) => this.setState({ thumbSlider })}
            >
              {media.map((media, i) => {
                if (media.type === 'video' || media.type === 'external_video') {
                  return (
                    <div
                      key={i}
                      className={'w-full cursor-pointer pl-0-8'}
                      onClick={() => this.selectMedia(i)}
                    >
                      <div className="relative">
                        <Snippets.Image
                          ratio={'1:1'}
                          className={`block w-8 transition-fast border ${currentSlide === i ? 'border-black' : 'border-transparent'}`}
                          alt={altText || 'product image'}
                          src={media.content.image}
                          preventLazy
                        />
                      </div>
                    </div>
                  )
                }
                if (media.type === 'image') {
                  return (
                    <div
                      key={i}
                      className={'w-full cursor-pointer pl-0-8'}
                      onClick={() => this.selectMedia(i)}
                    >
                      <div className="relative">
                        <Snippets.Image
                          ratio={'1:1'}
                          className={`block w-8 transition-fast border ${currentSlide === i ? 'border-black' : 'border-transparent'}`}
                          alt={altText || 'product image'}
                          src={media.content.src}
                          preventLazy
                        />
                        {selectedRibbon ? (
                          <div className="absolute inset-0">
                            <Snippets.Image
                              className={'block w-8'}
                              ratio={'1:1'}
                              alt={altText || 'product image'}
                              src={`${awsUrl}_${imageHandle}_${colour}_${selectedRibbon}_${i + 1}.png`}
                              preventLazy
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                }
              })}
            </Slick>  
          ) : (
            <div className={'flex justify-center'}>
              <div className="relative">
                <Snippets.Image
                  ratio={'1:1'}
                  className={'block w-8 transition-fast border border-black'}
                  alt={altText || 'product image'}
                  src={images[0].src}
                  preventLazy
                />
                {selectedRibbon ? (
                  <div className="absolute inset-0">
                    <Snippets.Image
                      className={'block w-8'}
                      ratio={'1:1'}
                      alt={altText || 'product image'}
                      src={`${awsUrl}_${imageHandle}_${colour}_${selectedRibbon}_${1}.png`}
                      preventLazy
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div> : null}
        <div className={'w-full lg:w-11/12 h-full flex items-center'}>
          <div className={'w-full lg:w-2/3 mx-auto'}>
            <Slick
              ref={(slider) => this.setState({ slider })}
              {...this.sliderSettings}
            >
              {media && media.length && media.map((media, index) => {
                if (media.type === 'video') {
                  return (
                    <div key={index} className={'flex items-center justify-center'}>
                      <div
                        className={'w-full block lg:hidden relative'}
                      >
                        <Snippets.Video
                          video={media.content.src}
                        />
                      </div>
                      <div
                        className={'hidden lg:block relative'}
                      >
                        <Snippets.Video
                          video={media.content.src}
                        />
                      </div>
                    </div>
                  )
                }
                if (media.type === 'image') {
                  return (
                    <div key={index} className={'flex items-center justify-center'}>
                      <div
                        className={'w-full block lg:hidden relative'}
                      >
                        <Snippets.Image
                          ratio={'1:1'}
                          alt={altText || 'product image'}
                          src={media.content.src}
                          preventLazy
                        />
                        {selectedRibbon ? (
                          <div className="absolute inset-0">
                            <Snippets.Image
                              ratio={'1:1'}
                              alt={altText || 'product image'}
                              src={`${awsUrl}_${imageHandle}_${colour}_${selectedRibbon}_${index + 1}.png`}
                              preventLazy
                            />
                          </div>
                        ) : null}
                      </div>
                      <div 
                        ref={(container) => {
                          this.container = container
                        }}
                        className={'hidden lg:block relative'}
                      >
                        {selectedRibbon ? (
                          <React.Fragment>
                            <Snippets.Image
                              ratio={'1:1'}
                              alt={altText || 'product image'}
                              src={media.content.src}
                              preventLazy
                            />
                            <div className="absolute inset-0">
                              <Snippets.Image
                                ratio={'1:1'}
                                alt={altText || 'product image'}
                                src={`${awsUrl}_${imageHandle}_${colour}_${selectedRibbon}_${index + 1}.png`}
                                preventLazy
                              />
                            </div>
                          </React.Fragment>
                        ) : (
                          <Helpers.Magnifier
                            src={Helpers.getSizedImageUrl(media.content.src, `${this.state.imageWidth}x`)}
                            zoomImgSrc={Helpers.getSizedImageUrl(media.content.src, '2000x')}
                            mgWidth={200}
                            mgHeight={200}
                            mgBorderWidth={1}
                            zoomFactor={1.5}
                            alt={altText}
                          />
                        )}
                      </div>
                    </div>
                  )
                }
              })}

            </Slick>
          </div>
        </div>
      </div>
    ) : null
  }
}
export namespace ProductSlider {
  export interface State {
    slider: any;
    thumbSlider: any
    currentSlide: number;
    imageWidth: number;
    images: {
      src: string
      position: number;
    }[];
    videos: {
      image: string;
      sources: string[];
      position: number;
    }[];
    externalvideos: {
      image: string;
      position: number;
      host: string;
      id: string;
    }[];
    media: Array<{
      type: 'image';
      content: {
        src: string;
        position: number;
      };
    } | {
      type: 'video';
      content: {
        src: string;
        image: string;
        position: number;
      };
    } | {
      type: 'external_video';
      content: {
        image: string;
        position: number;
        host: string;
        id: string;
      };
    }>;
  }
  export interface Props extends GlobalProps {
    images?: {
      src: string
      position: number;
    }[];
    videos?: {
      image: string;
      sources: string[];
      position: number;
    }[];
    externalvideos?: {
      image: string;
      position: number;
      host: string;
      id: string;
    }[];
    altText?: string;
    selectedRibbon?: string;
    imageHandle?: string;
    colour: string;
  }
}
