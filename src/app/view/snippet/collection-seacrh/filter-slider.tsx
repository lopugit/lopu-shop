import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SSFilter, SearchSpring } from '@dotdev/reactive-searchspring'
import * as Snippets from 'snippets'
import AnimateHeight from 'react-animate-height'
import 'rheostat/initialize'
import Rheostat from 'rheostat'
import './rheostat.css'
import * as Helpers from 'helpers'

export class FilterSlider extends React.Component<FilterSlider.Props, FilterSlider.State> {
  public static contextType = ShopifyNext.Context;

  private toggleActive = (): void => {
    this.setState((state: any) => {
      return {
        active: !state.active
      }
    })
  };

  public constructor(props: FilterSlider.Props) {
    super(props)

    this.state = {
      values: props.facet.range[0] === props.facet.range[1] ? [props.facet.range[0] * 0.9, props.facet.range[1] * 1.1] : props.facet.range,
      min: props.facet.range[0] === props.facet.range[1] ? props.facet.range[0] * 0.9 : props.facet.range[0],
      max: props.facet.range[0] === props.facet.range[1] ? props.facet.range[1] * 1.1 : props.facet.range[1],
      active: true
    }
  }

  public componentDidUpdate() {
    if(Helpers.check(this, 'this.context.state.willFilterReset') && this.context.state.willFilterReset) {
      this.clearSlider()
    }
  }

  public clearSlider = () => {
    const { facet } = this.props
    this.setState({
      values: facet.range[0] === facet.range[1] ? [facet.range[0] * 0.9, facet.range[1] * 1.1] : facet.range,
    }, () => this.context.update({
      willFilterReset: false
    }))
  }

  public render(): JSX.Element {
    const { collection } = this.context.state
    const { facet } = this.props
    const { active, values, min, max } = this.state
    return facet.collapse ? (
      <div className={'mb-5-6'}>
        <button
          className={
            'flex w-full justify-between items-center text-left px-0 py-0-8 md:py-1-1 focus:outline-none uppercase'
          }
          onClick={this.toggleActive}
        >
          <p className={'flex-grow text-xs font-bold py-0-8 tracking-wider text-black'}>
            {facet.label && facet.label.toLowerCase().includes('type') && collection && collection.title ? 
              `All ${collection.title}`
              : (
                facet.label
              )}
          </p>
          <div className={'flex-shrink text-grey-400'}>
            <Snippets.Icon 
              name={active ? 'minus' : 'plus'} 
              width={17} 
              className={'transition-fast'} 
            />
          </div>
        </button>
        <AnimateHeight
          duration={300}
          height={active ? 'auto' : 0}
        >
          {this.slider(values, min, max)}
        </AnimateHeight>
      </div>
    ) : (
      <div className={'mb-5-6'}>
        <p
          className={'flex-grow text-xs font-medium tracking-wider leading-loosest uppercase'}
        >
          {
            facet.label && 
            facet.label.toLowerCase().includes('type') && 
            collection && 
            collection.title ? 
              `All ${collection.title}` : 
              facet.label
          }
        </p>

        <div
          className={'flex flex-wrap pb-1-6'}
        >
          {this.slider(values, min, max)}
        </div>
      </div>
    )
  }
  
  private slider = (values: number[], min: number, max: number) => {
    return (
      <div
        className={'flex flex-wrap py-1-6'}
      >
        <div className={'w-full px-2 pt-1-6'}>
          <Rheostat
            min={min}
            max={max}
            values={values}
            handle={(props) => {
              return (
                <div
                  className={'DefaultHandle_handle__horizontal DefaultHandle_handle'}
                  {...props}
                  ref={props.handleRef}
                  aria-label={props['data-handle-key'] === 0 ? 'Minimum price' : 'Maximum price'}
                  aria-valuetext={'$' + props['aria-valuenow']}
                >
                  <span className={'absolute top-0 left-0 -mt-3'} aria-hidden={true}>
                    <Snippets.Money price={props['aria-valuenow'] * 100} trim/>
                  </span>
                  <Snippets.Icon
                    name={'arrow_right'} 
                    width={40} 
                    className={`${props['data-handle-key'] === 0 ? 'rotate:180' : ''}`}
                    ariaHidden
                  />
                </div>
              )
            }}
            onChange={(filter) => {
              this.setState({
                values: filter.values
              })
              
              this.props.setFacet({
                ...this.props.value,
                type: SearchSpring.Query.Facet.Value.Type.RANGE,
                low: `${filter.values[0]}`,
                high: `${filter.values[1]}`
              })
            }}
          />
        </div>
      </div>
    )
  }
}

export namespace FilterSlider {
  export interface Props extends SSFilter.Component.Props {}
  export interface State {
    active: boolean;
    values: number[];
    min: number;
    max: number;
  }
}
