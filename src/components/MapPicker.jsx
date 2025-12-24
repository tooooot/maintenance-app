import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, defaultCenter, mapContainerStyle, mapOptions } from '../config/maps'

function MapPicker({ onLocationSelect, initialLocation }) {
    const [selectedLocation, setSelectedLocation] = useState(initialLocation || defaultCenter)
    const [address, setAddress] = useState('')
    const [gpsStatus, setGpsStatus] = useState('idle') // idle, loading, success, failed

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

        // Clear GPS failed status when user manually selects location
        if (gpsStatus === 'failed') {
            setGpsStatus('idle')
        }

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
    }, [onLocationSelect, gpsStatus])

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setGpsStatus('loading')
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    setSelectedLocation(newLocation)
                    setGpsStatus('success')

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
                    setGpsStatus('failed')
                    // Don't show alert - let the UI guide the user instead
                }
            )
        } else {
            setGpsStatus('failed')
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
                disabled={gpsStatus === 'loading'}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: gpsStatus === 'loading' ? '#999' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: gpsStatus === 'loading' ? 'not-allowed' : 'pointer',
                    marginBottom: '15px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                }}
            >
                {gpsStatus === 'loading' ? '⏳ جاري تحديد الموقع...' : '📍 استخدام موقعي الحالي'}
            </button>

            {/* GPS Failed - Fallback Message */}
            {gpsStatus === 'failed' && (
                <div style={{
                    padding: '15px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🗺️</div>
                    <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '5px' }}>
                        لم نتمكن من تحديد موقعك تلقائياً
                    </strong>
                    <p style={{ margin: '0', fontSize: '0.95rem', opacity: 0.95 }}>
                        👇 يرجى النقر على الخريطة أدناه لتحديد موقعك يدوياً
                    </p>
                </div>
            )}

            {/* Map Container with Highlight on GPS Failure */}
            <div style={{
                border: gpsStatus === 'failed' ? '3px solid #667eea' : '2px solid #ddd',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: gpsStatus === 'failed'
                    ? '0 0 20px rgba(102, 126, 234, 0.5)'
                    : '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
            }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={selectedLocation}
                    zoom={15}
                    onClick={onMapClick}
                    options={mapOptions}
                >
                    <Marker position={selectedLocation} />
                </GoogleMap>
            </div>

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
                color: gpsStatus === 'failed' ? '#667eea' : '#666',
                textAlign: 'center',
                fontWeight: gpsStatus === 'failed' ? 'bold' : 'normal',
                transition: 'all 0.3s ease'
            }}>
                💡 انقر على الخريطة لتحديد الموقع بدقة
            </p>

            {/* Add CSS animation for pulse effect */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.02);
                    }
                }
            `}</style>
        </div>
    )
}

export default MapPicker
