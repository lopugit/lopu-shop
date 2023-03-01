import * as React from 'react'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'
import { ShopifyNext } from '@dotdev/next-components'

export class PopupSubscribeSuccess extends React.PureComponent<PopupSubscribeSuccess.Props, PopupSubscribeSuccess.State> {
  public render(): JSX.Element {
    const { visible, toggleSubscribe, section } = this.props
    return section.settings ? (
      <div className={`fixed inset-0 z-40 items-center md:items-start justify-center ${visible ? 'flex' : 'hidden'}`} role="dialog">
        <div className={'cursor-pointer absolute bg-black opacity-50 inset-0 z-40'} onClick={() => toggleSubscribe()} />
        <div className={'w-full mx-3-2 md:mt-25-5 md:max-w-popup z-50'}>
          <div className={'bg-white relative w-full'}>
            <div className={'absolute right-0 top-0 h-4 w-4 flex items-center justify-center'}>
              <Snippets.Button
                colour={'blank'}
                className={'underline'}
                type={'button'}
                onClick={toggleSubscribe}
                title={'Close popup'}
              >
                <Snippets.Icon name={'cross'} height={14} width={14} />
              </Snippets.Button>
            </div>

            <div className={'w-full py-3-6 md:py-8-8 px-2-1 md:px-15'}>
              <div className={'w-full pt-2 pb-2-8 md:pt-0 pb-0 flex flex-col justify-center items-center text-center'}>
                <Snippets.Heading
                  size={window.innerWidth < 768 ? 'h2' : 'h1'}
                  tag={'p'}
                  className={'mb-1-6 md:mb-2-4'}
                >
                  {section.settings.success_title}
                </Snippets.Heading>
                <Snippets.Heading
                  size={'p'}
                  tag={'p'}
                  className={'flex-1'}
                >
                  {section.settings.success_content}
                </Snippets.Heading>
              </div>
            </div>

          </div>
        </div>
      </div>
    ) : null
  }
}

export namespace PopupSubscribeSuccess {
  export type Options = ShopifyNext.Section<{}>;
  export interface Props extends GlobalProps {
    section: any;
    visible: boolean;
    toggleSubscribe: () => void;
  }
  export interface State {
    value: string;
    checked: boolean;
    error: string;
    email: string;
    isEmailValidate: boolean;
  }
}
