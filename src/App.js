import React from 'react';
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

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '70vh',
};
const center = {
  lat: 55.604980, // default latitude
  lng: 13.003822, // default longitude
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwGQGGoMZbLsSeUIk8tDOegcxBJm-d3fA',
    libraries,
  });

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
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default App;
