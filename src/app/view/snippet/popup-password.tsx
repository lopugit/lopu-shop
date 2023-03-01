import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class PasswordPopup extends React.PureComponent<PasswordPopup.Props, PasswordPopup.State> {
  public constructor(props: any) {
    super(props)

    this.state = {
      loading: false
    }
  }

  public componentDidUpdate() {
    setTimeout(() => this.props.focusPassword(), 500)
  }

  public render(): JSX.Element {
    const {form} = this.props

    return (
      <div
        className={`absolute inset-0 flex flex-col h-screen w-full align-center justify-center bg-grey text-black ${
          this.props.visible ? 'visible translate-y:0 transition-slow' : 'invisible translate-y:200 transition'
        }`}
      >
        <div className={`w-full max-w-md p-4-2 mx-auto text-center${this.state.loading ? ' opacity-50 pointer-events-none' : ''}`}>
          <Snippets.Heading 
            size={'h3'} 
            tag={'h1'} 
            className={'mb-2'}
          >
            {'Enter Storefront using password'}
          </Snippets.Heading>

          <ShopifyNext.Components.Forms data={form} className={'w-full'}>
            <div className={`w-full block md:flex${this.props.errors ? ' animation-errors' : ''}`}>
              <input
                type="password"
                name="password"
                placeholder={form.errors.form ? 'Please try again' : 'Storefront password'}
                autoCapitalize="no"
                autoCorrect="no"
                ref={this.props.passwordField}
                className={`${
                  form.errors.form ? 'border-red' : 'border-grey-border'
                } w-full px-2 py-0 h-4-6 w-full border transition-fast focus:outline-none focus:shadow-none rounded-none`}
              />
              <Snippets.Button
                type="submit"
                name="commit"
                title="Submit password"
                colour={'blank'}
                className={'ml-1-2'}
                onClick={() => this.handleClick()}
              >
                <Snippets.Icon name={'chevron_right'} width={28} className={'inline-block align-middle'} />
              </Snippets.Button>
            </div>

            <Snippets.FormErrors form={form} />

            <a
              href="#"
              className={'inline-block md:hidden mt-4-2 md:mt-7-5 text-sm leading-looser'}
              onClick={() => this.props.handlePopup('hide')}
            >
              Cancel
            </a>
          </ShopifyNext.Components.Forms>
        </div>

        <div
          className={'absolute inset-y-0 right-0 mr-6 mt-6 cursor-pointer hidden md:block group-transition-scale'}
          onClick={() => this.props.handlePopup('hide')}
        >
          <Snippets.Icon name={'cross'} width={30} height={30} className={'block transition-scale'} />
        </div>
      </div>
    )
  }

  private handleClick() {
    this.setState({
      loading: true
    })
  }
}

export namespace PasswordPopup {
  export interface Props extends ShopifyNext.Props {
    className?: string;
    errors: boolean;
    focusPassword: any;
    form: any;
    handlePopup: any;
    passwordField: any;
    visible?: boolean;
  }
  export interface State {
    loading: boolean;
  }
}
