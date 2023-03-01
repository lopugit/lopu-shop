import * as React from 'react'

export class Button extends React.PureComponent<Button.Props> {
  private buttonClasses = 'text-center px-1-6 font-bold text-xs'
  private colours = {
    'primary': {
      default: `bg-black text-white tracking-wide border border-black ${this.buttonClasses} hover:bg-white hover:text-black`,
      disabled: `bg-black text-white opacity-75 cursor-not-allowed ${this.buttonClasses}`
    },
    'primary-reverse': {
      default: `border border-white bg-white text-black hover:bg-blue-60 hover:text-white ${this.buttonClasses}`,
      disabled: `border border-white bg-white text-black opacity-30 cursor-not-allowed ${this.buttonClasses}`
    },
    secondary: {
      default: `border-half border-black pt-1-1 pb-1 transition text-black hover:text-white bg-white hover:bg-black ${this.buttonClasses}`,
      disabled: `border-half border-black text-black bg-white opacity-30 cursor-not-allowed ${this.buttonClasses}`
    },
    'secondary-reverse': {
      default: `border-half border-white pt-1-1 pb-1 transition text-white hover:text-black bg-white hover:bg-white ${this.buttonClasses}`,
      disabled: `border border-white text-white opacity-30 cursor-not-allowed ${this.buttonClasses}`
    },
    'secondary-transparent': {
      default: `border-half border-black pt-1-1 pb-1 transition text-black hover:text-white bg-transparent hover:bg-black ${this.buttonClasses}`,
      disabled: `border-half border-black text-black bg-transparent opacity-30 cursor-not-allowed ${this.buttonClasses}`
    },
    link: {
      default: 'font-bold text-black tracking-wide uppercase text-sm',
      disabled: 'font-bold text-black tracking-wide uppercase text-sm'
    },
    'link-large': {
      default: 'font-bold text-black tracking-wide uppercase text-base',
      disabled: 'font-bold text-black tracking-wide uppercase text-base'
    },
    'link-small': {
      default: 'font-bold text-black tracking-wide uppercase text-xs',
      disabled: 'font-bold text-black tracking-wide uppercase text-xs'
    },
    input: {
      default: 'border-blue-40 border rounded bg-white font-bold text-black text-left px-1-4',
      disabled: 'border-blue-40 border rounded bg-white font-bold text-black text-left px-1-4'
    },
    icon: {
      default: 'rounded-full h-4 w-4 flex items-center justify-center focus:outline-none cursor-pointer',
      disabled: 'rounded-full h-4 w-4 flex items-center justify-center focus:outline-none cursor-not-allowed',
    },
    blank: {
      default: '',
      disabled: ''
    },
  };

  public render(): JSX.Element {
    const { 
      href, className, id, disabled, type, onClick, onMouseLeave, onMouseEnter, target, children, title, refs
    } = this.props
    const colour = this.props.colour || 'primary'
    const colourClass = disabled ? this.colours[colour].disabled : this.colours[colour].default
    const classes = `${colourClass} ${className ? className : ''} ${
      colour.includes('link') || colour.includes('blank')
        ? ''
        : `no-underline ${!this.props.thin ? ' ' : 'py-1'} transition-fast`
    }`
    const classesCopy = classes.includes('bg-transparent') && classes.includes('bg-white') ? classes.replace('bg-white', '') : classes
    return href ? (
      <a 
        id={id} 
        href={href} 
        className={`${classesCopy} inline-block`} 
        onClick={onClick ? onClick : null} 
        target={href.includes('.pdf') ? '_blank' : target ? target : null}
        title={title}
        ref={refs}
      >
        {children}
      </a>
    ) : (
      <button
        id={id}
        type={type ? type : 'button'}
        role={type === 'button' ? 'button' : null}
        name={`${name ? name : null}`}
        disabled={disabled ? disabled : null}
        className={`${classesCopy}`}
        onClick={onClick ? onClick : null}
        onMouseEnter={onMouseEnter ? onMouseEnter : null}
        onMouseLeave={onMouseLeave ? onMouseLeave : null}
        aria-label={title}
        ref={refs}
      >
        {children}
      </button>
    )
  }
}

export namespace Button {
  export interface Props {
    id?: string;
    className?: string;
    colour?: string;
    target?: string;
    onClick?: any;
    onMouseEnter?: any;
    onMouseLeave?: any;
    href?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    name?: string;
    title: string;
    thin?: boolean;
    refs?: string;
  }
}

 