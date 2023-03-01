import * as React from 'react'
import axios from 'axios'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
declare const STOREFRONT_NAME: string

export class PopupGeoRedirecion extends React.PureComponent<PopupGeoRedirecion.Props, PopupGeoRedirecion.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: PopupGeoRedirecion.Props) {
    super(props)
    this.state = {
      customerCurrentCountry: '',
      redirectionStoreName: '',
      redirectionStoreUrl: '',
      ip: ''
    }
  }

  public async componentDidMount() {
    const { data: { country_code_iso3: customerCountryCode, country_name: customerCountryName, ip } } = await axios.get('https://ipapi.co/json/')

    this.setState({
      ip: ip
    })
    const { section, handleGeoRedirectionPopup } = this.props

    const usCountries = section.blocks.filter(block => block.type === 'us').map(block => block.settings)
    const auCountries = section.blocks.filter(block => block.type === 'au').map(block => block.settings)

    if (STOREFRONT_NAME === 'lopu-shop') {
      if (usCountries.some(country => country.title === customerCountryCode)) {
        this.setState({
          redirectionStoreName: 'US',
          customerCurrentCountry: customerCountryName,
          redirectionStoreUrl: section.settings.usurl,
        })
        if (!ShopifyNext.Utils.getLocalStorage('theme:geoRedirection') || (ShopifyNext.Utils.getLocalStorage('theme:ip') !== this.state.ip)) {
          handleGeoRedirectionPopup(true)
        }
      }
    }

    if (STOREFRONT_NAME == 'lopu-shop') {
      if (auCountries.some(country => country.title === customerCountryCode)) {
        this.setState({
          redirectionStoreName: 'AU',
          customerCurrentCountry: customerCountryName,
          redirectionStoreUrl: section.settings.auurl,
        })
        if (!ShopifyNext.Utils.getLocalStorage('theme:geoRedirection') || (ShopifyNext.Utils.getLocalStorage('theme:ip') !== this.state.ip)) {
          handleGeoRedirectionPopup(true)
        }
      }
    }
  }

  public handleClose = () => {
    this.props.handleGeoRedirectionPopup(false)
    ShopifyNext.Utils.setLocalStorage('theme:geoRedirection', 'popped')
    ShopifyNext.Utils.setLocalStorage('theme:ip', this.state.ip)
  }

  public render(): JSX.Element {
    const { section, geoRedirectionPopup } = this.props
    const { customerCurrentCountry, redirectionStoreName, redirectionStoreUrl } = this.state
    return <div className={`fixed inset-0 z-40 items-center md:items-start justify-center ${geoRedirectionPopup ? 'flex' : 'hidden'}`} role="dialog">
      <div className={'cursor-pointer absolute bg-black opacity-50 inset-0 z-40'} onClick={this.handleClose} />
      <div className={'w-full mx-3-2 md:mt-25-5 md:max-w-popup z-50'}>
        <div className={'bg-white relative w-full'}>
          <div className={'absolute right-0 top-0 h-4 w-4 flex items-center justify-center'}>
            <Snippets.Button
              colour={'blank'}
              className={'underline'}
              type={'button'}
              onClick={this.handleClose}
              title={'Close popup'}
            >
              <Snippets.Icon name={'cross'} height={14} width={14} />
            </Snippets.Button>
          </div>

          <div className={'w-full py-3-6 md:py-8-8 px-2-1 md:px-12'}>
            <div className={'w-full pt-2 pb-2-8 md:pt-0 pb-0 flex flex-col justify-center items-center text-center'}>
              <Snippets.Heading
                size={window.innerWidth < 768 ? 'h2' : 'h1'}
                tag={'p'}
                className={'mb-1-6 md:mb-2-4'}
              >
                {section.settings.title}
              </Snippets.Heading>
              <Snippets.Heading
                size={'h2'}
                tag={'p'}
                className={'flex-1'}
              >
                {section.settings.message.replace('{location}', customerCurrentCountry)}
              </Snippets.Heading>
            </div>
            <div className={'flex flex-col md:flex-row w-full mt-2-4'}>
              <div className={'flex-1 p-0-8'}>
                <Snippets.Button
                  title={'Log In'}
                  className={'w-full h-5-6 py-0-8 flex items-center justify-between bg-black text-white hover:bg-white hover:text-black border border-white hover:border-black px-1-6'}
                  colour={'blank'}
                  href={redirectionStoreUrl}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>Visit {redirectionStoreName} store</Snippets.Heading>
                  <Snippets.Icon width={18} name={'chevron_right'} />
                </Snippets.Button>
              </div>
              <div className={'flex-1 p-0-8'}>
                <Snippets.Button
                  title={'Register'}
                  className={'w-full h-5-6 py-0-8 flex items-center justify-between bg-white text-black hover:bg-black hover:text-white border border-black hover:border-white px-1-6'}
                  colour={'blank'}
                  onClick={this.handleClose}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>Keep shopping</Snippets.Heading>
                  <Snippets.Icon width={18} name={'chevron_right'} />
                </Snippets.Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export namespace PopupGeoRedirecion {
  export type Options = ShopifyNext.Section<{
    georedirection: boolean;
    title: string;
    message: string;
    euurl: string,
    auurl: string,
    usurl: string
  }>;

  export interface Props {
    section: PopupGeoRedirecion.Options;
    geoRedirectionPopup: boolean;
    handleGeoRedirectionPopup: (isActive: boolean) => void
  }
  export interface State {
    customerCurrentCountry: string;
    redirectionStoreName: string;
    redirectionStoreUrl: string;
    ip: string;
  }
}
