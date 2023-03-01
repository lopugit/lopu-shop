import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'

export class USP extends React.PureComponent<USP.Props, USP.State> {
  public static sectionId = 'usp';

  public constructor(props: USP.Props) {
    super(props)
  }
  
  public render(): JSX.Element {
    const { settings, blocks } = this.props.section
    
    return (
      <section className={`pt-4 lg:pb-3-6 ${settings.background ? 'bg-grey' : '' }`} aria-label="unique selling points">
        <div className={'max-w-8xl mx-auto text-center px-2-2 2xl:px-22 xl:px-2-8'}>
          <ul
            className={'flex flex-wrap w-full'}
          >
            {this.buildItems(blocks)}
          </ul>
        </div>
      </section>
    )
  }

  private buildItems = (blocks: any[]): JSX.Element[] => {
    return blocks
      ? blocks.map((block: any, i: number) => {
        const { icon, title, linkurl, content, mobilecontent } = block.settings
        return (
          <li key={i} className={'w-1/2 lg:w-1/4 flex-grow px-1 lg:mb-0 sm:mb-4 mb-3-4 flex justify-center'}>
            <div className={'relative flex flex-col text-center justify-center items-center'}>
              {linkurl ? 
                <Snippets.Link href={linkurl} className={'absolute inset-0'} title={title}/>
                : null}
              <Snippets.Icon name={icon} width={24} className={'block mb-2-4'} label={title}/>
              {title ?
                <Snippets.Heading 
                  tag={'h6'}
                  className={'font-bold text-xs tracking-wide uppercase mb-0-4'}
                >
                  {title}
                </Snippets.Heading>
                : null
              }
              {content ?
                <Snippets.Heading 
                  tag={'p'}
                  className={`tracking-normal text-base ${mobilecontent ? 'hidden md:block': ''}`}
                >
                  {content}
                </Snippets.Heading>
                : null
              }
            </div>
          </li>
        )
      })
      : []
  };
}


export namespace USP {
  export type Options = ShopifyNext.Section<{
    background: string;
  }>;
  export interface Props extends GlobalProps {
    section: USP.Options;
  }
  export interface State {}
}
