'use client';

import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GooglePlacesAutocomplete = dynamic(
    () => import('react-google-places-autocomplete'),
    { ssr: false }
);

export default function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
    return (
        <div className="flex items-center w-full">
            <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-100" />
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    placeholder: 'Buscar dirección de propiedad',
                    isClearable: true,
                    className: 'w-full',
                    onChange: (place) => {
                        console.log(place);

                        // ⚡ Siempre propaga el valor a selectedAddress (null o no)
                        selectedAddress(place);

                        // ⚡ Si es null (por limpiar), no hagas geocode
                        if (place && place.label) {
                            geocodeByAddress(place.label)
                                .then(results => getLatLng(results[0]))
                                .then(({ lat, lng }) => {
                                    console.log(lat, lng);
                                    setCoordinates({ lat, lng });
                                })
                                .catch(error => console.error('Error obteniendo lat/lng:', error));
                        } else {
                            // Si limpian la dirección, opcional: limpiar coordenadas
                            setCoordinates(null);
                        }
                    },
                }}
            />
        </div>
    );
}
