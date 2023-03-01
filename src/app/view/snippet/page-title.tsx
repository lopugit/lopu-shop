import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'

export class PageTitle extends React.PureComponent<PageTitle.Props> {
  public render(): JSX.Element {
    return this.props.title || this.props.content ? (
      <section className={'pb-2-8'}>
        {/* <div className={`${this.props.className ? this.props.className : "container mx-auto text-center"}`}> */}

        <div className={`${this.props.className ? this.props.className : 'section-container text-center px-1-2 md:px-3-2'}`}>
          <h1 className={'font-rounded font-medium text-black text-2xl'}>{this.props.title}</h1>
          {this.props.content ? (
            <p className={`${this.props.pClassName ? this.props.pClassName : 'mt-0-8 md:px-4 mx-auto max-w-md text-black leading-normal'}`}>
              {ShopifyNext.Utils.parseHTML(this.props.content)}
            </p>
          ) : null}
        </div>
      </section>
    ) : null
  }
}

export namespace PageTitle {
  export interface Props {
    title: string;
    content?: string;
    className?: string;
    pClassName?: string;
  }
}
