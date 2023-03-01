import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Snippets from 'snippets'

export class ImageText extends React.PureComponent<ImageText.Props, ImageText.State> {
  public static sectionId = 'imagtxt';

  public render(): JSX.Element {
    return (
      <section className={'dynamic-image-text mb-1-2 text-left w-full'}>
        <div className={'w-full md:w-2/3 mx-auto'}>
          <div className={'-mx-1-2 flex flex-wrap'}>
            {this.props.section.blocks.map(({ id, settings }) => (
              <div className={'w-full md:w-1/2 px-1-2 mb-1'} key={id}>
                <Snippets.Image
                  src={settings.image}
                  alt={settings.alttext || settings.text}
                  ratio={'natural'}
                  className={'mb-1'}
                />
                <Snippets.RichText size={'p'}>
                  {settings.text}
                </Snippets.RichText>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

}

export namespace ImageText {
  export interface Options extends ShopifyNext.Section {
    block_size: number;
  }
  export interface Props extends GlobalProps {
    section: ImageText.Options;
  }
  export interface ImageSettings {
    src: string;
  }
  export interface State { }
}
