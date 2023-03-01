import * as React from 'react'

export class Heading extends React.PureComponent<Heading.Props> {
  public render(): JSX.Element {
    const { children, className, size, tag, id, itemprop } = this.props
    let sizes: any = {
      h1: 'text-3xl sm:text-4xl font-light font-mono leading-none',
      h2: `${!className || (className && !className.includes('text-3xl')) ? 'text-2xl' : ''} 
           ${!className || (className && !className.includes('font-bold')) ? 'font-light' : ''} 
           font-mono leading-none`,
      h3: 'text-base font-bold tracking-wider uppercase font-sans',
      h4: 'text-base font-light font-mono leading-none',
      h5: 'text-xs font-bold tracking-wide uppercase leading-tight font-sans',
      h6: 'text-xs font-normal font-sans',
      h5Alt: 'text-base font-bold tracking-wide uppercase leading-tight font-sans',
      p: `${!className || (className && !className.includes('text-xs')) ? 'text-base' : ''} font-light font-sans`,
      none: ''
    }
    const style: string = size ? sizes[size] : sizes[tag]
    const classes: string = `${style} ${className ? className : ''}`
    return React.createElement(tag, { 
      className: classes,
      id:id,
      itemProp: itemprop,
    }, children)
  }
  
}

export namespace Heading {
  export interface Props {
    className?: string;
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'none' | 'h5Alt';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
    itemprop?: string;
    id?: string
  }
}
