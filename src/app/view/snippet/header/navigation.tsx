import * as React from 'react'
import * as Snippets from 'snippets'
import { LinkList } from 'types'

export class Navigation extends React.PureComponent<Navigation.Props, Navigation.State> {
  private timer: any;
  private slider: any
  public constructor(props: Navigation.Props) {
    super(props)
    this.slider = React.createRef()
    this.state = {
      active: 0,
    }
  }

  public render(): JSX.Element {
    const { id, linklist } = this.props
    return (
      <nav
        id={id}
        className={`navigation ${this.props.className ? `${this.props.className} ` : ''} hidden xl:block flex items-center justify-center flex-grow w-full`}
        aria-label="Main menu"
      >
        {linklist && linklist.links ? (
          <div className={'w-full max-w-container mx-auto flex justify-center'}>
            {this.buildList(linklist.links, 0)}
          </div>
        ) : null}
      </nav>
    )
  }

  private buildList = (links: LinkList['links'], level: number, link?: any): JSX.Element => {
    const linkLists = []
    const linkCollections = []
    const linkLeftCol = []
    for (let l = 0; l < links.length; l += 1) {
      let obj: any = links[l]
      obj.heading = obj.title

      if (obj.heading.includes('[collection]')) {
        obj.heading = obj.heading.replace('[collection]', '')
        linkCollections.push(obj)
      } else if (obj.heading.includes('[bold]')) {
        linkLeftCol.push(obj)
      } else {
        linkLists.push(obj)
      }
    }

    if (level === 0) {
      return (
        <ul className={`flex level-${level} items-center content-center justify-start px-1-6`}>
          {this.buildItems(links, level + 1)}
        </ul>
      )
    } else if (level === 1) {
      return (
        <React.Fragment>
          <section className={'absolute inset-x-0 z-20 transition transition-delay opacity-0 group-hover:opacity-100 invisible group-hover:visible bg-white text-left'}>
            <div className={'pointer-events-none group-hover:pointer-events-auto border-t border-grey-border'}>
              <div className={'w-full max-w-container flex mx-auto'}>
                <div className={'flex px-6 pb-0-4 w-full'}>
                  <React.Fragment>
                    <div className={'flex w-full py-4'}>
                      {linkLeftCol.length > 0 ? <ul className={'pl-20 pt-0-4 relative z-10'} style={{paddingLeft: 212}}>
                        {linkLeftCol
                          .map((list: LinkList, i: number) => {
                            return (
                              <li
                                key={i}
                                onMouseEnter={() => this.setActive(list.links ? i : -1)}
                                onMouseLeave={() => clearTimeout(this.timer)}
                              >
                                {this.buildLink(list, level + 1)}
                              </li>
                            )
                          })}
                      </ul> : null}
                      {linkLists
                        ?.map((list: LinkList, i: number) => {
                          return (
                            <ul key={i} className={'pt-0-2 ml-0-3 mr-2 relative z-10 flex-1'}>
                              {this.buildLink(list, level + 1)}
                              {list?.links?.map(item => (
                                <li key={item?.handle}>
                                  {this.buildLink({...item, heading: item?.title}, level + 1)}
                                </li>
                              ))}
                            </ul>
                          )
                        })}
                      {linkCollections.length > 0 ? <div className={'pt-0-8 relative flex-1 z-0'}>
                        {this.buildImages(linkCollections)}
                      </div> : null}
                    </div>

                  </React.Fragment>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )
    } else if (level === 2) {
      return (
        <React.Fragment>
          {this.buildItems(links, level + 1)}
        </React.Fragment>
      )
    } else {
      return (
        <ul className={`hidden group-hover:flex level-${level}`}>
          {this.buildItems(links, level + 1)}
        </ul>
      )
    }
  }

  private buildItems = (links: LinkList['links'], level: number): JSX.Element[] => {
    const { navActive, navInactive } = this.props

    return links
      ? links.map((link: LinkList.Item, i: number) => {
        const children: boolean = (link.links && link.links.length > 0)

        return level === 2 ? (
          <ul key={i} className={'inline-block w-full'}>
            <li>{this.buildLink(link, level)}</li>
            {children && this.buildList(link.links, level)}
          </ul>
        ) : level == 1 ? (
          <li key={i} className={'group text-center'} onMouseEnter={navActive} onMouseLeave={navInactive}>
            {this.buildLink(link, level)}
            {children && this.buildList(link.links, level, links[i])}
          </li>
        ) : (
          <li key={i}>
            {this.buildLink(link, level)}
            {children && this.buildList(link.links, level, links[i])}
          </li>
        )
      })
      : []
  }

  private buildLink = (link: any, level: number, arrow?: boolean): JSX.Element => {
    const left: boolean = link.title.includes('[bold]') || link.title.includes('[heading]')
    link.heading = link.heading.replace('[bold]', '').replace('[heading]', '')

    const classNames = []
    if (link.handle === 'warehouse-sale') {
      classNames.push('text-red')
    }

    const levels: any = {
      1: (
        <a
          href={link.url}
          title={link.heading}
          aria-label={link.heading}
          role={'link'}
          className={`flex items-center h-4-2 pb-2 px-1 xl:px-1 1xl:px-1-3 2xl:px-1-6 no-underline ${classNames}`}
        >
          <Snippets.Heading size={'h5'} tag={'p'}>{link.heading}</Snippets.Heading>
        </a>
      ),
      2: (
        <a
          href={link.url}
          title={link.heading}
          aria-label={link.heading}
          role={'link'}
          className={`text-black flex items-center transition-fast py-0-4 no-underline hover:bg-grey-200 ${classNames}`}
        >
          <Snippets.Heading className={'inline-block align-middle'} size={left ? 'h5': 'h4'} tag={'p'}>{link.heading}</Snippets.Heading>
        </a>
      ),
      3: (
        <a
          href={link.url}
          title={link.heading}
          aria-label={link.heading}
          role={'link'}
          className={`inline-block text-base transition-fast ${
            arrow ? 'transform-group-arrow' : 'hover-border'
          } tracking-normal leading-tightest text-black no-underline pb-0-4`}
        >
          <span className={`inline-block align-middle${left ? ' text-red' : ''} ${classNames}`}>
            {link.heading}
          </span>
          {arrow ? (
            <span className={'inline-block align-middle ml-1-3-5 transform-arrow'}>
              <Snippets.Icon name={'chevron_right'} width={16} />
            </span>
          ) : null}
        </a>
      )
    }

    return levels[level]
  }

  private buildImages = (linkCollections: any[]) => {
    return (
      <div className={'flex justify-end'}>
        {linkCollections.map(item => (
          <a key={`${item.heading}`} className={'relative ml-2-4 block'} href={item.url} style={{ width: 221 }}>
            <div className={'pl-1-2 pr-3-6 2xl:px-3-6 2xl:pr-6 absolute inset-x-0 z-20 top-50'} style={{transform: 'translateY(-20px)'}}>
              <p className={'font-mono break-words text-center text-white text-xl 2xl:text-2xl'}>{item.heading}</p>
            </div>
            {item.object && item.object.image ? <Snippets.Image title={item.heading} alt={item.heading} src={item.object.image} ratio={'3:4'} preventLazy={true} /> : null}
          </a>
        ))}
      </div>
    )

    const sliderSettings: any = {
      arrows: true,
      adaptiveHeight: false,
      variableWidth: false,
      autoplay: false,
      autoplaySpeed: 4000,
      centerPadding: '50px',
      infinite: false,
      pauseOnHover: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 3,
      centerMode: false,
      speed: 500,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          }
        }
      ]
    }
  }

  private setActive = (index: number): void => {
    this.timer = setTimeout(() => {
      this.setState({
        active: index
      })
    }, 300)
  }

}

export namespace Navigation {
  export interface Props {
    linklist: any;
    id: string;
    className?: string;
    navActive: () => void;
    navInactive: () => void;
  }
  export interface State {
    active: number;
  }
}
