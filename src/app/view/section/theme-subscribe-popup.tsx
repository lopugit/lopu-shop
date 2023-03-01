import * as React from 'react'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { GlobalProps } from 'types'
import { ShopifyNext } from '@dotdev/next-components'

export class PopupSubscribe extends React.PureComponent<PopupSubscribe.Props, PopupSubscribe.State> {
  public constructor(props: PopupSubscribe.Props) {
    super(props)
    this.state = {
      value: '',
      checked: false,
      error: '',
      email: '',
      isEmailValidate: false
    }
  }

  private handleChecked = () => {
    this.setState(prevState => {
      return {
        checked: !prevState.checked,
        error: prevState.checked === false ? '' : prevState.error
      }
    })
  }

  private handleSubmit = (event): void => {
    const { error, checked, email } = this.state
    if(checked && !email && !error){
      this.setState({
        error: 'Please Enter your email'
      })
      event.preventDefault()
    }
    if(!checked) {
      this.setState({
        error: 'Please accept Terms and Conditions'
      })
      event.preventDefault()
    }
    if(error) {
      event.preventDefault()
    }
  }

  private handleEmailInput = (e) => {
    const { value } = e.target
    const isEmailValidate =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const error = isEmailValidate ? '' : value ? 'Please enter a valid email address' : ''
    this.setState({
      email: value,
      error: error,
      isEmailValidate
    })
  }

  public render(): JSX.Element {
    const { visible, toggleSubscribe, section } = this.props
    const form: any = this.props.data.form.customer
    return section.settings ? (
      <div className={`fixed inset-0 z-40 items-center md:items-start justify-center ${visible ? 'flex' : 'hidden'}`} role="dialog">
        <div className={'cursor-pointer absolute bg-black opacity-50 inset-0 z-40'} onClick={() => toggleSubscribe()} />
        <div className={'w-full mx-3-2 md:mt-25-5 md:max-w-popup z-50'}>
          <div className={'bg-white relative w-full'}>
            <div className={'absolute right-0 top-0 h-4 w-4 flex items-center justify-center'}>
              <Snippets.Button
                colour={'blank'}
                className={'underline'}
                type={'button'}
                onClick={toggleSubscribe}
                title={'Close popup'}
              >
                <Snippets.Icon name={'cross'} height={14} width={14} />
              </Snippets.Button>
            </div>

            <div className={'w-full py-3-6 md:py-8-8 px-2-1 md:px-15'}>

                {form.posted_successfully ? (
                  <div className={'w-full pt-2 pb-2-8 md:pt-0 pb-0 flex flex-col justify-center items-center text-center'}>
                    <Snippets.Heading
                      size={window.innerWidth < 768 ? 'h2' : 'h1'}
                      tag={'p'}
                      className={'mb-1-6 md:mb-2-4'}
                    >
                      {section.settings.success_title}
                    </Snippets.Heading>
                    <Snippets.Heading
                      size={'p'}
                      tag={'p'}
                      className={'flex-1'}
                    >
                      {section.settings.success_content}
                    </Snippets.Heading>
                  </div>
                ) : (
                  <div role='dialog' aria-labelledby='dialogTitle' aria-describedby="dialogDesc" className={'w-full pt-2 md:pt-0 md:pb-4 flex flex-col justify-center items-center text-center'}>
                    <Snippets.Heading
                      size={window.innerWidth < 768 ? 'h2' : 'h1'}
                      tag={'h2'}
                      id="dialogTitle"
                      className={'mb-1-6 md:mb-2-4'}
                    >
                      {section.settings.title}
                    </Snippets.Heading>
                    <Snippets.Heading
                      size={'p'}
                      tag={'p'}
                      id="dialogDesc"
                      className={'leading-normal mb-4'}
                    >
                      {section.settings.content}
                    </Snippets.Heading>
                    <div className={'flex flex-wrap max-w-sm'}>
                    <ShopifyNext.Components.Forms data={form} className={'block'}>
                      <div className={'w-full h-6 border border-grey-border flex items-center'}>
                        <Snippets.FormErrors form={form} />
                        <Snippets.Input
                          name="contact[email]"
                          id="popup_contact_form"
                          type="email"
                          placeholder="Email Address"
                          onBlur={(e) => this.handleEmailInput(e)}
                          required
                          label={section.settings.title}
                          hideLabel
                          willNotCheckValidation
                        />
                      </div>
                      <Snippets.Button
                        title={'Sign Up'}
                        className={`w-full py-0-8 flex items-center justify-between bg-black text-white px-1-6 ${this.state.error? 'mb-1': 'mb-2'}`}
                        type="submit"
                        colour={'blank'}
                        onClick={e => this.handleSubmit(e)}
                      >
                        <Snippets.Heading size={'h5'} tag={'p'}>Sign Up</Snippets.Heading>
                        <Snippets.Icon width={40} name={'chevron_right_reverse'} ariaHidden/>
                      </Snippets.Button>
                      </ShopifyNext.Components.Forms>
                      {this.state.error && <Snippets.Heading size={'h6'} tag={'p'} className={'w-full text-left text-error'}>{this.state.error}</Snippets.Heading>}

                      <div className={'text-left flex flex-row item-center'}>
                        <Snippets.Button
                          title={'Agree Terms and Conditions'}
                          className={'mr-1'}
                          colour={'blank'}
                          type={'button'}
                          onClick={this.handleChecked}
                        >
                          <div className={'border-half border-black h-1-6 w-1-6 relative z-50'}>
                            {this.state.checked &&
                              <Snippets.Icon className={'absolute z-40'} name={'checked'} height={13} width={13} ariaHidden></Snippets.Icon>}
                          </div>
                        </Snippets.Button>
                        <Snippets.Heading
                          size={'h6'}
                          tag={'p'}
                          className={'leading-loose'}
                        >
                          {'I accept the '}
                          <a href={Helpers.check(section, 'section.settings.terms') ? section.settings.terms : '/pages/our-policies'} className={'underline'}>
                            {'Terms and Conditions'}
                          </a>
                        </Snippets.Heading>
                      </div>
                    </div>
                  </div>
                )}

            </div>

          </div>
        </div>
      </div>
    ) : null
  }
}

export namespace PopupSubscribe {
  export type Options = ShopifyNext.Section<{}>;
  export interface Props extends GlobalProps {
    section: any;
    visible: boolean;
    toggleSubscribe: () => void;
  }
  export interface State {
    value: string;
    checked: boolean;
    error: string;
    email: string;
    isEmailValidate: boolean;
  }
}
