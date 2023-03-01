import * as React from 'react'
export class Input extends React.PureComponent<Input.Props, Input.State> {
  private styles = {
    field: {
      default: 'font-base max-w-full transition-fast',
      element:
        'block relative w-full h-full text-base text-inherit transition-fast outline-none focus:outline-none focus:shadow-none px-1-6',
      label: 'block absolute top-0 inset-x-0 px-1-6 text-left transition-fast pointer-events-none',
      positive: {
        default: '',
        element: 'text-black bg-transparent border-transparent',
        label: {
          error: 'text-error',
          default: 'text-black opacity-50'
        }
      },
      negative: {
        default: '',
        element: '',
        label: 'text-black opacity-50'
      }
    },
    search: {
      default: 'font-base max-w-full transition-fast',
      element:
        'block relative w-full h-full px-0 font-serif text-lg text-inherit border-b transition-fast bg-transparent outline-none focus:outline-none focus:shadow-none',
      label: '',
      positive: {
        default: '',
        element: '',
        label: ''
      },
      negative: {
        default: '',
        element: '',
        label: ''
      }
    }
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      focussed: false,
      value: props.value ? props.value : '',
      showPassword: false,
      validate: true,
      validationMessage: ''
    }
  }

  private checkValidate = (event) => {
    this.setState({
      validate: event.target.checkValidity(),
      validationMessage: event.target.validationMessage
    })
  }

  private handleOnBlur = (event) => {
    if(this.props.onBlur) this.props.onBlur(event)
    if(!this.props.willNotCheckValidation) this.checkValidate(event)
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: event.target.value
    })
    this.props.onChange ? this.props.onChange(event) : null
  }
  private togglePassword() {
    this.setState((prevState) => {
      return {
        showPassword: !prevState.showPassword
      }
    })
  }
  public render(): JSX.Element {
    const {
      autoCapitalize,
      autoCorrect,
      autoFocus,
      children,
      className,
      disabled,
      hideLabel,
      id,
      name,
      onFocus,
      placeholder,
      reference,
      required,
      reverse,
      style,
      type,
      value,
      pattern,
      label,
      maxLength,
    } = this.props
    const scheme = style && this.styles[style] ? this.styles[style] : this.styles[type] ? this.styles[type] : this.styles['field']
    const state = reverse ? 'negative' : 'positive'
    const colours = scheme[state]
    const classes = `transition-fast ${disabled ? 'pointer-events-none opacity-20' : 'cursor-pointer'} ${scheme.default} ${
      colours.default
    }${className ? ` ${className}` : ''}`
    const element =
      type === 'text' || type === 'email' || type === 'password' || type === 'search' || type === 'tel' || type === 'number' ? (
        <input
          type={type === 'password' && this.state.showPassword ? 'text' : type}
          id={id ? id : name}
          name={name ? name : null}
          className={`${scheme.element} ${colours.element}${!this.state.validate ? 'border-error focus:border-error' : ''} pt-1-2 pb-1-3 ${type == 'password' ? ' tracking-password' : ''}`}
          placeholder={required ? `${placeholder}*` : placeholder}
          onBlur={this.handleOnBlur}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
          onFocus={onFocus ? (event) => onFocus(event) : null}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'yes'}
          autoCorrect={autoCorrect ? autoCorrect : 'yes'}
          autoFocus={autoFocus}
          required={required ? required : null}
          ref={reference ? reference : null}
          value={value}
          pattern={pattern}
          maxLength={maxLength}
        />
      ) : (
        <div />
      )
    return (
      <div className={'inline-block w-full'}>
        <div className={`relative w-full text-grey bg-white ${this.state.validate? classes : classes.replace(/mb-[0-9].*[0-9]\s/, '')} ${!this.state.validate ? 'border-error focus:border-error' : ''}`}>
            <label
              htmlFor={id ? id : name}
              className={`z-10 ${scheme.label} ${colours.label[this.state.validationMessage ? 'error' : 'default']} opacity-50 ${
                this.state.value !== '' ? hideLabel ? 'hidden' : 'text-xs mt-0-2' : 'text-base mt-1-2'
              } ${hideLabel ? "visually-hidden" : ""}`}
            >
              {label || placeholder}
            </label>
          {element}
          {type === 'password' && (
            <div
              onClick={() => this.togglePassword()}
              className={'cursor-pointer absolute right-0 inset-y-0 flex items-center px-2'}>
            </div>
          )}
          {children}
        </div>
        {!this.state.validate ? (
          <span className={'text-base pt-0-5 py-0-8 text-error text-left w-full inline-block'}>
            {this.state.validationMessage}
          </span>
        ) : null}
      </div>
    )
  }

  componentDidUpdate(prevProps: Input.Props) {
    this.setState((prevState) => {
      if (this.props.value !== prevState.value && this.props.value !== prevProps.value) {
        return {
          value: prevProps.value ? prevProps.value : this.state.value
        }
      }
    })
  }

}

export namespace Input {
  export interface Props {
    autoCapitalize?: string;
    autoCorrect?: string;
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    hideLabel?: boolean;
    name?: string;
    onBlur?: any;
    onChange?: any;
    onFocus?: any;
    placeholder?: string;
    reference?: string;
    required?: boolean;
    reverse?: boolean;
    style?: string;
    type?: string;
    value?: string;
    pattern?: string;
    willNotCheckValidation?:boolean;
    label?: string;
    maxLength?: number;
  }
  export interface State {
    focussed: boolean;
    value: string;
    showPassword: boolean;
    validate: boolean;
    validationMessage: any;
  }
}
