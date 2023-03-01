import * as React from 'react'
import * as Snippets from 'snippets'
import { Animate } from 'react-show'
import { ShopifyNext } from '@dotdev/next-components'

export class StoreLocatorDetail extends React.PureComponent<StoreLocatorDetail.Props, StoreLocatorDetail.State> {
  public constructor(props: StoreLocatorDetail.Props) {
    super(props)
    this.state = {
      active: false
    }
  }
  
  private handleClick = () => {
    this.setState((prevState) => ({
      active: !prevState.active
    }))
  }

  private formatHours = time => {
    let formatted = ShopifyNext.Utils.formatDate('01/01/2000 ' + time.toString().slice(0, -2) + ':' + time.toString().slice(-2), 'hh:mma')

    if (formatted && formatted.startsWith('0')) {
      formatted = formatted.slice(1)
    }
    return formatted
  }

  public render(): JSX.Element {
    const { location, selectLocation } = this.props
    const { active } = this.state
    return (
      <div
        key={location.id}
        className={this.props.className ? this.props.className : ''}
      >
        <Snippets.StoreLocatorDetailForm id={location.id} attributes={location.attributes} selectLocation={selectLocation}/>
        {location.attributes.openHours.length ? <div className={'mt-1-7'}>
          <div className={'flex flex-wrap items-center cursor-pointer'} onClick={this.handleClick}>
            <Snippets.Heading size={'p'} tag={'p'} className={'leading-close'}>Opening hours</Snippets.Heading>
            <Snippets.Icon name={active ? 'minus' : 'plus'} width={14} height={14} className={'ml-1-7'}/> 
          </div>
          <Animate
            show={active}
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
            <div className={'mt-1-1 mb-0-8'}>
              {[...location.attributes.openHours].sort((a, b) => (a.dayStart - b.dayStart)).map((hours) => {
                return (
                  <div key={hours.id}>
                    <Snippets.Heading size={'p'} tag={'p'} className={'inline leading-close'}>
                      {`${ShopifyNext.Utils.formatDayNumber(hours.dayStart, true)} ${hours.dayStart !== hours.dayEnd ? `- ${ShopifyNext.Utils.formatDayNumber(hours.dayEnd, true)} `: ''}`}
                      {`${this.formatHours(hours.timeStart)} - ${this.formatHours(hours.timeEnd)}`}
                    </Snippets.Heading>
                  </div>
                )
              })}
            </div>
          </Animate>
        </div> : null }
      </div>
    )
  }
}

export namespace StoreLocatorDetail {
  export interface Props {
    className?: string;
    location: any;
    selectLocation: (id: string) => void;
  }
  export interface State {
    active: boolean
  }
}
