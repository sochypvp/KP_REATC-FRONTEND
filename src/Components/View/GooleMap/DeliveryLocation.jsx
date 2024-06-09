// import React, { useCallback, useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// const containerStyle = {
//   width: '100%',
//   height: '100%'
// };


// const DeliveryLocation = ({ getMarkLocation,getAddress,initialCenter }) => {


//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyAVRhqYufDIQ052VXn8vA_lH8BWu3v3a2s"  // Replace with your actual API key
//   });

//   const [map, setMap] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState(initialCenter);
//   const [address, setAddress] = useState('');

//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(initialCenter);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const onMarkerDragEnd = useCallback(async (event) => {
//     const newPosition = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng()
//     };
//     setMarkerPosition(newPosition);
//     getGeocode(newPosition);
//     getMarkLocation(newPosition); 
//   }, [address, markerPosition]);

//   const getGeocode = async ({ lat, lng }) => {
//     const geocodeApiKey = "AIzaSyAVRhqYufDIQ052VXn8vA_lH8BWu3v3a2s";  // Replace with your actual API key
//     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodeApiKey}`;

//     try {
//       const response = await axios.get(geocodeUrl);
//       if (response.data.status === 'OK') {
//         const results = response.data.results;
//         if (results.length > 0) {
//           const address = results[0].formatted_address;
//           setAddress(address);
//           getAddress(address);
          
//         } else {
//           setAddress('No address found');
//         }
//       } else {
//         setAddress('Geocode was not successful for the following reason: ' + response.data.status);
//       }
//     } catch (error) {
//       setAddress('Geocode request failed: ' + error.message);
//     }
//   };

//   useEffect(() => {
//     if (map) {
//       const { Marker } = window.google.maps;

//       const marker = new Marker({
//         position: markerPosition,
//         map,
//         draggable: true
//       });

//       marker.addListener('dragend', onMarkerDragEnd);

//       return () => {
//         marker.setMap(null);
//       };

//     }
//   }, [map, markerPosition, onMarkerDragEnd]);


//   return isLoaded ? (
//     <div className='w-full h-full'>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={markerPosition}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{
//           streetViewControl: false,
//         }}
//       >
//       </GoogleMap>
//       {/* <div>
//         <h3>Marker Address:</h3>
//         <p>{address}</p>
//       </div> */}
//     </div>
//   ) : <></>;
// }

// DeliveryLocation.propTypes = {
//   getMarkLocation: PropTypes.node.isRequired,
//   getAddress: PropTypes.node.isRequired,
//   initialCenter: PropTypes.node.isRequired,
// }

// export default React.memo(DeliveryLocation);

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import PropTypes from 'prop-types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const DeliveryLocation = ({ getMarkLocation, getAddress, initialCenter }) => {
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
    getMarkLocation(newPosition); 
  }, [getMarkLocation]);

  const getGeocode = async ({ lat, lng }) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.status === 'OK') {
        const results = response.data.results;
        if (results.length > 0) {
          const address = results[0].formatted_address;
          setAddress(address);
          getAddress(address);
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
        }}
      />
      {/* <div>
        <h3>Marker Address:</h3>
        <p>{address}</p>
      </div> */}
    </div>
  ) : <></>;
};

DeliveryLocation.propTypes = {
  getMarkLocation: PropTypes.func.isRequired,
  getAddress: PropTypes.func.isRequired,
  initialCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
};

export default React.memo(DeliveryLocation);
