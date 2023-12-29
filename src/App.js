import React, { useState } from 'react';
//import { GoogleMap, withScriptjs, withGoogleMap} from "@react-google-maps/api";
import './App.css';

// function Map() {
//   return <GoogleMap defaltAoom={10} defaultCenter={{lat: 55.604980, lng: 13.003822}} />;
// }



// export default function App() {
//   return (
//     <><div>Map</div> <div><WrappMapp /></div></>
//   );
// }

// const WrappMapp = withScriptjs(withGoogleMap(Map));

//export default App;

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '70vh'
};
const center = {
  lat: 55.604980, // default latitude
  lng: 13.003822, // default longitude
};
const defaultMarker = {
  lat: 55.60883, // default latitude
  lng: 12.99459, // default longitude
}
const defaultMarker2 = {
  lat: 55.60804, // default latitude
  lng: 13.01062, // default longitude
}

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwGQGGoMZbLsSeUIk8tDOegcxBJm-d3fA',
    libraries,
  });


//const [markers, setMarkers] = useState([]);

// const onMapClick = (e) => {
//     setMarkers((current) => [
//       ...current,
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng()
//       }
//     ]);
//   };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13.5}
        center={center}
        options={{ 
          styles: [
            { featureType: "poi.business", stylers: [{ visibility: "off"}] },
            { featureType: "poi.attraction", stylers: [{ visibility: "off"}] },
            { featureType: "transit.station",stylers:[{visibility:"off"}] }
          
          ], }}
          //onClick={onMapClick}
      >
        <MarkerF position={defaultMarker} />
        <MarkerF position={defaultMarker2} label={'Dagge testar'}/>
        {/* {markers.map((marker) => (
        <MarkerF
          position={{ 
            lat: marker.lat,
            lng: marker.lng 
          }} />
        ))} */}
      </GoogleMap>
    </div>
  );
};

export default App;
