import * as React from 'react'
import * as Snippets from 'snippets'
import { Animate } from 'react-show'

export class FooterLinks extends React.Component<FooterLinks.Props, FooterLinks.State> {
  constructor(props: FooterLinks.Props) {
    super(props)
    props.linklist.links.map((link: any) => (link.showOnMobile = false))
    this.state = { activeLinks: [] }
  }

  public render(): JSX.Element {
    const { linklist } = this.props

    return (
      <div id={linklist.handle} className={'block: sm:flex text-left'} aria-label="footer menu">
        {this.buildList(linklist.links, 0)}
      </div>
    )
  }

  private buildList = (links: any[], level: number): JSX.Element[] => {
    const linksLength = links.length
    return links
      ? links.map((link: any, i: number) => {
        const count = i + 1
        return (
          <div 
            key={i} 
            className={`flex-1 sm:pb-0 pb-3 ${linksLength != count ? 'lg:mr-4' : '' } bg-grey-100 ${i !== 0 ? '' : 'pl-0 lg:pl-0'}`}
          >
            <div 
              className={'text-xs font-bold tracking-wide uppercase mb-1 lg:pt-0 cursor-pointer lg:cursor-default relative'} 
              onClick={() => this.toggleList(i)}
            >
              {link.url && link.url !== '#' ? (
                <a href={link.url} title={link.title} className={'no-underline'}>
                  {link.title}
                </a>
              ) : (
                <p className={'text-black no-underline font-semibold text-ssm'}>
                  {link.title}
                </p>
              )}
              <div className={'absolute right-0 inset-y-0 sm:hidden flex items-center'}>
                <Snippets.Icon name={'plus'} width={14} className={`absolute right-0 mr-1-2 inset-y-0 ${this.state.activeLinks.indexOf(i)} ${this.state.activeLinks.indexOf(i) < 0 ? 'opacity-100' : 'opacity-0'}`}/>
                <Snippets.Icon name={'minus'} width={14} className={`absolute right-0 mr-1-2 inset-y-0 ${this.state.activeLinks.indexOf(i) >= 0 ? 'opacity-100' : 'opacity-0'}`}/>
              </div>
            </div>
            <div className={'block sm:hidden'}>
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
                <ul className={`list-reset level-${level}`}>{this.buildItems(link.links, level + 1)}</ul>
              </Animate>
            </div>
            
            <ul className={`list-reset level-${level} sm:block hidden`}>{this.buildItems(link.links, level + 1)}</ul>
          </div>
        )
      })
      : []
  };

  private buildItems = (links: any[], level: number): JSX.Element[] => {
    return links
      ? links.map((link: any, i: number) => {
        return (
          <li key={i} className={'mb-0 py-0-4 sm:py-0'}>
            <a href={link.url} title={link.title} className={`level-${level} no-underline hover:underline text-base font-mono`}>
              {link.title}
            </a>
          </li>
        )
      })
      : []
  };

  private toggleList(index: any) {
    let currentActice = this.state.activeLinks
    currentActice.indexOf(index) < 0 ? currentActice.push(index) : currentActice.splice(currentActice.indexOf(index), 1)
    this.setState({ activeLinks: currentActice })
  }
}

export namespace FooterLinks {
  export interface Props {
    linklist: any;
  }
  export interface State {
    activeLinks: any[];
  }
}
