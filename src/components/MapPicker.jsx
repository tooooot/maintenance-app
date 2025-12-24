import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, defaultCenter, mapContainerStyle, mapOptions } from '../config/maps'

function MapPicker({ onLocationSelect, initialLocation }) {
    const [selectedLocation, setSelectedLocation] = useState(initialLocation || defaultCenter)
    const [address, setAddress] = useState('')

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    const onMapClick = useCallback((e) => {
        const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }
        setSelectedLocation(newLocation)

        // Immediately call onLocationSelect with coordinates
        onLocationSelect({
            ...newLocation,
            address: 'جاري تحديد العنوان...'
        })

        // Reverse geocoding to get address (async)
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: newLocation }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const formattedAddress = results[0].formatted_address
                setAddress(formattedAddress)
                // Update with actual address
                onLocationSelect({
                    ...newLocation,
                    address: formattedAddress
                })
            } else {
                // If geocoding fails, use coordinates as address
                const coordsAddress = `${newLocation.lat.toFixed(6)}, ${newLocation.lng.toFixed(6)}`
                setAddress(coordsAddress)
                onLocationSelect({
                    ...newLocation,
                    address: coordsAddress
                })
            }
        })
    }, [onLocationSelect])

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    setSelectedLocation(newLocation)

                    // Immediately call onLocationSelect with coordinates
                    onLocationSelect({
                        ...newLocation,
                        address: 'جاري تحديد العنوان...'
                    })

                    // Get address (async)
                    const geocoder = new window.google.maps.Geocoder()
                    geocoder.geocode({ location: newLocation }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            const formattedAddress = results[0].formatted_address
                            setAddress(formattedAddress)
                            // Update with actual address
                            onLocationSelect({
                                ...newLocation,
                                address: formattedAddress
                            })
                        } else {
                            // If geocoding fails, use coordinates
                            const coordsAddress = `${newLocation.lat.toFixed(6)}, ${newLocation.lng.toFixed(6)}`
                            setAddress(coordsAddress)
                            onLocationSelect({
                                ...newLocation,
                                address: coordsAddress
                            })
                        }
                    })
                },
                (error) => {
                    console.error('Error getting location:', error)
                    alert('لم نتمكن من الحصول على موقعك. يرجى تحديد الموقع على الخريطة.')
                }
            )
        } else {
            alert('المتصفح لا يدعم تحديد الموقع')
        }
    }

    if (!isLoaded) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>جاري تحميل الخريطة...</div>
    }

    return (
        <div className="map-picker">
            <button
                type="button"
                className="location-btn"
                onClick={getCurrentLocation}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '1rem'
                }}
            >
                📍 استخدام موقعي الحالي
            </button>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedLocation}
                zoom={15}
                onClick={onMapClick}
                options={mapOptions}
            >
                <Marker position={selectedLocation} />
            </GoogleMap>

            {address && (
                <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: '#e8f5e9',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <strong>الموقع المحدد:</strong><br />
                    {address}
                </div>
            )}

            <p style={{
                marginTop: '10px',
                fontSize: '0.9rem',
                color: '#666',
                textAlign: 'center'
            }}>
                💡 انقر على الخريطة لتحديد الموقع بدقة
            </p>
        </div>
    )
}

export default MapPicker
