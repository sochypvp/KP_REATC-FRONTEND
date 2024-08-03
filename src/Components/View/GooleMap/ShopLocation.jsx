import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const ShopLocation = ({ zoomLevel }) => {
  const apiKey = "AIzaSyAVRhqYufDIQ052VXn8vA_lH8BWu3v3a2s"; // Replace with your actual API key
  const initialCenter = {lat: 11.0828104350322,lng: 105.79920555542363};
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      const { Marker } = window.google.maps;

      const marker = new Marker({
        position: markerPosition,
        map,
        draggable: false,
      });

      return () => {
        marker.setMap(null);
      };
    }
  }, [map, markerPosition]);

  return isLoaded ? (
    <div className='w-full h-full'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={zoomLevel}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  ) : <></>;
};

ShopLocation.propTypes = {
  zoomLevel: PropTypes.number
};

ShopLocation.defaultProps = {
  zoomLevel: 10
};

export default React.memo(ShopLocation);
