import React, { useEffect, useState } from 'react';
//import { GoogleMap, withScriptjs, withGoogleMap} from "@react-google-maps/api";
//import './App.css';
import LocationHeading from "./components/LocationHeading";
import LocationButtons from "./components/LocationButtons";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
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

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '70vh'
};
const center = {
  lat: 55.612000, // default latitude
  lng: 12.993999, // default longitude
};
// const defaultMarker = {
//   // lat: 55.60885, // default latitude
//   // lng: 12.99458, // default longitude
//   lat: 55.60885, // default latitude
//   lng: 12.99458, // default longitude
// }
// let defaultMarker2 = {
//   lat: 55.60804, // default latitude
//   lng: 13.01062, // default longitude
// }

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwGQGGoMZbLsSeUIk8tDOegcxBJm-d3fA',
    libraries,
  });

const [markerData, setmarkerData] = useState([]); 
const [markers, setMarkers] = useState([]);
// let defaultMarker = {
//     // lat: 55.60885, // default latitude
//     // lng: 12.99458, // default longitude
//     lat: 0, // default latitude
//     lng: 0, // default longitude
//   } 
useEffect(()=> {
  const markersArray = [	// Data för markeringar som hör till knapparna
			{position:{lat:55.60883,lng:12.99459},title:"Malmö Universitet", markerId:1},
			{position:{lat:55.60967,lng:12.99634},title:"Anna Lindhs plats", markerId:2},
			{position:{lat:45.438023,lng:12.335818},title:"Ponte di Rialto", markerId:3},
			{position:{lat:45.43706,lng:12.31919},title:"Francesca's Home", markerId:4},
			{position:{lat:45.431784,lng:12.329002},title:"Ponte dell'Accademia", markerId:5}
      //   lat: 55.60883, // default latitude
//   lng: 12.99459, // default longitude
		];
    setmarkerData(markersArray);
}, []);

const addMarkerToMap = (marker) => {
  setMarkers(() => [
    {
      lat: marker.position.lat,
      lng: marker.position.lng,
      markerId: marker.markerId
    }
  ]);
};



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
    <>
    <div className="content-wrapper">
      <h1>
        Get some nice pictures from the map
      </h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={{
          styles: [
            { featureType: "poi.business", stylers: [{ visibility: "off" }] },
            { featureType: "poi.attraction", stylers: [{ visibility: "off" }] },
            { featureType: "transit.station", stylers: [{ visibility: "off" }] }
          ],
        }}
      >
        {/* <MarkerF position={defaultMarker} /> */}
        {/* <MarkerF position={defaultMarker2} label={'Dagge testar'} />{ */}
        {/* <MarkerF
          position={{
            lat: 55.60883,
            lng: 45.433865
          }} /> */}
        {markers.map((marker) => (
        <MarkerF key={marker.markerId}
          position={{
            lat: marker.lat,
            lng: marker.lng
          }} />
        ))}
      </GoogleMap>
      <div className="locations-wrapper">
        <LocationHeading heading="Address locations"/> 
        <LocationButtons 
          markerButtons={markerData} 
          handelButtonClick={addMarkerToMap} />
        {/* <button onClick={() => console.log('Button clicked!')}>Click me!</button> */}
      </div>
    </div>
    </>
  );
};

export default App;
