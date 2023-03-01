import * as React from 'react'
import LazyLoad from 'react-lazy-load'
import * as Helpers from 'helpers'
import throttle from 'lodash.throttle'

export class Image extends React.Component<Image.Props, Image.State> {
  public container = null;

  public constructor(props: Image.Props) {
    super(props)

    this.state = {
      mounted: false,
      imageWidth: props.width ? props.width : 0,
      loaded: false,
    }
  }

  public render(): JSX.Element {
    return <React.Fragment>{this.buildImage(this.props)}</React.Fragment>
  }

  public componentDidMount(): void {
    this.setState({
      mounted: true
    })
    window.addEventListener('resize', this.throttledHandleResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleResize)
  }

  public componentDidUpdate() {
    const imageWidth = this.container.clientWidth > 600 ? this.container.clientWidth : 600
    if (this.container && this.state.imageWidth !== imageWidth && !this.props.width) {
      this.setState({
        imageWidth,
      })
    }
  }

  private handleResize = () => {
    if (this.container && !this.props.width) {
      this.setState({
        imageWidth: this.container.clientWidth
      })
    }
  }

  private throttledHandleResize = throttle(this.handleResize, 500)

  private handleLoad = () => {
    this.setState({
      loaded: true
    })
  }

  private buildImage(props: any): JSX.Element {
    const { bg, contain, height, ratio, src, title, alt, width, className, preventLazy, overlay } = props
    const { imageWidth, mounted, loaded } = this.state
    return (
      <div
        className={`
          ${className ? className + ' ' : ''}
          ${ratio && ratio != 'null' && ratio != 'natural' ? 'ratio-' + ratio + ' ' : ''}
          ${!mounted ? (bg ? `bg-${bg}` : `bg-${contain ? 'transparent' : 'grey-200'}`) : 'bg-transparent'} 
          transition-fast
        `}
        style={props.style ? props.style : null}
        ref={(container) => {
          this.container = container
        }}
      >
        {height && width && ratio == 'natural' && (
          <div className={'w-full'} style={{ paddingTop: `${Number((height / width) * 100)}%` }} />
        )}
        {src && mounted && imageWidth !== 0 ?
          preventLazy ? (
            <img
              src={Helpers.getSizedImageUrl(src, `${imageWidth}x`)}
              className={`${ratio === 'natural' ? '' : 'object-cover object-top inset-0 absolute h-full'} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity  w-full`}
              alt={alt}
              title={title && title !== '' ? title : false}
              onLoad={this.handleLoad}
              draggable={false}
            />
          ) : (
            <LazyLoad
              debounce={false}
              offset={200}
            >
              <img
                src={Helpers.getSizedImageUrl(src, `${imageWidth}x`)}
                className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity ${ratio === 'natural' ? '' : 'object-cover object-top inset-0 absolute h-full'} w-full`}
                alt={alt}
                onLoad={this.handleLoad}
                draggable={false}
              />
            </LazyLoad>
          )
          : null}

        {overlay && (
          <div
            className={'absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer'}
          >
            {overlay}
          </div>
        )}
        {props.children}
      </div>
    )
  }
}

export namespace Image {
  export interface Props {
    bg?: string;
    className?: string;
    contain?: boolean;
    height?: number;
    ratio?: string;
    src?: string;
    style?: any;
    title?: string;
    width?: number;
    alt: string;
    preventLazy?: boolean;
    overlay?: JSX.Element;
  }
  export interface State {
    mounted: boolean;
    imageWidth: number;
    loaded: boolean;
  }
}
