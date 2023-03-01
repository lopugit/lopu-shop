import { ShopifyNext } from '@dotdev/next-components'
import * as React from 'react'
import * as Snippets from 'snippets'

export class PageNavigation extends React.PureComponent<PageNavigation.Props, PageNavigation.State> {
  public constructor(props: any) {
    super(props)

    this.state = { showAll: false }
  }

  public render(): JSX.Element {
    return (
      <section className={'section-container mx-auto py-0 '}>
        <div
          id={'page'}
          className={'mx-auto md:border-t flex items-center content-center justify-center pt-0-5 pb-2-8 md:py-0-5 px-1-2 md:px-0'}
          aria-label="page navigation"
        >
          <ul className={'list-reset md:flex  w-full md:w-auto px-1-2 border md:border-0'}>
            {this.props.linklist && this.props.linklist.links ? this.buildItems(this.props.linklist.links) : null}
          </ul>
        </div>
      </section>
    )
  }

  private buildItems = (links: any[]): JSX.Element[] => {
    return links
      ? links.map((link: any, i: number) => {
        return (
          <li key={i} className={`my-0 w-full md:w-auto ${link.secondary ? 'md:ml-auto' : ''}`}>
            <a
              href={link.url}
              title={link.title}
              className={`py-0-8 px-2 text-lg font-medium ${link.secondary ? 'text-dark' : ' text-black md:text-black transition'} ${
                link.active ? 'no-underline font-semibold' : 'no-underline'
              } hidden md:inline-block`}
            >
              {link.title}
            </a>
            {link.active ? (
              <a
                title={link.title}
                onClick={() => this.toggleOtherTabs()}
                className={
                  'flex w-full py-1-2 md:w-auto justify-between align-center md:block md:hidden no-underline font-semibold w-full text-black md:text-black cursor-pointer text-sm md:text-base'
                }
              >
                <span>{link.title}</span>
                
              </a>
            ) : (
              <a
                href={link.url}
                title={link.title}
                className={` md:hidden py-1-2 no-underline w-full text-black md:text-black text-sm md:text-base ${
                  this.state.showAll ? 'block' : 'hidden'
                }`}
              >
                {link.title}
               
              </a>
            )}
          </li>
        )
      })
      : []
  };

  private toggleOtherTabs = (): void => {
    this.setState({
      showAll: !this.state.showAll
    })
  };
}

export namespace PageNavigation {
  export interface Props {
    linklist: any;
  }
  export interface State {
    showAll: boolean;
  }
}
