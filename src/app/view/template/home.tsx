import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Sections from 'sections'

export class HomeTemplate extends React.Component<HomeTemplate.Props, HomeTemplate.State> {
  
  public constructor(props: HomeTemplate.Props) {
    super(props)
    this.state = {
      sections: props.data.sections
    }
  }
  
  public componentDidMount = async () => {
    const res = await fetch('/?view=json', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    const text = await res.text()
    // Strip html comments so the JSON can be fetched in the theme customiser
    const json = JSON.parse(text.replace(/(<([^>]+)>)/gi, '').replace(',', ''))
    this.setState({ sections: json })
  }
  
  public render(): JSX.Element {
    const {data} = this.props
    data.sections = this.state.sections
    return (
      <Layouts.Theme {...this.props}>
        <ShopifyNext.Components.DynamicSections {...this.props} data={data} />
        {/* <div className={'h-100vh'}></div> */}
      </Layouts.Theme>
    )
  }
}

export namespace HomeTemplate {
  export interface Props extends GlobalProps {}
  export interface State {
    sections: any
  }
}
