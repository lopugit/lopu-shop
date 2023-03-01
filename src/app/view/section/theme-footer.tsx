import { ShopifyNext } from '@dotdev/next-components'
import * as React from 'react'
import * as Snippets from 'snippets'
import { GlobalProps } from 'types'

export class Footer extends React.PureComponent<Footer.Props, Footer.State> {
  public static sectionId = 'footer';

  public constructor(props: Footer.Props) {
    super(props)
    this.state = {
      isPopup: false,
      locatorQuery: '',
      bottom: false,
    }
  }

  public render(): JSX.Element {
    const { data, section } = this.props
    return (
      <div className={'bg-grey border-t-2 border-white text-left'}>
        <div className={'max-w-8xl mx-auto px-1-6 sm:px-2-4 2xl:px-22 xl:px-2-8 pb-3-2'}>
          <div className={'flex flex-wrap xl:flex-row flex-col-reverse lg:pt-6 pt-3-2 lg:pb-2-8 sm:pb-6 pb-1-6'}>
            <div className={'flex sm:flex-row flex-col w-full xl:w-1/2'}>
              <div className={'w-full sm:w-3/5 mr-4-6'}>
                {section.settings.footer_menu && (
                  <Snippets.FooterLinks
                    linklist={data.linklist[ShopifyNext.Utils.getMenu(section.settings.footer_menu)]}
                  />
                )}
              </div>
              {section.settings.social_icons_enabled && (data.settings.social_link_facebook || data.settings.social_link_youtube || data.settings.social_link_instagram) ?
                <div className={'w-full sm:w-2/5 lg:w-1/4 sm:block flex  sm:pr-0 pr-1-2'}>
                  <p className={'text-xs font-bold tracking-wide uppercase mb-2-4 flex-grow'}>{section.settings.social_icons_text}</p>
                  <ul className={'flex list-reset'}>
                    {data.settings.social_link_facebook ?
                      <li className={'inline-block mr-3 sm:mr-2'}>
                        <a
                          href={data.settings.social_link_facebook}
                          className={'text-sm flex gtm:social-clickout hover:opacity-75 transition-fast cursor-pointer no-underline'}
                          title={'Facebook'}
                          target={'_self'}
                        >
                          <Snippets.Icon name={'facebook'} width={20} height={20} label="facebook" />
                        </a>
                      </li>
                      : null
                    }

                    {data.settings.social_link_youtube ?
                      <li className={'inline-block mr-3 sm:mr-2'}>
                        <a
                          href={data.settings.social_link_youtube}
                          className={'text-sm flex gtm:social-clickout hover:opacity-75 transition-fast cursor-pointer no-underline'}
                          title={'YouTube'}
                          target={'_self'}
                        >
                        </a>
                      </li>
                      : null
                    }

                    {data.settings.social_link_instagram ?
                      <li className={'inline-block'}>
                        <a
                          href={data.settings.social_link_instagram}
                          className={'text-sm flex gtm:social-clickout hover:opacity-75 transition-fast cursor-pointer no-underline'}
                          title={'Instagram'}
                          target={'_self'}
                        >
                          <Snippets.Icon name={'instagram'} width={20} height={20} label="instagram" />
                        </a>
                      </li>
                      : null
                    }

                  </ul>
                </div>
                : null
              }
            </div>

            {section.settings.subscribe_form_enabled || section.settings.acknowledgement ?
              <div className={'xl:w-1/2 w-full xl:mb-0 mb-3-2 xl:pl-1-2'}>
                {section.settings.subscribe_form_enabled ?
                  <Snippets.SubscribeForm
                    {...this.props}
                    enabled={!window.location.href.includes('challenge#contact_form')}
                    hideLabel={true}
                    className={''}
                    title={section.settings.subscribe_title}
                  />
                  : null}
                {this.props.data.shop.permanent_domain == 'lopu-shop.myshopify.com' && (
                  <div>
                    {
                      section.settings.acknowledgement_title && (
                        <Snippets.Heading className={'text-base mt-3 leading-base opacity-75'} tag={'h2'}>
                          {section.settings.acknowledgement_title}
                        </Snippets.Heading>
                      )
                    }
                    <hr className={'mt-2'} />
                    {section.settings.acknowledgement && (
                      <Snippets.RichText className={'text-sm mt-2-3 leading-base opacity-75'} size={6}>
                        {section.settings.acknowledgement}
                      </Snippets.RichText>
                    )
                    }
                  </div>
                )
                }
              </div>
              : null
            }
          </div>

          <div className={'flex flex-wrap items-center 2xl:flex-row flex-col-reverse'}>
            <div className={'w-full 2xl:w-1/2 sm:text-left text-center'}>
              {section.settings.copyright ?
                <Snippets.RichText className={'text-sm leading-base'} size={6}>
                  {section.settings.copyright}
                </Snippets.RichText>
                : null}
            </div>
            <div className={'w-full 2xl:w-1/2 2xl:pb-0 sm:pb-3-2 pb-2'}>
              {section.settings.payment_icons_enabled ?
                <Snippets.PaymentIcons
                  methods={data.settings.payment_methods}
                  footer={section.settings}
                  wrap
                />
                : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export namespace Footer {
  export type Options = ShopifyNext.Section<{
    footer_menu: string;
    copyright: string;
    subscribe_title: string;
    social_icons_text: string;
    social_icons_enabled: boolean;
    subscribe_form_enabled: boolean;
    payment_icons_enabled: boolean;
    show_instagram: boolean;
    acknowledgement: string;
    acknowledgement_title: string;
  }>;
  export interface Props extends GlobalProps {
    section: Footer.Options;
    data: any;
  }
  export interface State {
    isPopup: boolean;
    locatorQuery: string;
    bottom: boolean;
  }
}
