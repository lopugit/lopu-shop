import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { SearchSpring, SSFilter } from '@dotdev/reactive-searchspring'
import AnimateHeight from 'react-animate-height'
import * as Snippets from 'snippets'
import { Collection } from 'types'


export class CollectionFilterItem extends React.Component<CollectionFilterItem.Props, CollectionFilterItem.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: any) {
    super(props)
  }

  public state: any = {
    active:
      this.props.facet &&
      this.props.facet.values &&
      this.props.facet.values.filter((item) => item.active) &&
      this.props.facet.values.filter((item) => item.active).length
        ? false
        : window.innerWidth < 768 ?
          false
          : true
  };

  private toggleActive = (): void => {
    this.setState((state: any) => {
      return {
        active: !state.active
      }
    })
  };

  private buildFilters = (): JSX.Element[] => {
    const { facet, toggleFacet } = this.props
    
    return facet && facet.values
      ? facet.values.map((option, i) => {
        return (
          <label
            htmlFor={`toggle-${facet.label}-${option.label}`}
            className={'flex items-center w-full mb-1-6 cursor-pointer'}
            key={i}
          >
            <span className={'flex-1'}>{option.label}</span>
            <input
              id={`toggle-${facet.label}-${option.label}`}
              type="checkbox"
              className={'bg-white rounded-full appearance-none w-2 h-2 outline-none active:outline-none focus:outline-none cursor-pointer'}
              onChange={() => {
                this.props.resetPagination()
                toggleFacet(option)
              }}
              checked={option.active}
            />
          </label>
        )
      })
      : null
  };

  public render(): JSX.Element {
    const { facet, collection } = this.props
    const { active } = this.state
    return (
      <div>
        <button
          className={
            'flex w-full justify-between items-center text-blue text-left px-0 py-0-8 md:py-1-1 focus:outline-none text-xs'
          }
          onClick={this.toggleActive}
        >
          <p className={'flex-grow font-bold py-0-8 tracking-wider text-black uppercase'}>
            {facet.label && facet.label.toLowerCase().includes('type') && collection && collection.title ? (
              <span>
                {`All ${collection.title}`}
              </span>
            ) : (
              facet.label
            )}
          </p>
          <div className={'flex-shrink'}>
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
          {this.buildFilters()}
        </AnimateHeight>
      </div>
    )
  }
}

export namespace CollectionFilterItem {
  export interface Props {
    facet: any;
    size: boolean;
    toggleFacet: (facet: string) => void;
    resetPagination: () => void;
    collection: Collection;
  }
  export interface State {
    active: boolean;
  }
}
