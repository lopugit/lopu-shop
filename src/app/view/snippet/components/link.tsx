import * as React from 'react'

export class Link extends React.PureComponent<Link.Props> {
  public render(): JSX.Element {
    const { className, href, onClick, target, title, onMouseEnter, onMouseLeave } = this.props
    const classes: any = `${className ? ` ${className}` : ''}`

    return (
      <a
        href={href ? href : null}
        onClick={onClick ? () => onClick() : null}
        className={`${classes} ie-link`}
        title={title ? title : null}
        aria-label={title ? title : null}
        role={'link'}
        target={target ? target : null}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {this.props.children}
      </a>
    )
  }
}

export namespace Link {
  export interface Props {
    className?: string;
    href?: string;
    noHover?: boolean;
    onClick?: any;
    target?: string;
    title?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }
}
