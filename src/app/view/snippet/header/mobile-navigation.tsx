import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { LinkList } from 'types'
import * as Snippets from 'snippets'
import { Animate } from 'react-show'

export class MobileNavigation extends React.PureComponent<MobileNavigation.Props, MobileNavigation.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: MobileNavigation.Props) {
    super(props)
    this.state = {
      activeLinks: []
    }
  }

  public render(): JSX.Element {
    const { linklist, visible } = this.props
    return (
      <div className={`mobile-navigation ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'} transition transition-delay`}>
        <div className={`${visible ? 'fixed inset-0' : 'hidden'}`} style={{ top: this.context.state.initialHeight }}>
          <nav
            className={'xl:hidden z-20 absolute inset-0'}
            aria-label="mobile main menu"
          >
            <div className={'relative w-full h-full overflow-auto xs:max-w-mobile bg-white flex flex-col z-30 hide-scrollbar pb-6'}>
              <Snippets.GenderSelector className={'bg-black flex md:hidden z-40 h-4 min-h-4 items-center'} />
              {linklist && linklist.links ? (
                <div className={'transition-fast relative pt-1-7'}>
                  {this.buildList(linklist.links, 0)}
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    )
  }

  private buildList = (links: LinkList[], level: number): JSX.Element => {
    const linkCollections = []
    const linkLists = []
    for (let l = 0; l < links.length; l += 1) {
      let obj: any = links[l]
      obj.heading = obj.title
      if (obj.heading.includes('[collection]')) {
        obj.heading = obj.heading.replace('[collection]', '')
        linkCollections.push(obj)
      } else {
        linkLists.push(obj)
      }
    }
    return (<React.Fragment>
      {linkLists.map((link: LinkList, i: number) => {
        const classNames = [];
        if (link.handle === "warehouse-sale") {
          classNames.push("text-red");
        }
        return (
          <div
            key={i}
            className={'w-full px-1-6 py-0-8'}
          >
            <div
              className={'cursor-pointer relative'}
              onClick={() => this.toggleList(i)}
            >
              {link?.links?.length ? (
                <Snippets.Heading className={classNames.join(" ")} size={'h5'} tag={'p'}>{link.title}</Snippets.Heading>
              ) : (
                <a href={link.url} title={link.title} className={'block no-underline text-left text-xs font-bold tracking-wide uppercase leading-tight font-sans'}>
                  {link.title}
                </a>
              )}
              {link.links && link.links.length > 0 && <div className={'absolute top-0 right-0 flex items-center'}>
                <Snippets.Icon 
                  name={'plus'}
                  width={14}
                  className={`absolute top-5 right-13 ${this.state.activeLinks.indexOf(i) < 0 ? 'opacity-100' : 'opacity-0'}`}
                />
                <Snippets.Icon name={'minus'} width={14} className={`absolute top-5 right-13 ${this.state.activeLinks.indexOf(i) >= 0 ? 'opacity-100' : 'opacity-0'}`} />
              </div>}
            </div>
            <div className={'block'}>
              <Animate
                show={this.state.activeLinks.indexOf(i) >= 0}
                transitionOnMount
                stayMounted
                style={{
                  height: 'auto',
                  display: 'block',
                  overflow: 'hidden'
                }}
                start={{
                  height: 0,
                  display: 'block'
                }}
              >
                <ul className={`list-reset level-${level + 1} pt-1-7`}>
                  {link.url !== "#" ? (
                    <li className={`mb-1-2`}>
                      <a href={link.url} title={link.title} className={`level-${level + 1} no-underline`}>
                        <Snippets.Heading size={'h4'} tag={'p'} className={'leading-tight'}>
                          {"View all"}
                        </Snippets.Heading>
                      </a>
                    </li>
                  ) : null}
                  {this.buildItems(link.links, level + 1)}
                </ul>
              </Animate>
            </div>
          </div>
        )
      })}
      {linkCollections && linkCollections.length ? <div className={'mt-1-3'}>
        <Snippets.Heading size={'h5'} tag={'p'} className={'pl-1-6 mb-1-2'}>Collections</Snippets.Heading>
        {this.buildSlider(linkCollections)}
      </div> : null}
    </React.Fragment>)
  };

  private buildItems = (links: any[], level: number): JSX.Element[] => {
    return links
      ? links.map((link: any, i: number) => {
          const classNames = [];
          if (link.handle === "warehouse-sale") {
            classNames.push("text-red");
          }
          
        return (
          <li key={i} className={`mb-1-2`}>
            <a href={link.url} title={link.title} className={`level-${level} no-underline ${classNames}`}>
              <Snippets.Heading size={'h4'} tag={'p'} className={'leading-tight'}>{link.title}</Snippets.Heading>
            </a>
          </li>
        )
      })
      : []
  };

  private toggleList(index: any) {
    const { activeLinks: currentActice } = this.state
    const newActiveLinks = currentActice.indexOf(index) < 0 ? currentActice.concat([index]) : currentActice.filter(item => item !== index)
    this.setState({ activeLinks: newActiveLinks })
  }


  private buildSlider = (linkCollections: any[]) => {
    const ArrowLeft=(props) => {
      const { className, style, onClick } = props;
      return (
        <button className={className} style={{ ...style, display: "block" }} onClick={onClick}>
          <Snippets.Icon name={'chevron_left'} width={18} />
        </button>
      );
    }

    const ArrowRight=(props) =>{
      const { className, style, onClick } = props;
      return (
        <button className={className} style={{ ...style, display: "block" }} onClick={onClick}>
          <Snippets.Icon name={'chevron_right'} width={18} />
        </button>
      );
    }
    const sliderSettings: any = {
      arrows: true,
      centerPadding: '50px',
      nextArrow: <ArrowRight />,
      prevArrow: <ArrowLeft />,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      centerMode: true,
    }
    return <Snippets.Slider settings={{ ...sliderSettings }}>{linkCollections.map(link => this.buildSliderItem(link))}</Snippets.Slider>
  }

  private buildSliderItem = (item: any) => {
    return (
      <a key={`${item.url}+${item.heading}`} className={'relative mr-1-6'} href={item.url} draggable={false}>
        <div className={'px-2-4 absolute inset-0 z-20 flex items-center justify-center'}>
          <Snippets.Heading className={'break-words text-center text-white leading-none'} size={'h1'} tag={'p'}>{item.heading}</Snippets.Heading>
        </div>
        {item.object && <div style={{ paddingBottom: '125%' }}>
          <img src={item.object.image} alt={item.heading} className={'object-cover object-center inset-0 absolute w-full h-full pr-1-6'} />
        </div>}
      </a>
    )
  }
}

export namespace MobileNavigation {
  export interface Props {
    toggleMobileNav: () => void;
    linklist: any;
    id: string;
    visible: boolean;
  }
  export interface State {
    activeLinks: any[];
  }
}
