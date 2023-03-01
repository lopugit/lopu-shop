import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps, Article, PaginationPart } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import axios from 'axios'
import { Animate } from 'react-show'
import { XMasonry, XBlock } from 'react-xmasonry'

export class GeneralBlogTemplate extends React.Component<GeneralBlogTemplate.Props, GeneralBlogTemplate.State> {
  private container = React.createRef<HTMLDivElement>();
  public constructor(props: GeneralBlogTemplate.Props) {
    super(props)
    this.state = {
      articles: [...this.props.data.blog.articles],
      pageNumber: 2,
      mobileNavActive: false,
      width: 1200
    }
  }

  private handleLoadMore = async () => {
    const { blog } = this.props.data
    const { pageNumber } = this.state
    const url = `/blogs/${blog.handle}?view=json&page=${pageNumber}`
    const { data } = await axios.get(url)
    this.setState(prevState => {
      return {
        articles: [...prevState.articles, ...data.articles],
        pageNumber: prevState.pageNumber + 1
      }
    })
  }

  private handleMobileNavClick = () => {
    this.setState(prevState => {
      return {
        mobileNavActive: !prevState.mobileNavActive,
      }
    })
  }

  public render(): JSX.Element {
    const { articles, mobileNavActive } = this.state
    const { data } = this.props
    const { blog, paginate } = data
    return (
      <Layouts.Theme {...this.props}>
        <main className={'max-w-container mx-auto'}>
          <div ref={this.container} className={'max-w-7xl px-1-6 xl:px-0 mx-auto pt-1 md:pt-3-2 pb-6-4'}>
            <div className={'mb-3-2 md:mb-4-9'}>
              <Snippets.Heading size={'h1'} tag={'h1'} className={'mb-2-5 md:mb-3-2 text-center leading-none md:leading-tight'}>
                Journal
              </Snippets.Heading>

              <div className={'hidden md:flex justify-center'}>
                <Snippets.Button
                  title={'Display all blogs'}
                  colour={'blank'}
                  href={`/blogs/${blog.handle}`}
                  className={'mr-2-6'}
                >
                  <Snippets.Heading size={'none'} tag={'p'} className={'font-mono font-normal text-base leading-none'}>
                    All
                  </Snippets.Heading>
                </Snippets.Button>
                {blog.all_tags.filter((tag: string) => tag.toLowerCase().includes('nav:')).map((tag: string) => {
                  return (
                    <Snippets.Button
                      key={tag}
                      title={`Display ${Helpers.handleize(tag)} tagged blogs`}
                      colour={'blank'}
                      href={`/blogs/${blog.handle}/tagged/${Helpers.handleize(tag)}`}
                      className={'ml-2-2 mr-2-2 last:mr-0'}
                    >
                      <Snippets.Heading size={'none'} tag={'p'} className={`font-mono text-base leading-none ${blog.current_tags.includes(tag) ? 'underline': 'no-underline'}`}>
                        {tag.slice(4)}
                      </Snippets.Heading>
                    </Snippets.Button>
                  )
                })}
              </div>
              <div className={'relative block md:hidden w-full '}>
                <div className={'border border-grey-border mx-1-6'}>
                  <Snippets.Button
                    title={'Display all blogs'}
                    colour={'blank'}
                    onClick={this.handleMobileNavClick}
                    className={'w-full px-1-6 flex flex-row justify-between items-center h-4'}
                  >
                    <Snippets.Heading size={'h5'} tag={'p'} className={'text-left'}>
                      category
                    </Snippets.Heading>
                    <Snippets.Icon name={mobileNavActive ? 'chevron_up': 'chevron_down'} width={12} />

                  </Snippets.Button>
                  <Animate
                    show={mobileNavActive}
                    transitionOnMount
                    stayMounted
                    style={{
                      height: 'auto',
                      display: 'block',
                      overflow: 'hidden',
                      position: 'absolute',
                      zIndex: 10,
                      width: '100%',
                      padding: '0 16px',
                      left: 0
                    }}
                    start={{
                      height: 0,
                      display: 'block'
                    }}
                  >
                    <div className={'bg-white w-full px-1-5 border border-t-0 border-grey-border'}>
                      <Snippets.Button
                        title={'Display all blogs'}
                        colour={'blank'}
                        href={`/blogs/${blog.handle}`}
                        className={'w-full'}
                      >
                        <Snippets.Heading size={'p'} tag={'p'} className={'leading-looser'}>
                          All
                        </Snippets.Heading>
                      </Snippets.Button>
                      {blog.all_tags.filter(tag => tag.includes('nav:')).map((tag: string) => {
                        return (
                          <Snippets.Button
                            key={tag}
                            title={`Display ${Helpers.handleize(tag)} tagged blogs`}
                            colour={'blank'}
                            href={`/blogs/${blog.handle}/tagged/${Helpers.handleize(tag)}`}
                            className={'w-full'}
                          >
                            <Snippets.Heading size={'p'} tag={'p'} className={`${blog.current_tags.includes(tag) ? 'font-regular': 'font-light'} leading-looser`}>
                              {tag.slice(4)}
                            </Snippets.Heading>
                          </Snippets.Button>
                        )
                      })}
                    </div>
                  </Animate>
                </div>
              </div>
            </div>
            <div className={'w-full'}>
              <XMasonry maxColumns={3} targetBlockWidth={this.state.width / 3}>
                {articles.map((article: Article, index: number) => {
                  const isTwoColumn = Helpers.check(article, 'article.tags') ? Boolean(article.tags.find(tag => tag === 'layout:two-columns')) : false
                  return <XBlock key={index} width={isTwoColumn ? window.innerWidth > 1046 ? 2: 1 : 1}>
                    <Snippets.ArticleCard key={index} article={article} isTwoColumn={window.innerWidth > 1046 ? isTwoColumn : false}/>
                  </XBlock>
                })}
              </XMasonry>
            </div>
            {articles.length !== paginate.items ? <div className={'w-full flex justify-center mt-2'}>
              <Snippets.Button
                title={'load more articles'}
                onClick={this.handleLoadMore}
                colour={'secondary'}
                refs={'next'}
              >
                <Snippets.Heading size={'h6'} tag={'p'} className={'uppercase px-1 tracking-wider'}>Load More</Snippets.Heading>
              </Snippets.Button>
            </div> : null}
          </div>
        </main>
      </Layouts.Theme>
    )
  }
}

export namespace GeneralBlogTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    width: number;
    articles: any;
    pageNumber: number;
    mobileNavActive: boolean;
  }
}
