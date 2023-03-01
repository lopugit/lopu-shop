import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, Article } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

export class ArticleTemplate extends React.Component<ArticleTemplate.Props, ArticleTemplate.State> {
  public render(): JSX.Element {
    const { article } = this.props.data
    return (
      <Layouts.Theme {...this.props}>
        <div className={'max-w-7xl px-1-6 xl:px-0 mx-auto w-full pt-0-8 md:pt-4 pb-6-4'}>
          <div className={'flex flex-wrap'}>
            <div className={'md:w-full w-2/3 mx-auto text-center flex flex-row justify-center md:justify-between items-center mb-3-1 md:mb-2-4'}>
              <Snippets.Button
                className={'hidden md:flex flex-row items-center mt-1-2'}
                title={'back to blog'}
                href={'/blogs/news'}
                colour={'blank'}
              >
                <Snippets.Icon name={'chevron_left'} width={18} height={8} />
                <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider ml-0-8'}>back to blog</Snippets.Heading>
              </Snippets.Button>

              <Snippets.Heading size={'h1'} tag={'h1'} className={'leading-1.11 md:leading-tight md:pr-0-4'}>{article.title}</Snippets.Heading>

              <Snippets.Button
                className={'hidden md:flex flex-row items-center mt-1-2'}
                title={'next blog'}
                href={Helpers.check(article, 'article.next_article.url') ? article.next_article.url : ''}
                colour={'blank'}
                disabled={Helpers.check(article, 'article.next_article.url')}
              >
                <Snippets.Heading size={'h5'} tag={'p'} className={'tracking-wider mr-0-7'}>next article</Snippets.Heading>
                <Snippets.Icon name={'chevron_right'} width={18} height={8} />
              </Snippets.Button>
            </div>
            <div className={'w-full mb-2-8 md:mb-2-2'}>
              <Snippets.Heading size={'p'} tag={'p'} className={'text-center leading-none'}>{ShopifyNext.Utils.formatDate(article.published_at, 'dddd D MMM YYYY')}</Snippets.Heading>
            </div>
            {article.excerpt && <div className={'w-full px-1-6 md:px-0 md:w-2/3 mx-auto mb-4-8'}>
              <Snippets.RichText size={'none'} className={'text-xl font-mono text-center leading-1.4 px-0-4'}>
                {article.excerpt}
              </Snippets.RichText>
            </div>}
          </div>
          <div className={'flex flex-wrap'}>
            {article.content
              ? <div className={'rte w-full md:w-2/3 mx-auto py-4'}>
                {ShopifyNext.Utils.parseHTML(article.content)}
              </div>
              : null}
            {Helpers.check(this, 'this.props.data.article.metafields.dtk.fields.sections') ? (
              <div className={'w-full'}>
                <ShopifyNext.Components.DynamicSections
                  {...this.props}
                  dtkSections={this.props.data.article.metafields.dtk.fields.sections.filter(section => section._name !== 'collect')}
                />
              </div>
            ) : null}
          </div>
          <div className={'w-full'}>
            <div className={'md:w-2/3 w-full mx-auto flex flex-col md:flex-row mb-4 md:mb-3-2'}>
              <Snippets.Button
                title={`share ${article.title}`}
                colour={'blank'}
                className={'mt-0-4 w-full md:w-1/8 flex flex-row items-center justify-start pl-1-6 md:pl-0-4 mb-2-4 md:mb-0'}
                href={`mailto:?subject=Check this blog I found on Lopu&body=${window.location.href}`}
                target={'blank'}
              >
                <Snippets.Heading size={'h5'} tag={'p'} className={'mr-1'}>share</Snippets.Heading>
                <Snippets.Icon name={'share'} width={13} height={10} className={'mb-0-1'} />
              </Snippets.Button>
              {article.tags && article.tags.filter(tag => tag.includes('style:')).length > 0 ? <div className={'w-full md:w-7/8 flex flex-wrap items-center justify-start pl-1-6 md:pl-2'}>
                <Snippets.Heading size={'h5'} tag={'p'} className={'w-full md:w-auto mr-1-8 mt-0 md:mt-0-4 mb-0-8 md:mb-0'}>
                  Tags
                </Snippets.Heading>
                {article.tags.filter(tag => tag.includes('style:')).map((tag: string, i: number) => (
                  <Snippets.Button
                    key={tag}
                    title={`Display ${Helpers.handleize(tag)} tagged blogs`}
                    colour={'blank'}
                    href={`/blogs/${article.handle.split('/')[0]}/tagged/${Helpers.handleize(tag)}`}
                    className={'mr-1-4 md:mb-0 last:mr-0'}
                  >
                    <Snippets.Heading key={i} size={'p'} tag={'p'} className={'underline leading-close'}>
                      {tag.slice(6)}
                    </Snippets.Heading>
                  </Snippets.Button>
                ))}
              </div> : null}
            </div>
            <hr className={'border-grey-border h-px mx-1-6'} />
          </div>
          <div>
            {Helpers.check(this, 'this.props.data.article.metafields.dtk.fields.sections') && this.props.data.article.metafields.dtk.fields.sections.some(section => section._name === 'collect') ? (
              <article className={'w-full mt-2 md:mt-3-2'}>
                <ShopifyNext.Components.DynamicSections
                  {...this.props}
                  dtkSections={this.props.data.article.metafields.dtk.fields.sections.filter(section => section._name === 'collect')}
                />
              </article>
            ) : null}
          </div>
        </div>
      </Layouts.Theme>
    )
  }
}

export namespace ArticleTemplate {
  export interface Props extends GlobalProps { }
  export interface State { }
}
