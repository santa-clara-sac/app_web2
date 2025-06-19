'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MarkerItem from './MarkerItem'

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10
}

function GoogleMapSection({ coordinates, listing }) {
  const [map, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
  })

  const onLoad = useCallback(function callback(mapInstance) {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds(
        { lat: -17.0, lng: -80.0 }, // suroeste (ajustado)
        { lat: -1.5, lng: -69.0 }   // noreste (ajustado)
      )
      mapInstance.fitBounds(bounds)
      setMap(mapInstance)
    }
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <div>Cargando mapa...</div>
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        gestureHandling="greedy"
      >
        {listing.map((item, index) => (
          <MarkerItem
            key={index}
            item={item}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default React.memo(GoogleMapSection)
