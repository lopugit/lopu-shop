import * as React from 'react'
import { GlobalProps } from 'types'
import * as Layouts from 'layouts'
import * as Snippets from 'snippets'

export class StylesPageTemplate extends React.Component<StylesPageTemplate.Props, StylesPageTemplate.State> {
  public render(): JSX.Element {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    const icons = ['search', 'account', 'bag', 'envelope', 'filter', 'heart_fill']
    const colours = [
      {
        hex: '#fff',
        rgb: 'rgb(255, 255, 255)',
        name: 'white',
        bg: 'bg-white',
        text: 'text-black',
      },
      {
        hex: '#000',
        rgb: 'rgb(0, 0, 0)',
        name: 'black',
        bg: 'bg-black',
        text: 'text-white',
      },
      {
        hex: '#e9e6e1',
        rgb: 'rgb(233, 230, 225)',
        name: 'grey',
        bg: 'bg-grey',
        text: 'text-black',
      },
      {
        hex: '#e8e4e4',
        rgb: 'rgb(232, 228, 228)',
        name: 'grey-border',
        bg: 'bg-grey-border',
        text: 'text-black',
      },
      {
        hex: '#E33636',
        rgb: 'rgb(227, 54, 54)',
        name: 'error',
        bg: 'bg-error',
        text: 'text-white',
      },
    ]
    return (
      <Layouts.Theme {...this.props}>
        <main>
        {this.props.data.page ? <Snippets.PageTitle title={this.props.data.page.title} content={null} /> : null}
        <section className={'px-8 py-12'}>
          <div className={'mx-auto max-w-6xl content'}>
            <div className={'flex flex-wrap lg:flex-no-wrap'}>
              <div className={'w-full'}>
                {headings.map((heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => (
                  <React.Fragment key={heading}>
                    <h5 className={'font-semi-bold'}>{heading}</h5>
                    <Snippets.Heading tag={heading} className={'sm:text-5xl border'}>
                      The quick brown fox jumps over the lazy dog
                    </Snippets.Heading>
                    <hr className={'border-b my-5'} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={'px-8 py-12'}>
          <div className={'mx-auto  max-w-6xl content'}>
            <div className={'flex flex-wrap lg:flex-no-wrap'}>
              <div className={'w-full'}>
                {icons.map((icon: 'magnifying_glass' | 'account_icon') => (
                  <div className={'flex items-center'} key={icon}>
                    <span className={'flex-shrink'}>
                      <Snippets.Icon name={icon} width={50} />
                    </span>
                    <span className={'flex-auto pl-4 text-left'}>
                      <code className={'inline-block align-middle'}>{`<Snippets.Icon name={"${icon}"} width={50}/>`}</code>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={'px-8 py-12'}>
          <div className={'mx-auto  max-w-6xl'}>
            <div className={'flex flex-wrap'}>
              <div className={'w-full mb-6'}>
                <h2 className={'mb-3'}>Colour</h2>
              </div>
              <div className={'w-full'}>
                <div className={'flex flex-wrap'}>
                  {colours.map((colour) => (
                    <div 
                      className={`w-1/3 ${colour.bg} ${colour.text} p-4 pb-8`} 
                      key={colour.name}
                    >
                      <p className={'text-3xl font-bold'}>{colour.name}</p>
                      <p className={'text-md'}>{`${colour.hex}`}</p>
                      <p className={'text-md'}>{colour.rgb}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={'px-8 py-12'}>
          <div className={'mx-auto max-w-6xl content'}>
            <div className={'flex flex-wrap lg:flex-no-wrap -mx-4'}>
              <div className={'w-1/3 px-4'}>
                <h2 className={'mb-3'}>UI Components</h2>
                <h4 className={'uppercase'}>Buttons</h4>
                <p>
                  Buttons are used to accentuate call to actions and drive users in a targeted direction. An array of buttons are used
                  throughout the site, raning from slim and de-emphasised to large and bold. An 0.2s animation is to be used on and off
                  hover of all buttons. Text links within body copy and the footer will display an underline with an 0.2s animation also.
                </p>
              </div>
              <div className={'w-2/3 px-4'}>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button
                    title={'Primary'}
                    colour={'primary'}
                  >
                    {'Primary'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button
                    title={'Disabled'}
                    colour={'primary'} 
                    disabled={true}
                  >
                    {'Disabled'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button 
                    colour={'primary-reverse'}
                    title={'Reverse'}
                  >
                    {'Reverse'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button 
                    colour={'primary-reverse'} 
                    disabled={true}
                    title={'Disabled'}
                  >
                    {'Disabled'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button
                    title={'Secondary'}
                    colour={'secondary'}
                  >
                    {'Secondary'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button
                    title={'Disabled'}
                    colour={'secondary'} 
                    disabled={true}
                  >
                    {'Disabled'}
                  </Snippets.Button>
                </div>
              </div>
            </div>
            <div className={'flex flex-wrap lg:flex-no-wrap -mx-4'}>
              <div className={'w-1/3 px-4'} />
              <div className={'w-2/3 px-4 pt-4 bg-grey-400'}>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button
                    title={'Primary Reversed'}
                    colour={'primary-reverse'}
                  >
                    {'Primary Reversed'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button 
                    colour={'primary-reverse'} 
                    disabled={true}
                    title={'Disabled'}
                  >
                    {'Disabled'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button 
                    colour={'secondary-reverse'}
                    title={'Secondary Reversed'}
                  >
                    {'Secondary Reversed'}
                  </Snippets.Button>
                </div>
                <div className={'w-1/2 inline-block mb-5'}>
                  <Snippets.Button 
                    title={'Secondary Reversed'}
                    colour={'secondary-reverse'} 
                    disabled={true}
                  >
                    {'Secondary Reversed'}
                  </Snippets.Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={'px-8 py-12'}>
          <div className={'mx-auto max-w-6xl content'}>
            <div className={'flex flex-wrap lg:flex-no-wrap'}>
              <div className={'w-full lg:w-1/3'}>
                <h4 className={'uppercase'}>Forms</h4>
                <p>
                  Forms are based on the Google Material Design principles. These have been selected as they are a web standard for forms
                  and have had extensive testing on usability.
                </p>
                <p>When the field is active or complete it will have a drop shadow and no border.</p>
                <p>When entered content has failed to validate the field will have a red underline.</p>
              </div>
              <div className={'w-2/3 lg:ml-10 p-6 bg-grey-200'}>
                <div className={'mb-5'}>
                  <Snippets.Input placeholder={'Email'} type={'email'} hideLabel={true} 
                    className={'border border-black py-1-6 pl-0'}/>
                  <span className={'text-sm font-bold mb-4 inline-block'}>Text field - Resting</span>
                  <Snippets.Input type={'email'} className={'border border-black py-1-6 pl-0'} hideLabel={true} placeholder={'george@dotdev.com.au'} />
                  <span className={'text-sm font-bold mb-4 inline-block'}>Text field - Active</span>
                  <label className={'text-grey-darker block text-sm mb-2'}>Topic</label>
                  <div className={'relative'}>
                    <select
                      className={
                        'bg-white py-2-7 rounded-none border border-black font-normal text-grey-darker appearance-none px-1-6 w-full outline-none'
                      }
                    >
                      <option>Message</option>
                      <option>Message</option>
                      <option>Message</option>
                      <option>Message</option>
                    </select>
                    <div className={'pointer-events-none absolute inset-y-0 right-0 flex items-center px-1-6 text-black'}>
                      <Snippets.Icon name={'chevron_down'} width={20} />
                    </div>
                  </div>
                  <Snippets.Button
                    title={'Submit'}
                    type={'submit'}
                    className={'w-full uppercase py-0-8 flex items-center'}
                  >
                    <span className={'flex-1 text-left'}>{'Submit'}</span>
                    <Snippets.Icon name={'arrow_right'} width={40} />
                  </Snippets.Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>
      </Layouts.Theme>
    )
  }
}

export namespace StylesPageTemplate {
  export interface Props extends GlobalProps {}
  export interface State {}
}
