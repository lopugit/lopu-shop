import * as React from 'react'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'

export class CollectionTitle extends React.PureComponent<CollectionTitle.Props> {

  public render(): JSX.Element {
    const { collection } = this.props.data
    const { description } = collection    
    const overflow = description.replace(/(<([^>]+)>)/gi, '').length > 300 ? true : false

    return (
      <section
        className={'max-w-6xl mx-auto px-1-6 md:px-6 xl:px-22 lg:px-18 pb-0 md:pb-3-2 pt-3-5 md:pt-6-3 text-center'}>
        {
          collection.title ? (
            <Snippets.Button
              title={collection.title}
              colour={'blank'}
              href={collection.url}
            >
              <Snippets.Heading tag={'h1'} className={'pb-3-2'}>
                {collection.title}
              </Snippets.Heading>
            </Snippets.Button>
          ) : null
        }

        {description ? (
          <div className={'block'} >
            <Snippets.RichText size={'none'} overflow={overflow}>
              {description}
            </Snippets.RichText>
          </div>
        ) : null}
      </section>
    )
  }
}

export namespace CollectionTitle {
  export interface Props extends GlobalProps {
    reduced?: boolean;
  }
}
