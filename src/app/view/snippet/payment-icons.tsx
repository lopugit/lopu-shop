import * as React from 'react'
import * as Snippets from 'snippets'

export class PaymentIcons extends React.PureComponent<PaymentIcons.Props> {
  public render(): JSX.Element {
    const { methods, footer, wrap } = this.props
    if (footer) {
      return (
        <React.Fragment>
          <ul className={`list-reset flex 2xl:ml-0 sm:-mx-1-6 -mx-1 ${wrap ? 'align-center justify-center flex-wrap' : 'align-center 2xl:justify-end'}`}>{this.buildItems(methods)}</ul>
        </React.Fragment>
      ) 
    } else {
      return (
        <React.Fragment>
          <div className={'mb-1 mr-2'}>
            
          </div>
          <ul className={`list-reset flex ${wrap ? 'align-center justify-center sm:flex-wrap' : ''}`}>{this.buildItems(methods)}</ul>
        </React.Fragment>
      )
    }
  }

  private buildItems = (methods: string): JSX.Element[] => {
    return methods.includes(',')
      ? methods.split(',').map(
        (item: string, i: number): JSX.Element => {
          const icon: string = `${item}`
          return (
            <li key={i} className={`w-auto 2xl:flex-1 ${this.props.wrap ? 'mb-3' : ''} ${item}`}>
              <Snippets.Icon name={icon as Snippets.Icon.Name} width={80} height={40} className={'hidden sm:block'} />
              <Snippets.Icon name={icon as Snippets.Icon.Name} width={54} height={27} className={'sm:hidden block'} />
            </li>
          )
        }
      )
      : []
  };
}

export namespace PaymentIcons {
  export interface Props {
    methods: string;
    footer: any;
    wrap?: boolean;
  }
}
