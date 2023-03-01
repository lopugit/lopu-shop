import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, GlobalState } from 'types'

export class Breadcrumbs extends React.PureComponent<Breadcrumbs.Props, Breadcrumbs.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: any) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <section className={`${this.props.className ? this.props.className : ''}`}>
        <ul className={'list-reset flex items-center justify-start text-xs font-medium'}>
          {this.buildItems(this.props.override ? this.props.override : this.props.data.breadcrumbs.links)}
        </ul>
      </section>
    )
  }

  private buildItems = (links: any[]): JSX.Element[] => {
    return links
      ? links.map((link: any, i: number) => {
        return (
          <React.Fragment key={i}>
            <li key={i} className={`block pr-0-8 ${this.props.white ? 'text-white' : 'text-grey-500'}`}>
              {i !== links.length - 1 ? (
                <a
                  href={link.url}
                  onClick={link.onClick}
                  title={link.title}
                  className={'text-base cursor-pointer block no-underline transition-fast font-mono'}
                >
                  {link.title}
                </a>
              ) : (
                <span className={'block font-mono text-base'}>{link.title}</span>
              )}
            </li>
            {i < links.length - 1 ? <li className={'block mr-0-8'}>/</li> : null}
          </React.Fragment>
        )
      })
      : []
  };
}

export namespace Breadcrumbs {
  export interface Props extends GlobalProps {
    override?: {}[];
    white?: boolean;
    className?: string;
  }
  export interface State extends GlobalState {}
}
