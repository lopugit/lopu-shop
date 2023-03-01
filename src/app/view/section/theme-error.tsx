import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'

export class Error extends React.PureComponent<Error.Props, Error.State> {
  public render(): JSX.Element {
    const { settings, blocks } = this.props.section
    return (
      <section className={'py-12 text-center'}>
        <div className={'w-full max-w-container mx-auto my-5 px-1-2 md:px-3-2'}>
          <h2 className={'font-rounded text-2xl font-normal text-black mb-3'}>{settings.title}</h2>
          <span className={'font-normal text-base text-yellow mb-6'}>{settings.subtitle}</span>
          <div
            className={'mb-6 rte max-w-md mx-auto leading-normal text-yellow'}
            dangerouslySetInnerHTML={{ __html: `${settings.content}` }}
          />
        </div>
      </section>
    )
  }
}

export namespace Error {
  export type Options = ShopifyNext.Section<{
    title: string;
    content: string;
    subtitle: string;
  }>;
  export interface Props extends GlobalProps {
    section: Error.Options;
  }
  export interface State {}
}
