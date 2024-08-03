
import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import PropTypes from 'prop-types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map = ({ getAddress, initialCenter, deliveryAddress }) => {
  const apiKey = "AIzaSyAVRhqYufDIQ052VXn8vA_lH8BWu3v3a2s";  // Replace with your actual API key

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [address, setAddress] = useState('');

  const onLoad = useCallback(function callback(map) {
    map.setCenter(initialCenter);
    setMap(map);
  }, [initialCenter]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerDragEnd = useCallback(async (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPosition(newPosition);
    getGeocode(newPosition);
    deliveryAddress(newPosition.lat+"|"+newPosition.lng);
    localStorage.setItem('mapLat', newPosition.lat);
    localStorage.setItem('mapLng', newPosition.lng);
  }, [map]);

  const getGeocode = async ({ lat, lng }) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.status === 'OK') {
        const results = response.data.results;
        if (results.length > 0) {
          const address = results[0].formatted_address;
          setAddress(address);
          getAddress(address, markerPosition);
          // console.log('Address:', address); // Log the address to console
        } else {
          setAddress('No address found');
        }
      } else {
        setAddress('Geocode was not successful for the following reason: ' + response.data.status);
      }
    } catch (error) {
      setAddress('Geocode request failed: ' + error.message);
    }
  };

  useEffect(() => {
    if (map) {
      const { Marker } = window.google.maps;

      const marker = new Marker({
        position: markerPosition,
        map,
        draggable: true
      });

      marker.addListener('dragend', onMarkerDragEnd);

      return () => {
        marker.setMap(null);
      };
    }
  }, [map, markerPosition, onMarkerDragEnd]);

  return isLoaded ? (
    <div className='w-full h-full'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
        }}
      >
      </GoogleMap>
    </div>
  ) : <></>;
}

Map.propTypes = {
  getAddress: PropTypes.func.isRequired,
  initialCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
};

export default React.memo(Map);
