import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import Sticky from 'react-stickynode'

export class GenericPageTemplate extends React.Component<GenericPageTemplate.Props, GenericPageTemplate.State> {
  public constructor(props) {
    super(props)
    this.state = {
      anchor: window.location.hash.slice(1)
    }
  }

  private navList = Helpers.check(this, 'this.props.data.page.metafields.dtk.fields.sections') ? this.props.data.page.metafields.dtk.fields.sections.filter(section => section._name === 'anchor') : []

  public componentDidUpdate = (prevState) => {
    if(prevState.anchor !== this.state.anchor) {
      this.anchorScroll()
    }
  }

  private anchorScroll = () => {
    const { anchor } = this.state
    if(anchor) {
      const anchorElement = document.getElementById(anchor)
      if(anchorElement) {
        Helpers.scrollTo(
          anchorElement.offsetTop - window.innerHeight / 8,
          undefined,
          300
        )
      }
    }
  }

  private handleNavButtonOnClick = (anchor) => {
    this.setState({
      anchor
    }, () => {window.location.hash = anchor})
  }


  public render(): JSX.Element {

    const { page } = this.props.data
    const  headingTextAlign = (sections) => {
      const layouts = sections?.filter(item => item._name == 'layouts')
      return layouts?.length > 0 ? layouts[0].titlealign : "left"
    }

    return (
      <Layouts.Theme {...this.props}>
        <div className={'max-w-container mx-auto pb-10'}>
          <div className={'w-full flex flex-row'}>
            {this.navList?.length > 0 ? <div className={'w-1/8 hidden xl:block pl-4 mr-1-8 xl:pt-14-5'} id={'stickybottom'}><Sticky top={145} bottomBoundary={'#stickybottom'}>{
              this.navList.map((navItem, i) => {
                const { label } = navItem
                return (
                  <div
                    key={i}
                    className={'mb-2-2 cursor-pointer'}
                    onClick={() => this.handleNavButtonOnClick(Helpers.handleize(label))}
                  >
                    <Snippets.Heading size={'h5'} tag={'h3'} className={`${this.state.anchor === Helpers.handleize(label) || (i === 0 && !this.state.anchor) ? 'opacity-100' : 'opacity-50'}`}>{label}</Snippets.Heading>
                  </div>
                )
              })
            }
            </Sticky>
            </div>: null}
            <div className={'max-w-7xl mx-auto w-full flex justify-center flex-col'}>
              <div className={'w-full md:w-5/6 mx-auto'}>
                <div className={'w-full md:w-4/5 px-1-6 md:px-0-4 mx-auto pt-3-2 pb-3-2 md:pt-5-3 md:pb-4-8'}>
                  <Snippets.Heading size={'h1'} tag={'h1'} className={`text-${headingTextAlign(page.metafields.dtk.fields.sections)}`}>
                    {page.title}
                  </Snippets.Heading>
                </div>
              </div>
              <div>
                {Helpers.check(page, 'page.metafields.dtk.fields.sections') ? (
                  <ShopifyNext.Components.DynamicSections
                    {...this.props}
                    dtkSections={page.metafields.dtk.fields.sections}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Layouts.Theme>
    )
  }
}

export namespace GenericPageTemplate {
  export interface Props extends GlobalProps { }
  export interface State {
    anchor: string;
  }
}
