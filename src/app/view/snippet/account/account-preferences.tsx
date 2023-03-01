import * as React from 'react'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import axios from 'axios'

export class AccountPreferences extends React.Component<AccountPreferences.Props, AccountPreferences.State> {
  public constructor(props: any) {
    super(props)
    this.state = {
      acceptsMarketing: this.props.data.customer.accepts_marketing,
      updating: false,
      dirty: false,
    }
  }

  private toggleAcceptsMarketing = async () => {
    const url = `/apps/toolkit/client/helpers/customer/${this.props.data.customer.id}`
    const { acceptsMarketing } = this.state
    this.setState({
      updating: true,
      dirty: true
    })
    await axios.post(url, {
      accepts_marketing: (!acceptsMarketing).toString(),
    })
    this.setState(prevState => {
      return {
        acceptsMarketing: !prevState.acceptsMarketing,
        updating: false
      }
    })
    window.location.reload()
  }

  public render(): JSX.Element {
    return (
      <div className={'w-full'}>
        <Snippets.Heading size={'h3'} tag={'h1'} className={'hidden md:block  leading-close'}>
          {'preferences'}
        </Snippets.Heading>
        <Snippets.Heading size={'p'} tag={'p'} className={'w-full md:w-5/9 mt-3-2 md:mt-2-1 mb-1-6 leading-normal'}>
          {'I would like to receive communications from Lopu and be the first to hear about new arrivals, sale, news and promotions.'}
        </Snippets.Heading>
        <div className={'mt-1-6 mb-3-2 w-full'}>
          <div onClick={this.toggleAcceptsMarketing} className={'md:w-1/9 cursor-pointer flex items-center justify-start'}>
            <Snippets.Icon name={this.state.acceptsMarketing ? 'checkbox_yes' : 'checkbox_no'} width={24} />
            <Snippets.Heading size={'p'} tag={'p'} className={'ml-1-2'}>{this.state.updating ? 'Updating' : 'Subscribe'}</Snippets.Heading>
          </div>
        </div>

        {this.state.dirty && !this.state.updating ?<Snippets.Heading size={'h5'} tag={'p'} className={'w-full md:w-5/9 mt-3-2 md:mt-2-1 mb-1-6 leading-normal'}>
          {this.state.acceptsMarketing ? 'Subscribed successfully' : 'Unsubscribed successfully'}
        </Snippets.Heading> : null}
      </div>
    )
  }
}

export namespace AccountPreferences {
  export interface Props extends GlobalProps { }
  export interface State {
    acceptsMarketing: boolean;
    updating: boolean;
    dirty: boolean;
  }
}
