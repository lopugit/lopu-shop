import * as React from 'react'
import * as Snippets from 'snippets'

export class SocialIcons extends React.PureComponent<SocialIcons.Props> {
  public render(): JSX.Element {
    const { enabled, settings, title } = this.props

    const socialPlatforms: string[] = [
      'facebook',
      'instagram',
      'twitter',
      'linkedin',
      'pinterest',
      'snapchat',
      'tumblr',
      'vimeo',
      'youtube',
      'wechat'
    ]

    return enabled ? (
      <div id="social" className={`${this.props.className ? this.props.className : ''}`}>
        {title ? (
          <Snippets.Heading 
            size={'h3'} 
            tag={'h4'}
            className={'mb-1'}
          >
            {title}
          </Snippets.Heading>
        ) : null}
        <ul className={'list-reset flex items-center justify-center'}>
          {this.buildItems(socialPlatforms, settings)}
        </ul>
      </div>
    ) : null
  }

  private buildItems = (items: any[], settings: any): JSX.Element[] => {
    return items
      ? items.map(
        (item: any, i: number): JSX.Element => {
          return settings[`social_link_${item}`] ? (
            <li key={i} className={'block p-1'}>
              <a 
                href={settings[`social_link_${item}`]} 
                target={'_blank'} 
                className={'block transition-fast hover:opacity-50'}
                aria-label={item}
              >
                <Snippets.Icon name={item} width={20} />
              </a>
            </li>
          ) : null
        }
      )
      : []
  };
}

export namespace SocialIcons {
  export interface Props {
    className?: string;
    enabled: boolean;
    settings: any;
    title?: string;
  }
}
