import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class Announcement extends React.PureComponent<Announcement.Props, Announcement.State> {
  public static sectionId = 'announcement';
  public static contextType = ShopifyNext.Context;

  public constructor(props: Announcement.Props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  public componentDidMount = () => {
    const { settings } = this.props.section
    window.addEventListener('scroll', this.handleScroll)
    this.context.update({
      annmoucement: settings.enabled && !(settings.index_only && this.props.data.template.name !== 'index')
    })
  }

  public componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  public render(): JSX.Element {
    const { settings, blocks } = this.props.section
    const { show} = this.state

    const enabled: any = settings.enabled && !(settings.index_only && this.props.data.template.name !== 'index')
    return blocks.length && enabled ? (
      <div id="announcement-section" className={'w-full bg-black'}>
        <div className={'w-full mx-auto max-w-container flex flex-row'}>
          <Snippets.GenderSelector className={'bg-transparent lg:absolute hidden md:flex z-50 h-4 items-center'} />
          <section className={'w-full h-4 announcement-bar transition-annoucement relative text-sm z-40 leading-none'}>
            {this.buildItems(this.props.section.blocks)}
          </section>
        </div>
      </div>
    ) : <Snippets.GenderSelector className={'bg-black hidden md:flex z-50 h-4 items-center'} />
  }

  private buildItems = (blocks: any[]): JSX.Element[] => {
    const maxWidth = window.innerWidth - 30
    return blocks
      ? blocks.map((block: any, i: number) => {
        const { title, linkurl } = block.settings
        return title ? linkurl ? (
          <Snippets.Link 
            href={linkurl}
            title={title} 
            key={i} 
            className={'text-white text-base font-light flex justify-center'}>
            <div
              className={'no-underline'}
            >
              <Helpers.Marquee style={{maxWidth: maxWidth}} className={'h-4 flex items-center'} hoverToStop loop text={window.innerWidth < 500 ? `${title}  ${title}` : title} />
            </div>
          </Snippets.Link>
        ) : (
          <div key={i} className={'text-white text-base font-light flex justify-center'}>
            <Helpers.Marquee style={{maxWidth: maxWidth}} className={'h-4 flex items-center'} hoverToStop loop text={window.innerWidth < 500 ? `${title}  ${title}` : title} />
          </div>
        ) : null
      })
      : []
  };

  private handleScroll = (): void => {
    this.setState((prevState) => {
      return window.scrollY > 40 ? (
        {
          ...prevState,
          show: false
        }
      ) : (
        {
          ...prevState,
          show: true
        }
      )
    })
  }
}

export namespace Announcement {
  export type Options = ShopifyNext.Section<{
    enabled: boolean;
    index_only: boolean;
  }>;
  export interface Props extends GlobalProps {
    section: Announcement.Options;
  }
  export interface State {
    show: boolean;
  }
}
