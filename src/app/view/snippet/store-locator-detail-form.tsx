import * as React from 'react'
import * as Snippets from 'snippets'

export class StoreLocatorDetailForm extends React.PureComponent<StoreLocatorDetailForm.Props> {
  public render(): JSX.Element {
    const { id, attributes, selectLocation } = this.props
    return (
      <div className={'flex flex-col'}>
        <div className={`flex flex-col ${selectLocation ? 'cursor-pointer' : ''}`} onClick={selectLocation ? () => selectLocation(id) : undefined}>
          <Snippets.Heading size={'h3'} tag={'p'} className={'mb-1-4'}>
            {attributes.shopName}
          </Snippets.Heading>
          {attributes.address1 && <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
            {`${attributes.address1}, `}
          </Snippets.Heading>}
          {attributes.address2 && <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight'}>
            {`${attributes.address2}, `}
          </Snippets.Heading>}
          <span>
            {attributes.suburb && <Snippets.Heading size={'p'} tag={'p'} className={'inline leading-tight'}>
              {`${attributes.suburb} `}
            </Snippets.Heading>}
            {attributes.state && <Snippets.Heading size={'p'} tag={'p'} className={'inline leading-tight'}>
              {`${attributes.state} `}
            </Snippets.Heading>}
            {attributes.postcode && <Snippets.Heading size={'p'} tag={'p'} className={'inline leading-tight'}>
              {`${attributes.postcode}`}
            </Snippets.Heading>}
          </span>
        </div>

        {(attributes.shopPhone || attributes.website) && <div className={'mt-0-9 flex flex-col'}>
          {attributes.shopPhone
            && <Snippets.Button
              title={`Phone to ${attributes.shopName}`}
              className={'block'}
              colour={'blank'}
              href={`tel:${attributes.shopPhone}`}
            >
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight underline'}>{attributes.shopPhone}</Snippets.Heading>
            </Snippets.Button>}
          {attributes.website
            && <Snippets.Button
              title={`mail to ${attributes.shopName}`}
              className={'block'}
              colour={'blank'}
              href={`mailto:${attributes.website}`}
            >
              <Snippets.Heading size={'p'} tag={'p'} className={'leading-tight underline'}>{attributes.website}</Snippets.Heading>
            </Snippets.Button>}
        </div>}
      </div>
    )
  }
}

export namespace StoreLocatorDetailForm {
  export interface Props {
    id: string;
    attributes: any;
    selectLocation?: (id: string) => void;
  }
}
