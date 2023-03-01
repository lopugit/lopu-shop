/* eslint-disable */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const FPS:number = 20
const STEP:number = 1
const TIMEOUT:number = 1 / FPS * 1000

export class Marquee extends React.Component<Marquee.Props, Marquee.State> {
  constructor(props: Marquee.Props) {
    super(props)
    this.state = {
      animatedWidth: 0,
      overflowWidth: 0
    }
  }

  private _marqueeTimer: ReturnType<typeof setTimeout>

  componentDidMount() {
    this._measureText()

    if (this.props.hoverToStop) {
      this._startAnimation()
    }
  }

  componentDidUpdate() {
    this._measureText()

    if (this.props.hoverToStop) {
      this._startAnimation()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer)
  }

  componentWillReceiveProps(nextProps: Marquee.Props) {
    if (this.props.text.length != nextProps.text.length) {
      clearTimeout(this._marqueeTimer)
      this.setState({
        animatedWidth: 0
      })
    }
  }

  private handleMouseEnter = (): void => {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer)
    }
    else if (this.state.overflowWidth > 0) {
      this._startAnimation()
    }
  }

  private handleMouseLeave = ():void => {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this._startAnimation()
    }
    else {
      clearTimeout(this._marqueeTimer)
      this.setState({
        animatedWidth: 0
      })
    }
  }

  render() {
    const style: React.CSSProperties = {
      'position': 'relative' as 'relative',
      'right': this.state.animatedWidth,
      'whiteSpace': 'nowrap' as 'nowrap'
    }

    if (this.state.overflowWidth < 0) {
      return (
        <div className={`ui-marquee overflow-hidden ${this.props.className}`} style={this.props.style}>
          <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
        </div>
      )
    }
    else {
      return (
        <div className={`ui-marquee overflow-hidden ${this.props.className}`} style={this.props.style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
        </div>
      )
    }
  }

  _startAnimation() {
    clearTimeout(this._marqueeTimer)
    const isLeading = this.state.animatedWidth === 0
    const timeout = isLeading ? this.props.leading : TIMEOUT

    const animate = () => {
      const { overflowWidth } = this.state
      let animatedWidth = this.state.animatedWidth + STEP
      const isRoundOver = animatedWidth > overflowWidth

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth = 0
        }
        else {
          return
        }
      }

      if (isRoundOver && this.props.trailing) {
        this._marqueeTimer = setTimeout(() => {
          this.setState({
            animatedWidth
          })

          this._marqueeTimer = setTimeout(animate, TIMEOUT)
        }, this.props.trailing)
      }
      else {
        this.setState({
          animatedWidth
        })

        this._marqueeTimer = setTimeout(animate, TIMEOUT)
      }
    }

    this._marqueeTimer = setTimeout(animate, timeout)
  }

  _measureText() {
    const container = ReactDOM.findDOMNode(this) as HTMLDivElement 
    const node = ReactDOM.findDOMNode(this.refs.text) as HTMLDivElement

    if (container && node) {
      const containerWidth = container.offsetWidth
      const textWidth = node.offsetWidth
      const overflowWidth = textWidth - containerWidth

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth
        })
      }
    }
  }
}

export namespace Marquee {
  export interface Props {
    hoverToStop?: boolean;
    loop?: boolean;
    leading?: number;
    trailing?: number;
    text: string;
    className?: string;
    style?: React.CSSProperties;
  }
  export interface State {
    animatedWidth: number;
    overflowWidth: number;
  }
}
