import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MarkerItem from './MarkerItem'

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10
}

function GoogleMapSection({ coordinates, listing }) {
  const [center, setCenter] = useState({
    lat: 40.730610,
    lng: -73.935242
  })
  const [map, setMap] = useState(null)

  // ✅ Asegúrate de cargar la API correctamente
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
  })

  useEffect(() => {
    if (coordinates) {
      setCenter(coordinates)
    }
  }, [coordinates])

  useEffect(() => {
    if (map) {
      map.setZoom(10)
    }
  }, [map])

  const onLoad = useCallback(function callback(mapInstance) {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds(center)
      mapInstance.fitBounds(bounds)
      setMap(mapInstance)
    }
  }, [center])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  // ✅ Esperar a que cargue
  if (!isLoaded) {
    return <div>Cargando mapa...</div>
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={map => setMap(map)}

        onUnmount={onUnmount}
        gestureHandling="greedy"
      >
        { /* Child components, such as markers, info windows, etc. */}
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
