import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class PasswordTemplate extends React.Component<PasswordTemplate.Props, PasswordTemplate.State> {
  private form = this.props.data.form.storefront_password;
  private passwordField = React.createRef<HTMLInputElement>();

  public constructor(props: PasswordTemplate.Props) {
    super(props)
    this.state = {
      errors: this.form.errors.length > 0,
      popupVisible: this.form.errors.length > 0
    }

    this.handlePopup = this.handlePopup.bind(this)
    this.focusPassword = this.focusPassword.bind(this)
  }

  public handlePopup(state: string): void {
    event.preventDefault()
    state == 'show' ? this.setState({ popupVisible: true }) : this.setState({ popupVisible: false })
  }

  private focusPassword() {
    this.passwordField.current.focus()
  }

  public render(): JSX.Element {
    return (
      <Layouts.Password {...this.props}>
        <main className={'h-100vh w-full bg-grey overflow-hidden'}>
          <div
            className={`flex flex-col h-100vh w-full align-center justify-center ${
              this.state.popupVisible ? 'invisible translate-y:-200 transition' : 'visible translate-y:0 transition-slow'
            }`}
          >            
            <div className={'w-full max-w-lg py-4-2 px-2 mx-auto text-center animation-ease-up text-black'}>
              <Snippets.Logo
                alt={this.props.data.shop.name}
                className={'w-full md:w-40 mx-auto mb-2-4'}
                version={'logo_woman'}
              />
              <Snippets.Heading tag="h6" size="h2" className="mb-1-6">
                OUR SITE IS TEMPORARILY DOWN FOR MAINTENANCE
              </Snippets.Heading>
              <Snippets.Heading tag="h6" size="h3" className="mb-1-6">
                Please check back soon
              </Snippets.Heading>
              <Snippets.SocialIcons
                {...this.props}
                enabled={true}
                settings={this.props.data.settings}
                title={'Follow us'}
                className={'mt-5'}
              />
              <a href="#" className={'mt-5 text-sm hidden'} onClick={() => this.handlePopup('show')}>
                {'Enter using password'}
              </a>
            </div>
          </div>
        </main>

        <Snippets.PasswordPopup
          {...this.props}
          errors={this.state.errors}
          focusPassword={this.focusPassword}
          form={this.form}
          handlePopup={this.handlePopup}
          passwordField={this.passwordField}
          visible={this.state.popupVisible}
        />
      </Layouts.Password>
    )
  }
}

export namespace PasswordTemplate {
  export interface Props extends GlobalProps {}
  export interface State {
    errors: boolean;
    popupVisible: boolean;
  }
}
