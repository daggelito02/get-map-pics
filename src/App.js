import React, { useEffect, useState } from 'react';
//import { GoogleMap, withScriptjs, withGoogleMap} from "@react-google-maps/api";
//import './App.css';
import LocationHeading from "./components/LocationHeading";
import LocationButtons from "./components/LocationButtons";
import LocationPictures from "./components/LocationPictures";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 55.606000, // default latitude
  lng: 12.993999, // default longitude
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwGQGGoMZbLsSeUIk8tDOegcxBJm-d3fA',
    libraries,
  });

const [markerData, setmarkerData] = useState([]); 
const [markers, setMarkers] = useState([]);
const [pictures, setPictures] = useState([]);
const [isLoading, setLoading] = useState(false);
const [showSpinner, setSpinner] = useState(true);
const flickerBaseAddress = 'https://api.flickr.com/services/rest/?api_key='
const apikey = '4be14d0aadcd2bf236664597b159266c';
const markerId = 123;
let longLatParams = '&lat=55.606000&lon=12.993999';
const otherFlickerparams = '&method=flickr.photos.search&per_page=3&has_geo=1&format=json&nojsoncallback=1';


const getFlickerRequest = async (markers) => {
  if(markers[0]) {
    //console.log('markers.lat: ',markers[0].lat + ' markers.lng: ', markers[0].lng);
    longLatParams = '&lat=' + markers[0].lat + '&lon=' + markers[0].lng;
  }
  const url = flickerBaseAddress + apikey + longLatParams + otherFlickerparams;
  const response = await fetch(url); 
  const responseJson = await response.json();
  if(responseJson.stat){
    // for (let i = 0; i < responseJson.photos.photo.length; i++) {
    //   let flickerPhotos = responseJson.photos.photo[i];
    //   //console.log('flickerPhotos: ', flickerPhotos);
    //   let imgUrl = "https://live.staticflickr.com/" + flickerPhotos.server + "/" +
    //   flickerPhotos.id + "_" + flickerPhotos.secret + "_s.jpg"; // Adress till en bild
    //   console.log('imgUrl: ', imgUrl);
    //   //setPictures(responseJson.stat);
    // }
    setLoading(false);
    setSpinner(true);
    setTimeout(() => {
      //console.log("Delayed for 1 second.");
      setLoading(true);
      setSpinner(false);
    }, "500");
    setPictures(responseJson.photos.photo);
    //console.log('setPictures: ',responseJson.photos.photo)
  }
};

useEffect(()=> {
  const markersArray = [
			{position:{lat:55.60898,lng:12.99455},title:"Malmö Universitet", markerId:1},
			{position:{lat:55.60928,lng:12.99665},title:"Anna Lindhs plats", markerId:2},
			{position:{lat:55.60701,lng:13.00336},title:"Sankt Petri kyrka", markerId:3},
			{position:{lat:55.59214,lng:13.02490},title:"Kussin Ulrika Fredriksson", markerId:4},
			{position:{lat:55.60636,lng:13.00036},title:"Stortorget, Malmö", markerId:5}
		];
    setmarkerData(markersArray);
    getFlickerRequest(markers);
    // eslint-disable-next-line
}, [markers]);
const addMarkerToMap = (marker) => {
  setMarkers(() => [
    {
      lat: marker.position.lat,
      lng: marker.position.lng,
      markerId: marker.markerId
    }
  ]);
};
const onMapClick = (e) => {
  setMarkers(() => [
    {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
  ]);
};

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <>
    <h1>
        Get some nice pictures from the map
      </h1>
    <div className="content-wrapper">
      <div className="locations-wrapper">
        <LocationHeading heading="Location buttons"/>
        <div className="button-wrapper">
          <LocationButtons 
            markerButtons={markerData} 
            handelButtonClick={addMarkerToMap} />
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14.25}
        onClick={onMapClick}
        center={center}
        options={{
          styles: [
            { featureType: "poi.business", stylers: [{ visibility: "off" }] },
            { featureType: "poi.attraction", stylers: [{ visibility: "off" }] },
            { featureType: "transit.station", stylers: [{ visibility: "off" }] }
          ],
        }} >
        {markers.map((marker) => (
        <MarkerF key={markerId}
          position={{
            lat: marker.lat,
            lng: marker.lng
          }} />
        ))}
      </GoogleMap>
      
      {isLoading && 
      <div className="location-picture-wrapper">
        <LocationHeading heading="Location pictures"/>
        <div className="pictures-wrapper">
          <LocationPictures 
            picturesData={pictures} 
            />
        </div>
      </div>}
      {showSpinner && 
      <div className='spinner'>Spinner</div>}
    </div>
    </>
  );
};

export default App;
