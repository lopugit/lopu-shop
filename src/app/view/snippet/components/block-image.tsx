import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'

export class BlockImage extends React.PureComponent<BlockImage.Props, BlockImage.State> {
  public static contextType = ShopifyNext.Context;

  public constructor(props: any) {
    super(props)
  }

  public render(): JSX.Element {
    const { image, hoverImage, ratio, className, alt, hoverAlt, preventLazy, width, innerClass } = this.props
    return (
      <div className={`block w-full relative justify-center overflow-hidden${className ? ' ' + className : ''}`}>
        <Snippets.Image
          alt={alt}
          ratio={ratio ? ratio : '16:9'}
          src={image}
          className={`w-full transition-fast visible ${window.innerWidth > 640 && hoverImage ? 'group-hover:opacity-0 group-hover:invisible' : ''} opacity-100 ${innerClass ? innerClass : ''}`}
          preventLazy={preventLazy}
          width={width}
        />
        {window.innerWidth > 640 && hoverImage ? (
          <Snippets.Image
            alt={hoverAlt? hoverAlt: alt}
            ratio={'none'}
            src={hoverImage}
            className={`w-full absolute inset-0 transition-fast invisible opacity-0 group-hover:opacity-100 group-hover:visible ${innerClass ? innerClass : ''}`}
            preventLazy={preventLazy}
            width={width}
          />
        ) : null}
      </div>
    )
  }
}

export namespace BlockImage {
  export interface State {}
  export interface Props {
    alt: string;
    hoverAlt?: string;
    href?: string;
    image: string;
    hoverImage?: string;
    ratio?: any;
    className?: string;
    innerClass?: string;
    sizeIndex?: any[];
    preventLazy?: boolean;
    width?: number;
  }
}
