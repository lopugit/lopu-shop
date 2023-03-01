import * as React from 'react'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'
import { GlobalProps } from 'types'
import { StoreLocator as ReactiveStoreLocator, DeveloperToolkit as ReactiveStoreLocatorDeveloperToolkit, clusterPinBuilder, useStorelocatorAutocomplete } from '@dotdev/reactive-storelocator'
import { GoogleMap } from '@dotdev/reactive-google-map'

declare const STORE_LOCATOR_MAP_COUNTRY: string

export const StoreLocator: React.FC<StoreLocator.Props> = ({ loading, config, storeLocator }) => {
  const [hoverBox, setHoverBox] = React.useState<string | null>(null)

  const autocomplete = useStorelocatorAutocomplete({
    types: ['(regions)']
  })

  return (
    <main className={'max-w-container mx-auto flex flex-wrap px-1-6 md:px-0 pb-4 md:pb-0'}>
      <Snippets.Heading
        size={'h1'}
        tag={'h1'}
        className={'w-full text-center md:leading-tight mt-3-2 mb-3-2 md:mt-3-9 md:mb-4-8'}
      >
        Find a store or stockist
      </Snippets.Heading>
      {!loading && config && storeLocator ? (
        <>
          <div className={'w-full flex flex-col-reverse md:flex-row justify-center items-center mb-1-2 md:mb-4-8'}>
            <form
              className="w-full w-full md:max-w-39-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (autocomplete.suggestions.data.length === 0) {
                  return
                }
                autocomplete.setValue(autocomplete.suggestions.data[0].description)
                autocomplete.setSuggestion(autocomplete.suggestions.data[0].place_id)
              }}
            >
              <div className={'relative'}>
                <Snippets.Input
                  value={autocomplete.value}
                  onChange={(event) => autocomplete.setValue(event.target.value)}
                  label="Postcode or Suburb"
                  placeholder="Postcode or Suburb"
                  hideLabel
                  type="text"
                  className={'w-full h-6 px-1-6 border border-grey-border text-black text-base'}
                />
                <ul className="absolute top-full w-full z-20 border-r border-l border-grey-border">
                  {autocomplete.suggestions.data[0]?.description === autocomplete.value ? null : autocomplete.suggestions.data.map((suggestion) => (
                    <li className="transition bg-white hover:bg-grey w-full border-b border-grey-border" key={suggestion.place_id}>
                      <button
                        className="p-2 outline-none focus:outline-none w-full text-left"
                        onClick={() => {
                          autocomplete.setValue(suggestion.description)
                          autocomplete.setSuggestion(suggestion.place_id)
                        }}
                      >
                        {suggestion.description}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="submit"
                  className={'absolute right-0 top-0 bottom-0 flex items-center pr-1 outline-none focus:outline-none'}
                >
                  <Snippets.Icon name={'magnifying_glass'} width={40} />
                </button>
              </div>
            </form>
            <span className={'pl-1-8 pr-2-6 pt-1-6 pb-1-4 block text-base font-light uppercase leading-close tracking-wider'}>OR</span>

            <ReactiveStoreLocator.Geolocate
              className={'w-full md:max-w-24-4'}
            >
              {(loading, error) => (
                <Snippets.Button
                  title={'Search by current location'}
                  className={'h-6 w-full'}
                >
                  <Snippets.Heading size={'h5'} tag={'p'}>
                    {loading ? 'Finding your location' : 'use my location'}
                  </Snippets.Heading>
                </Snippets.Button>
              )}
            </ReactiveStoreLocator.Geolocate>
          </div>

          <div className={'w-full flex flex-col-reverse xs:flex-row'}>
            <div className={'w-full md:max-w-43-6 md:ml-3-6 md:mr-2-4 md:border-t border-grey-border md:h-83 overflow-y-scroll'}>
              <ReactiveStoreLocator.List>
                {(location, selected) => {
                  return (
                    <div
                      onMouseEnter={() => setHoverBox(location.id)}
                      onMouseLeave={() => setHoverBox('')}
                      className={`relative flex flex-row w-full text-left border-b border-grey-border pt-3-2 pb-2-4 ${hoverBox && hoverBox == location.id ? 'bg-grey' : 'bg-transparent '} relative`}
                    >
                      <Snippets.Icon name={'location'} width={40} height={40} className={'absolute mt-2-3 left-0 top-0'} />
                      <Snippets.StoreLocatorDetail className={'pl-5-7'} location={location} selectLocation={storeLocator.selectLocation} />
                    </div>
                  )
                }}
              </ReactiveStoreLocator.List>
            </div>
            <div className={'w-full block'}>
              <ReactiveStoreLocator.Map
                style={{
                  width: '100%',
                  height: `${window.innerWidth > 500 ? '830px' : '570px'}`
                }}
                clusterOptions={{
                  styles: [
                    {
                      textColor: 'white',
                      url: clusterPinBuilder('#55565b'),
                      height: 50,
                      width: 50
                    }
                  ],
                  maxZoom: 11,
                  averageCenter: true
                }}
                googleMapsOptions={{
                  center: {
                    lat: config.mapInitialLocationLat,
                    lng: config.mapInitialLocationLng
                  },
                  zoom: parseInt(config.mapInitialZoom, 10),
                  maxZoom: 14,
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false,
                  styles: config.googleMapsJSONStyle
                }}
                infowindowContent={location => (
                  <div className="w-20 md:w-25-5 pl-0-5 pt-0-6">
                    <LocationInfoWindow location={location} />
                  </div>
                )}
              />
            </div>
          </div>
        </>
      ) : (
        <React.Fragment>
          <div className={'w-full flex flex-col-reverse md:flex-row justify-center items-center md:mb-4-8'}>
            <div className={'relative w-full md:max-w-39-2'}>
              <input
                className={'w-full h-6 px-1-6 border border-grey-border text-black text-base'}
                placeholder={'Postcode or suburb'}
              />
              <Snippets.Button
                title={'Search by Postcode'}
                colour={'blank'}
                className={'absolute right-0 top-0 pt-1 pr-1'}
              >
                <Snippets.Icon name={'magnifying_glass'} width={40} />
              </Snippets.Button>
            </div>
            <span className={'pl-1-8 pr-2-6 pt-1-6 pb-1-4 block text-base font-light uppercase leading-close tracking-wider'}>OR</span>

            <div
              className={'w-full md:max-w-24-4'}
            >
              <Snippets.Button
                title={'Search by current location'}
                className={'h-6 w-full'}
              >
                <Snippets.Heading size={'h5'} tag={'p'}>
                  {'use my location'}
                </Snippets.Heading>
              </Snippets.Button>
            </div>
          </div>

          <div className={'w-full flex flex-row'}>
            <div className={'w-full max-w-43-6 md:ml-3-6 md:mr-2-4 md:border-t border-grey-border h-60 overflow-y-scroll'}>
              {[1, 2].map(i => <div
                key={i}
                className={'relative flex flex-row w-full text-left border-b border-grey-border pt-3-2 pb-2-4 relative'}
              >
                <Snippets.Icon name={'location'} width={40} height={40} className={'absolute mt-2-3 left-0 top-0'} />
                <div className={'pl-5-7 flex flex-col w-full'}>
                  <div className={'flex flex-col w-full'}>
                    <div className={'content-placeholder w-2/3 inline h-1-8 mt-0-1 mb-1-7'} />
                    <div className={'content-placeholder w-2/3 inline h-1-8 my-0-1'} />
                    <div className={'content-placeholder w-3/4 inline h-1-8 my-0-1'} />
                    <div className={'content-placeholder w-3/4 inline h-1-8 my-0-1'} />
                  </div>

                  <div className={'mt-0-9 flex flex-col w-full'}>
                    <div className={'content-placeholder w-2/3 h-1-8 my-0-1'} />
                    <div className={'content-placeholder w-2/3 h-1-8 my-0-1'} />
                  </div>
                </div>
              </div>)}
            </div>
            <div className={'content-placeholder w-full hidden md:block h-60'} />
          </div>
        </React.Fragment>
      )}
    </main>
  )
}

const LocationInfoWindow: React.FC<{
  location: GoogleMap.Marker<any>
}> = ({ location }) => (
  <div className={'w-full'}>
    <Snippets.StoreLocatorDetailForm id={location.id} attributes={location.attributes} />

    {location.attributes.description && (
      <div
        className={'ratio-2:1 mt-2 bg-center bg-cover'}
        style={{ backgroundImage: `url('${location.attributes.description}')` }}
      />
    )}

    <Snippets.Button
      title={`Get Direction to ${location.attributes.shopName}`}
      colour={'secondary'}
      href={`https://www.google.com/maps?saddr=My+Location&daddr=${location.attributes.address1}+${location.attributes.suburb}+${location.attributes.state}+${location.attributes.postcode}`}
      target="_blank"
      className={'w-full flex h-4-8 justify-center items-center mt-2'}
    >
      <Snippets.Heading size={'h5'} tag={'p'}>Get Direction</Snippets.Heading>
    </Snippets.Button>
  </div>
)
export namespace StoreLocator {
  export interface Props extends GlobalProps {
    loading: boolean
    config: ReactiveStoreLocatorDeveloperToolkit.Config | null
    storeLocator: ReactiveStoreLocator | null
  }
}