import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { GlobalProps } from 'types'
import { SearchSpring } from '@dotdev/reactive-searchspring'
import * as Sections from 'sections'
import * as Helpers from 'helpers'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class NotFoundTemplate extends React.Component<ErrorTemplate.Props, ErrorTemplate.State> {
  public render(): JSX.Element {
    const { settings } = this.props.data
    const fontSize = {
      fontSize: settings.text_font_size,
    }
    return (
      <Layouts.Theme {...this.props}>
        <main className={'max-w-7xl mx-auto py-12 px-1-6'}>
          <div style={fontSize} className={`text-${settings.text_alignment}`}>
            { settings.text }
          </div>
          <div className={`text-${settings.text_alignment}`}>
            <Snippets.Button
              className={'mt-2 md:mt-3 mx-0-3 pt-1-1 pb-1'}
              href={settings.link}
              colour={settings.button_color === 'black' ? 'primary' : 'secondary'}
              title={settings.text_link}>
                {settings.text_link}
              </Snippets.Button>
          </div>
        </main>
      </Layouts.Theme>
    )
  }
}

declare const SEARCHSPRING_ID: string

export namespace ErrorTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
