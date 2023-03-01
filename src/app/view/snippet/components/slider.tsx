import * as React from 'react'
import Slick from 'react-slick'
import './slider.css'

export class Slider extends React.PureComponent<Slider.Props> {
  public render(): JSX.Element {
    const { className, settings, children, refs } = this.props
    return (
      <Slick className={`${className ? className : ''} slider`} {...settings} ref={refs}>
        {children}
      </Slick>
    )
  }
}

export namespace Slider {
  export interface Props {
    settings: {
      infinite: boolean;
      slidesToShow: number;
      slidesToScroll: number;
    };
    className?: string;
    refs?: any
  }
}
