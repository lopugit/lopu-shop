import * as React from 'react'
import * as Snippets from 'snippets'

export class Logo extends React.PureComponent<Logo.Props> {
  public render(): JSX.Element {
    const { alt, className, width, version } = this.props
    const style: React.CSSProperties = {}
    const logo: string = version || 'logo'
    width ? (style.width = `${width}px`) : null

    return (
      <div className={`${className ? className : ''}`}>
        <a href="/" className={'relative block'} title={alt}>
          <Snippets.Icon 
            name={logo as Snippets.Icon.Name}
            width={width ? width : null} 
            className={`block max-w-full${!width ? ' w-full' : ''}`} 
          />
        </a>
      </div>
    )
  }
}

export namespace Logo {
  export interface Props {
    alt: string;
    className?: string;
    width?: number;
    version?: string;
  }
}
