import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class SubscribeForm extends React.PureComponent<SubscribeForm.Props, SubscribeForm.State> {
  public constructor(props: SubscribeForm.Props) {
    super(props)
    this.state = {
      hoverButton: false
    }
  }
  public render(): JSX.Element {
    const { enabled, placeholder, submit, title, autoFocus, hideLabel }: any = this.props
    const form: any = this.props.data.form.customer
    return enabled ? (
      <section className={`${this.props.className ? ' ' + this.props.className : ''}`}>
        {title ? (
          <Snippets.Heading
            size={'h5'}
            tag={'p'}
            className={'mb-1-6'}
          >
            {title}
          </Snippets.Heading>
        ) : null}
        <ShopifyNext.Components.Forms data={{
          ...form,
          form: {
            ...form.form,
            id: "subscribe-popup-form",
            enctype: form.form.enctype || "application/x-www-form-urlencoded"
          }
        }} className={'block h-8 w-full relative'}>
          <label htmlFor="subscribe-form" className={"visually-hidden"}>{title || "Subscribe"}</label>
          <input
            id={"subscribe-form"}
            type="email"
            name="contact[email]"
            placeholder={
              form.errors.email
                ? `Email ${form.errors.email}`
                : placeholder
                  ? `${placeholder}*`
                  : 'Email Address*'
            }
            required
            autoFocus={autoFocus}
            className={'h-8 w-full text-black pt-1-2 pb-1-3 text-base outline-none focus:outline-none focus:shadow-none px-1-6'}
            disabled={form.posted_successfully}
          />
          <Snippets.Button
            title={submit ? submit : 'Subscribe'}
            type={'submit'}
            colour={'secondary-reverse'}
            className={'w-8 absolute h-8 top-0 right-0 flex justify-center items-center'}
            onMouseEnter={() => this.setState({ hoverButton: true })}
            onMouseLeave={() => this.setState({ hoverButton: false })}
            disabled={form.posted_successfully}
          >
            <span aria-hidden={true} className={`absolute inset-y-0 m-auto flex justify-center items-center transition text-black ${this.state.hoverButton ? 'translate-x:50' : ''}`}>
              <Snippets.Icon name={'chevron_right'} width={18} ariaHidden />
            </span>
          </Snippets.Button>
        </ShopifyNext.Components.Forms>
        {form.posted_successfully ? (
          <div className={'flex items-center text-left pt-0-8'}>
            <Snippets.Icon name={'valid'} width={20} />
            <Snippets.Heading
              size={'none'}
              tag={'p'}
              className={`ml-0-8 ${this.props.white ? 'text-white' : 'text-black'}`}
            >
              {'You have successfully subscribed. Stay tuned.'}
            </Snippets.Heading>
          </div>
        ) : null}
      </section>
    ) : (
      <section className={`${this.props.className ? ' ' + this.props.className : ''}`}>
        <div className={'block '}>
          {title ? (
            <Snippets.Heading
              size={'h5'}
              tag={'p'}
              className={'mb-1-6'}
            >
              {title}
            </Snippets.Heading>
          ) : null}

          <div className={'block flex relative bg-white'}>
            <div className={'h-8 w-full flex items-center'}>
              <div className={'flex-1 text-left pl-1-6 text-base opacity-50'}>Email Address</div>
            </div>

            <Snippets.Button
              title={'Subscribe'}
              type={'submit'}
              colour={'secondary-reverse'}
              className={'w-8 absolute h-8 right-0 flex justify-center items-center'}
              onMouseEnter={() => this.setState({ hoverButton: true })}
              onMouseLeave={() => this.setState({ hoverButton: false })}
            >
              <span className={`absolute inset-y-0 m-auto flex justify-center items-center transition text-black ${this.state.hoverButton ? 'translate-x:50' : ''}`}>
                <Snippets.Icon name={'chevron_right'} width={18} />
              </span>
              {/* {submit ? submit : 'Subscribe'} */}
            </Snippets.Button>
          </div>
        </div>
      </section>
    )
  }
}

export namespace SubscribeForm {
  export interface Props extends ShopifyNext.Props {
    enabled: boolean;
    submit?: string;
    placeholder?: string;
    title?: string;
    className?: string;
    white?: boolean;
    autoFocus?: boolean;
    hideLabel?: boolean;
  }
  export interface State {
    hoverButton: boolean;
  }
}
