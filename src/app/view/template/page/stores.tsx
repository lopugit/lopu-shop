import * as React from 'react'
import { GlobalProps } from 'types'
import { StoreLocator as ReactiveStoreLocator, DeveloperToolkit as ReactiveStoreLocatorDeveloperToolkit, clusterPinBuilder, useStorelocatorAutocomplete } from '@dotdev/reactive-storelocator'
import * as Layouts from 'layouts'
import * as Sections from 'sections'
import * as Snippets from 'snippets'

export const StoresPageTemplate: React.FC<StoresPageTemplate.Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [storeLocator, setStoreLocator] = React.useState<ReactiveStoreLocator | null>(null)
  const [config, setConfig] = React.useState<ReactiveStoreLocatorDeveloperToolkit.Config | null>(null)

  React.useEffect(() => {
    const getConfig = async () => {
      const _config = await ReactiveStoreLocatorDeveloperToolkit.fetchConfig('/apps/toolkit/store-locator/configuration')
      const _storeLocator = new ReactiveStoreLocator({
        googleMapsApiKey: _config.googleMapsAPIKey,
        googleMapsApiVersion: '3.37',
        fetchData: (query) =>
          ReactiveStoreLocatorDeveloperToolkit.fetchData(
            _config,
            ReactiveStoreLocator.buildElasticsearchQuery(Number(_config.resultsPerPage), 0, { ...query })
          ),
        parseData: (locations) => {
          return locations.map((location) => ({
            id: location.id,
            title: location.shopName,
            icon: `data:image/svg+xml;charset=UTF-8;base64,${btoa(Snippets.Icon.toString({ name: 'location_pin', width: 32 }))}`,
            position: {
              lat: Number(location.location.lat),
              lng: Number(location.location.lon)
            },
            attributes: location
          }))
        }
      })
      setConfig(_config)
      setStoreLocator(_storeLocator)
    }
    getConfig()
    setLoading(false)
  }, [])

  return (
    <Layouts.Theme {...props}>
      {storeLocator ? (
        <ReactiveStoreLocator.Provider storeLocator={storeLocator}>
          <Sections.StoreLocator
            {...props}
            loading={loading}
            config={config}
            storeLocator={storeLocator}
          />
        </ReactiveStoreLocator.Provider>
      ) : null}
    </Layouts.Theme>
  )
}

export namespace StoresPageTemplate {
  export interface Props extends GlobalProps { }
}
