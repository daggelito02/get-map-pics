import React, { useEffect, useState } from 'react';
//import { GoogleMap, withScriptjs, withGoogleMap} from "@react-google-maps/api";
//import './App.css';
import LocationHeading from "./components/LocationHeading";
import LocationButtons from "./components/LocationButtons";
import LocationPictures from "./components/LocationPictures";
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
// componentDidMount('https://api.flickr.com/services/rest/?api_key=4be14d0aadcd2bf236664597b159266c&method=flickr.photos.search&lat=45.429732&lon=12.331144&per_page=3&has_geo=1&format=json&nojsoncallback=1'){
//   fetch()
// }

// useEffect(()=> {
//   getFlickerRequest();
// }, []);

// https://api.flickr.com/services/rest/?api_key=4be14d0aadcd2bf236664597b159266c&method=flickr.photos.search&lat=45.429732&lon=12.331144&per_page=3&has_geo=1&format=json&nojsoncallback=1
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '70vh'
};
const center = {
  lat: 55.606000, // default latitude
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
const [pictures, setPictures] = useState([]);
const flickerBaseAddress = 'https://api.flickr.com/services/rest/?api_key='
const apikey = '4be14d0aadcd2bf236664597b159266c';
const longLatParams = '&lat=55.60898&lon=12.99455';
const otherFlickerparams = '&method=flickr.photos.search&per_page=3&has_geo=1&format=json&nojsoncallback=1';


const getFlickerRequest = async () => {
  
  const url = flickerBaseAddress + apikey + longLatParams + otherFlickerparams;
  const response = await fetch(url); 
  const responseJson = await response.json();
  //console.log('responseJson: ', responseJson.stat);
  //console.log('responseJson photos: ', responseJson.photos);
  if(responseJson.stat){
    for (let i = 0; i < responseJson.photos.photo.length; i++) {
      let flickerPhotos = responseJson.photos.photo[i];
      //console.log('flickerPhotos: ', flickerPhotos);
      let imgUrl = "https://live.staticflickr.com/" + flickerPhotos.server + "/" +
      flickerPhotos.id + "_" + flickerPhotos.secret + "_s.jpg"; // Adress till en bild
      console.log('imgUrl: ', imgUrl);
      //setPictures(responseJson.stat);
    }
    setPictures(responseJson.photos.photo);
    console.log('setPictures: ',responseJson.photos.photo)
  }
};
//getFlickerRequest();

useEffect(()=> {
  const markersArray = [	// Data för markeringar som hör till knapparna
			{position:{lat:55.60898,lng:12.99455},title:"Malmö Universitet", markerId:1},
			{position:{lat:55.60928,lng:12.99665},title:"Anna Lindhs plats", markerId:2},
			{position:{lat:55.60701,lng:13.00336},title:"Sankt Petri kyrka", markerId:3},
			{position:{lat:55.59214,lng:13.02490},title:"Kussin Ulrika Fredriksson", markerId:4},
			{position:{lat:55.60636,lng:13.00036},title:"Stortorget, Malmö", markerId:5}
		];
    setmarkerData(markersArray);
    getFlickerRequest();
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
        zoom={14.25}
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
        <LocationHeading heading="Location buttons"/>
        <div className="button-wrapper">
          <LocationButtons 
            markerButtons={markerData} 
            handelButtonClick={addMarkerToMap} />
        </div>
      </div>
      <div className="location-picture-wrapper">
        <LocationHeading heading="Location pictures"/>
        <div className="pictures-wrapper">
          <LocationPictures 
            picturesData={pictures} 
            />
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
