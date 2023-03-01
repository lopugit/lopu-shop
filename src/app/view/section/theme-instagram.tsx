import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import instafeed from 'react-instafeed'
 
export class Instagram extends React.PureComponent<Instagram.Props, Instagram.State> {
  public static sectionId = 'instagram';
  
  public constructor(props: Instagram.Props) {
    super(props)
    this.state = {
      dataOptions: '',
      resolution: 'standard_resolution'
    }
  }

  public componentDidMount = async () => {
    const { settings } = this.props.section
    if(settings.show_instagram) {
      const options = {
        clientId: settings.client_id,
        accessToken: settings.instagram_access_token,
        get: 'user', // popular, user
        locationId: null,
        resolution: this.state.resolution, // thumbnail, low_resolution, standard_resolution
        sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
        tagName: null,
        limit: 10,
        userId: 1102624504,
      }
      const DataValues = await instafeed(options)
      this.setState({
        dataOptions: DataValues
      })
    }
  }
  
  public render(): JSX.Element {
    const { settings } = this.props.section
    if(!settings.show_instagram) {
      return null
    }
    const sliderSettings: any = {
      centerPadding: '30px',
      arrows: true,
      infinite: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 4,
      centerMode: true,
      prevArrow: (
        <button className={'outline-none'}>
          <span className={'hidden w-5-5 text-grey-100'}>
            <Snippets.Icon name={'chevron_left'} width={18} />
          </span>
        </button>
      ),
      nextArrow: (
        <button className={'outline-none'}>
          <span className={'block w-5-5 text-grey-100'}>
            <Snippets.Icon name={'chevron_right'} width={18} className={'text-black'}/>
          </span>
        </button>
      ),
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            arrows: false,
            centerPadding: '70px',
          }
        }
      ]
    }
    return (
      <div className={'theme-instagram'}>
        <Snippets.Slider settings={{ ...sliderSettings }}>
          {this.state.dataOptions.data && this.state.dataOptions.data.map(({ caption, id, images, tags }: any, index: number)=>{
            const image = images.standard_resolution.url
            return (
              <div key={index} className={'relative'}>
                <div className={'flex h-full justify-center items-center bg-cover bg-center'}>
                  <img className={'block w-full'} src={image} alt={caption.text || "instagram image"}/>
                </div>
              </div>
            )
          })}
            
        </Snippets.Slider>
      </div>
    )
  }

}


export namespace Instagram {
    export type Options = ShopifyNext.Section<{
      background: string;
      show_instagram: boolean;
      client_id: string;
      instagram_access_token: string;
    }>;
    export interface Props extends GlobalProps {
      section: Instagram.Options;
    }
    export interface State {
        dataOptions: any;
        resolution: string;
    }
  }
  