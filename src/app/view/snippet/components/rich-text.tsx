import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import * as Snippets from 'snippets'
import AnimateHeight from 'react-animate-height'

export const RichText: React.FunctionComponent<RichText.Props> = ({ children, size, className, strip, firstLine, truncate, overflow }): JSX.Element => {
  const [active, setActive] = React.useState(false)
  const content: any = children
  const formattedContent = typeof content === 'string' ? content?.replace(/\\"/g, '"') : content
  const strippedHTML: string = typeof formattedContent === 'string' ? formattedContent.replace(/(<([^>]+)>)/gi, '') : null,
    first: string = typeof formattedContent === 'string' ? (formattedContent.indexOf('.') ? strippedHTML.split('.')[0] : strippedHTML) : null
  const sizes: any = {
    1: 'text-3xl sm:text-4xl font-light font-mono leading-none',
    2: 'text-2xl font-light font-mono',
    3: 'text-base font-bold tracking-wider uppercase',
    4: 'text-base font-light font-mono',
    5: 'text-xs font-bold tracking-wide uppercase',
    6: 'text-xs font-regular',
    p: 'text-base font-light',
    none: '',
    default: `font-sans text-base ${
      className && !className.includes('leading-') ? ' leading-normal' : '' }  tracking-none`
  }
  const style: any = size && sizes[size] ? sizes[size] : sizes['default']
  const classes: any = `rte richtext richtext-link ${style} ${className ? ` ${className}` : ''}`
  return overflow ? (
    <div>
      <AnimateHeight
        duration={300}
        height={active ? 'auto' : 80}
        className={`relative ${active ? '' : 'gradient-white-after'}`}
      >
        <div className={`${classes}`}>
          {firstLine ? (
            <p>{first}</p>
          ) : strip || truncate ? (
            <p>{truncate ? ShopifyNext.Utils.truncateString(strippedHTML, truncate) : strippedHTML}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: typeof formattedContent === 'string' ? formattedContent : "" }} />
          )}

        </div>
      </AnimateHeight>
      <Snippets.Button
        title={active ? 'Read Less' : 'Read More'}
        onClick={() => setActive((prev) => !prev)}
        colour={'link-small'}
      >
        {active ? 'Read Less' : 'Read More'}
      </Snippets.Button>
    </div>
  ) : (
    <div className={classes}>
      {firstLine ? (
        <p>{first}</p>
      ) : strip || truncate ? (
        <p>{truncate ? ShopifyNext.Utils.truncateString(strippedHTML, truncate) : strippedHTML}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      )}
    </div>
  )
}

export namespace RichText {
  export interface Props {
    className?: any;
    firstLine?: boolean;
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 'p' | 'none' | 'default';
    strip?: boolean;
    truncate?: number;
    overflow?: boolean;
  }
}
