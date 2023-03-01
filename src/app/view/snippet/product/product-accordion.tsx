import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class ProductAccordion extends React.PureComponent<ProductAccordion.Props, ProductAccordion.State> {
  public static contextType = ShopifyNext.Context;
  public accordionContent = null;
  public constructor(props: ProductAccordion.Props) {
    super(props)

    this.state = {
      active: props.active,
      height: 0
    }
  }
  
  public componentDidMount() {
    this.setHeight()
    window.addEventListener('resize',this.setHeight)
  }
  
  public componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }

  public render(): JSX.Element {
    const { title } = this.props
    const { active, height } = this.state
    return (
      <div className={'bg-grey-100 p-2-4 mb-0-8'}>
        <button
          className={'text-black-60 relative w-full text-left outline-none focus:outline-none active:outline-none'}
          type={'button'}
          role={'button'}
          onClick={this.toggle}
        >
          <Snippets.Heading
            tag={'h5'}
            className={'mb-0-8'}
          >
            {title}
          </Snippets.Heading>
          <span className={'absolute inset-y-0 right-0 pointer-events-none flex items-center'}>
           
          </span>
        </button>
        <div 
          className={'overflow-y-hidden overflow-x-auto transition-max-height'} 
          style={{
            maxHeight: active ? height : 0
          }}
          ref={(accordionContent) => this.accordionContent = accordionContent}
        >
          <div className={'py-0-8'}>
            {React.Children.map(this.props.children, child => {
              // @ts-ignore
              return React.cloneElement(child, { setHeight: this.setHeight })
            })}
          </div>
        </div>
      </div>
    )
  }
  
  private setHeight = () => {
    const height = this.accordionContent.scrollHeight
    this.setState(() => {
      return {
        height
      }
    })
  }

  private toggle = () => {
    this.setState((prevState) => {
      return {
        active: !prevState.active
      }
    })
  };
}

export namespace ProductAccordion {
  export interface Props {
    title: string;
    active?: boolean;
  }
  export interface State {
    active: boolean;
    height: number;
  }
}
