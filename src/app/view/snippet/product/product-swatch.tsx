import * as React from 'react'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class ProductSwatches extends React.PureComponent<ProductSwatches.Props> {
  private filterTagsBySiblingsHandle = (tags: string[], filteredSiblings: { handle: string }[]): string[] => {
    const result = []
    tags.forEach(tag => {
      filteredSiblings.some(sibling => tag.includes(sibling.handle))
        ? result.push(tag)
        : null
    })
    return result
  }
  public render(): JSX.Element {
    const { product, className, collection } = this.props
    const { tags, handle } = product

    const filteredColoursTags = product.tags.filter((tag: string) => tag.includes('colours:') && !tag.includes(product.handle))

    const colours = Helpers.check(product, 'product.filteredSiblings')
      ? this.filterTagsBySiblingsHandle(filteredColoursTags, product.filteredSiblings)
      : filteredColoursTags

    const currentColor = tags.filter((tag: string) => tag.includes('colours:') && tag.includes(handle))?.[0]
    return (
      <div className={className}>
        {(() => {
          const mainHex = `#${currentColor?.split('|')[1]}`
          const bandHex = currentColor?.split('|')[2] && currentColor?.split('|')[2] !== 'Not Available' ? `#${currentColor?.split('|')[2]}` : `#${currentColor?.split('|')[1]}`
          return (
            <Snippets.Button
              title={product.title}
              name={product.title}
              //href={`${collection ? `/collections/${collection.handle}` : ''}/products/${product.handle}`}
              colour={'blank'}
              className={'mx-0-4 cursor-default'}
            >
              <div className={'m-auto mb-0-8 w-3 h-3 rounded-half border'} style={{ backgroundColor: bandHex, borderColor: `${bandHex === '#ffffff' ? '#a9a9a9' : bandHex}` }}>
                <div className={'mt-0-4 ml-0-4 absolute w-2 h-2 rounded-half'} style={{ backgroundColor: mainHex }}>
                  <Snippets.Icon name={'checked'} width={10} height={10} className={`ml-0-5 mt-0-5 ${mainHex === '#000000' ? 'text-white' : 'text-black'}`} />
                </div>
              </div>
            </Snippets.Button>
          )
        })()}
        {colours.map((tag: string) => {
          const colour = tag.split(':')[1]
          const handle = colour.split('|')[0]
          const mainHex = `#${colour.split('|')[1]}`
          const bandHex = colour.split('|')[2] && colour.split('|')[2] !== 'Not Available' ? `#${colour.split('|')[2]}` : `#${colour.split('|')[1]}`
          return (
            <Snippets.Button
              title={handle}
              name={handle}
              href={`${collection ? `/collections/${collection.handle}` : ''}/products/${handle}`}
              colour={'blank'}
              className={'mx-0-4'}
              key={`${handle}${mainHex}+${bandHex}`}
            >
              <div className={'m-auto mb-0-8 w-3 h-3 rounded-half border'} style={{ backgroundColor: bandHex, borderColor: `${bandHex === '#ffffff' ? '#e8e4e4' : bandHex}` }}>
                <div className={'mt-0-4 ml-0-4 absolute w-2 h-2 rounded-half'} style={{ backgroundColor: mainHex }} />
              </div>
            </Snippets.Button>
          )
        })}
      </div>
    )
  }
}

export namespace ProductSwatches {
  export interface Props {
    product: any;
    className?: string
    collection?: any
  }
}