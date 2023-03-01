import * as React from 'react'
import * as Snippets from 'snippets'
import { ShopifyNext } from '@dotdev/next-components'

export class ArticleCard extends React.PureComponent<ArticleCard.Props> {
  public render(): JSX.Element {
    const { article, isTwoColumn } = this.props
    return (
      <a href={article.url} className={`block md:px-1-2 w-full ${isTwoColumn ? 'ratio-double-blog': 'ratio-blog'}`}>
        <div className={'absolute inset-0 px-1-2'}>
          {article.image ? <Snippets.Image
            alt={article.title}
            src={article.image.src}
            ratio={isTwoColumn ? '4:2' : '1:1'}
            className={isTwoColumn ? '' : 'mx-1-6 md:mx-0'}
          /> : null}
          <div className={'w-full px-1-6 pt-2 pb-3-6 md:pb-3'}>
            <Snippets.Heading size={'none'} tag={'p'} className={'text-xs font-light tracking-wider uppercase text-center leading-none mb-1-6'}>{ShopifyNext.Utils.formatDate(article.published_at, 'MMMM D YYYY')}</Snippets.Heading>
            <Snippets.Heading size={'h3'} tag={'h5'} className={'px-1-2 text-center mb-0-8'}>
              {article.title}
            </Snippets.Heading>
            {article.excerpt ? <Snippets.RichText truncate={window.innerWidth < 768 ? 80 : isTwoColumn ? 160 : 70} className={'text-center mb-1-2 leading-1.4'}>
              {article.excerpt}
            </Snippets.RichText> : null}
            <Snippets.Button
              title={`Read Archtle ${article.title}`}
              colour={'blank'}
              className={'w-full'}
            >
              <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider'}>Read More</Snippets.Heading>
            </Snippets.Button>
          </div>
        </div>
      </a>
    )
  }
}

export namespace ArticleCard {
  export interface Props {
    isTwoColumn?: boolean;
    article: {
      title: string;
      url: string;
      tags: string[];
      image: {
        src: string;
      };
      published_at: string;
      excerpt: string;
    };
  }
}
