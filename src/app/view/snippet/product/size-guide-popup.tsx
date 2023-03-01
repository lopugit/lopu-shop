import * as React from 'react'
import * as Snippets from 'snippets'

export class SizeGuidePopup extends React.PureComponent<SizeGuidePopup.Props> {
  public render(): JSX.Element {
    const { section, sizeGuidePopupType, visible, handleSizeGuidePopup } = this.props

    const desktopSrc = sizeGuidePopupType === 'outwear' ? section?.settings?.outwear_size_guide_desktop : sizeGuidePopupType === 'footwear' ? section?.settings?.footwear_size_guide_desktop : null
    const mobileSrc = sizeGuidePopupType === 'outwear' ? section?.settings?.outwear_size_guide_mobile : sizeGuidePopupType === 'footwear' ? section?.settings?.footwear_size_guide_mobile : null
    const alt = sizeGuidePopupType === 'outwear' ? 'Outwear size guide' : sizeGuidePopupType === 'footwear' ? 'Footwear size guide' : 'Size guide'

    return section?.settings ? (
      <div role="dialog" className={'fixed inset-0 z-40 items-center md:items-start justify-center ' + (visible ? 'flex' : 'hidden')}>
        <div className={'cursor-pointer absolute bg-black opacity-50 inset-0 z-40'} onClick={() => handleSizeGuidePopup(false)} />
        <div className={'md:mx-3-2 md:mt-12 md:max-w-popup z-50'}>
          <div className={'bg-white relative w-full'}>
            <div className={'absolute right-0 top-0 h-4 w-4 flex items-center justify-center z-10'}>
              <Snippets.Button
                colour={'blank'}
                className={'underline'}
                type={'button'}
                title={'Close popup'}
                onClick={() => handleSizeGuidePopup(false)}
              >
                <Snippets.Icon name={'cross'} width={14} height={14} />
              </Snippets.Button>
            </div>
            <div className={'w-full'}>
              <div className={'w-full flex flex-col justify-center items-center text-center'}>
                <div className={'hidden md:block'} style={{ maxWidth: '800px' }}>
                  <Snippets.Image
                    src={desktopSrc}
                    alt={alt}
                    width={2000}
                    ratio={'natural'}
                    preventLazy={true}
                  />
                </div>
                <div className={'md:hidden'} style={{ maxWidth: '312px' }}>
                  <Snippets.Image
                    src={mobileSrc}
                    alt={alt}
                    width={2000}
                    ratio={'natural'}
                    preventLazy={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }

  private htmlDecode = (input) => {
    const e = document.createElement('textarea')
    e.innerHTML = input
    // handle case of empty input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }
}

export namespace SizeGuidePopup {
  export interface Props {
    section: any;
    sizeGuidePopupType: string | null;
    visible: boolean;
    handleSizeGuidePopup: (show: boolean) => void;
  }
}
