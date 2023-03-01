import * as React from 'react'
import * as Snippets from 'snippets'
import { CustomSize } from 'types'
import { OptionDropdown } from './option-dropdown'

export class ProductOptions extends React.PureComponent<ProductOptions.Props> {
  public render(): JSX.Element {
    const { sizeGuidePopupEnabled, options, showTitles, selectedRibbon, selectedBrim, handleSizeGuidePopup } = this.props
    return options
      ? options.map((option: any, i: number) => {
        const optionHandle = option.name.toLowerCase()
        const config = this.props.config[optionHandle]
        return config ? (
          <div key={i} className={'mb-1-6'}>
            {showTitles && optionHandle !== 'title' && config.title != false ? (
              <div className={'flex flex-row items-center mb-1-1'}>
                <Snippets.Heading size={'h5'} tag={'p'}>
                  {selectedRibbon || selectedBrim ? `Step ${i + 2}: Choose a ${option.name}` : option.name}
                </Snippets.Heading>
                {optionHandle === 'size' && config.sizeGuideUrl ? (
                  <Snippets.Heading tag={'p'} size={'h6'} className={'underline'}>
                    <Snippets.Link
                      target={'blank'}
                      className={'pl-1-2 cursor-pointer'}
                      title={'Size Guide'}
                      {...(sizeGuidePopupEnabled ? { onClick: () => handleSizeGuidePopup(true) } : { href: config.sizeGuideUrl })}
                    >
                      Size guide
                    </Snippets.Link>
                  </Snippets.Heading>
                ) : null}
              </div>
            ) : null}
            {config.layout === 'grid' ? (
              <ul className={'list-reset flex flex-wrap'}>
                {selectedRibbon ?
                  this.buildCustomGrid(['S', 'M', 'L', 'XL']) :
                  this.buildGrid(option, i + 1)
                }
              </ul>
            ) :
              config.layout === 'dropdown' ? (
                <OptionDropdown
                  option={option}
                  optionPrefix={this.props.optionPrefix}
                  onChange={this.props.onChange}
                  selected={this.props.selected.options[option.position - 1]}
                />
              ) : null}
          </div>
        ) : null
      })
      : null
  }

  private getOptionString = (option: any, index: number): string => {
    const optionArray = []
    const optionObject = {
      ...this.props.selectedOptions,
      [`option${index}`]: option
    }

    for (const [key, value] of Object.entries(optionObject)) {
      value !== null ? optionArray.push(value) : null
    }

    const optionString = optionArray.join(' / ')

    return optionString
  };

  private checkDisabled = (optionString: string): boolean => {
    return !this.props.enabledOptions.includes(optionString)
  };

  private buildCustomGrid = (items: Array<CustomSize>): JSX.Element[] => {
    return items
      ? items.map((item: any, i: number) => (
        <li key={i} className={'block relative overflow-hidden border border-grey-border mb-1 mr-1'}>
          <button
            type={'button'}
            title={item}
            onClick={() => this.props.onSizeChange(item)}
            className={`relative flex items-center justify-center ${item.toLowerCase().includes('one size') ? 'w-auto px-1-6': 'w-4'} h-4 transition-fast${
              this.props.selectedSize === item
                ? ' text-white bg-black'
                : ''
            }`}
          >
            <Snippets.Heading size={'h5'} tag={'p'}>
              {item}
            </Snippets.Heading>
          </button>
        </li>
      ))
      : []
  };

  private buildGrid = (items: any, index: number): JSX.Element[] => {
    return items.values
      ? items.values.map((item: any, i: number) => {
        const isDisabled = this.checkDisabled(this.getOptionString(item, index))
        return (
          <li key={i} className={'block relative overflow-hidden border border-grey-border mb-1 mr-1'}>
            <button
              type={'button'}
              title={item}
              onClick={() => this.props.onChange(item, index)}
              className={`relative flex items-center justify-center ${item.toLowerCase().includes('one size') ? 'w-auto px-1-6': 'w-4'} h-4 transition-fast${
                this.props.selected && this.props.selectedOptions[`option${index}`] === item
                  ? ' text-white bg-black'
                  : isDisabled ? ' bg-grey' : ''
              }`}
            >
              <Snippets.Heading size={'h5'} tag={'p'} className={`${isDisabled ? 'opacity-50': 'opacity-100'}`}>{item}</Snippets.Heading>
              {isDisabled && <span className={'disabled-line absolute w-8 h-4 border-b border-black opacity-10'} />}
            </button>
          </li>
        )
      })
      : []
  };
}

export namespace ProductOptions {
  export interface Props {
    config: any;
    options: any;
    swatches?: any;
    selected: any;
    selectedOptions: any;
    onSaleOptions: any;
    enabledOptions: any;
    optionPrefix: string;
    showTitles: boolean;
    onChange: (item: any, index: number) => void;
    sizeGuidePopupEnabled: boolean;
    variant: any;
    className?: string;
    selectedRibbon: string;
    selectedSize: CustomSize;
    selectedBrim: string;
    onSizeChange: (item: CustomSize) => void;
    handleSizeGuidePopup: (show: boolean) => void;
  }
}
