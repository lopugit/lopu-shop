import * as React from 'react'
import * as Snippets from 'snippets'
import { Animate } from 'react-show'

export class AccordionListItem extends React.PureComponent<AccordionListItem.Props, AccordionListItem.State> {
  public constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  private toogleAccording = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }))
  }

  public render(): JSX.Element {
    const { block } = this.props
    const { settings } = block
    const { title, content } = settings
    return (
      <div className={'w-full flex flex-wrap pt-1-6 pb-1-9 border-b border-grey-border'}>
        <div className={'w-full flex flex-row justify-between items-center cursor-pointer'} onClick={this.toogleAccording}>
          <Snippets.Heading size={'p'} tag={'p'} className={`w-5/6 leading-close ${this.state.active ? 'font-regular': 'font-light'}`}>
            {title}
          </Snippets.Heading>
          <Snippets.Icon name={this.state.active ? 'minus' : 'plus'} width={12} className={'mr-1-3'} />
        </div>
        <Animate
          show={this.state.active}
          transitionOnMount
          stayMounted
          style={{
            height: 'auto',
            display: 'block',
            overflow: 'hidden',
          }}
          start={{
            height: 0,
            display: 'block'
          }}>
          <Snippets.RichText 
            size={'p'}
            className={'richtext pt-1-9 pb-1-3 leading-close'}
          >
            {content}
          </Snippets.RichText>
        </Animate>
      </div>
    )
  }
}

export namespace AccordionListItem {
  export interface Props {
    block: any
  }
  export interface State {
    active: boolean;
  }
}
