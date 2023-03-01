import * as React from 'react'
import LazyLoad from 'react-lazy-load'
import * as Helpers from 'helpers'
import throttle from 'lodash.throttle'
import ReactPlayer from 'react-player'

export class VideoPlayer extends React.Component<VideoPlayer.Props, VideoPlayer.State> {
  public container = null;
  
  public constructor(props: VideoPlayer.Props) {
    super(props)

    this.state = {
      mounted: false,
      imageWidth: props.width ? props.width : 0,
      loaded: false,
    }
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
  
  public render(): JSX.Element {
    const { bg, contain, height, ratio, src, title, alt, width, className, preventLazy, coverImage, playsInline } = this.props
    const { imageWidth, mounted, loaded } = this.state
    return (
      <div
        className={`${className ? className + ' ' : ''}${ratio && ratio != 'null' && ratio != 'natural' ? 'ratio-' + ratio + ' ' : ''}${
          !mounted ? (bg ? `bg-${bg}` : `bg-${contain ? 'transparent' : 'grey-200'}`) : 'bg-transparent'
        } transition-fast`}
        style={this.props.style ? this.props.style : null}
        ref={(container) => {
          this.container = container
        }}
      >
        <style>
          {`.react-player video {
            object-fit: cover;
          }`}
        </style>
        {height && width && ratio == 'natural' && (
          <div className={'w-full'} style={{ paddingTop: `${Number((height / width) * 100)}%` }} />
        )}
        {src && src.length && mounted && imageWidth !== 0 ? 
          preventLazy ? (
            <ReactPlayer
              className={`react-player ${ratio === 'natural' ? '' : 'object-cover object-top inset-0 absolute h-full'} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity  w-full`}
              url={src}
              width='100%'
              height='100%'
              controls={false}
              loop={true}
              playing={this.props.playing}
              muted={this.props.autoplay}
              config={{
                vimeo: {
                  playerOptions: {
                    controls: false,
                    playsinline: true,
                  }
                }
              }}
              onReady={this.handleLoad}
              onPlay={() => this.props.onPlay()}
              onPause={() => this.props.onPause()}
              light={coverImage}
              playsinline={playsInline}
            />
          ) : (
            <LazyLoad
              debounce={false}
              offset={200}
            >
              <ReactPlayer
                className={`react-player ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity ${ratio === 'natural' ? '' : 'object-cover object-top inset-0 absolute h-full'} w-full`}
                url={src}
                width='100%'
                height='100%'
                controls={true}
                loop={true}
                playing={this.props.playing}
                muted={this.props.autoplay}
                config={{
                  vimeo: {
                    playerOptions: {
                      controls: false,
                      playsinline: true,
                    }
                  }
                }}
                onPlay={() => this.props.onPlay()}
                onPause={() => this.props.onPause()}              
                playsinline={true}
              />
            </LazyLoad>
          ) 
          : null}
        {this.props.children}
      </div>
    )
  }
}

export namespace VideoPlayer {
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
    coverImage?: string;
    playsInline?: boolean;

    autoplay: boolean;
    playing: boolean;
    onPlay: () => void;
    onPause: () => void;
  }
  export interface State {
    mounted: boolean;
    imageWidth: number;
    loaded: boolean;
  }
}
