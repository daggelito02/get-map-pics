import React, { useEffect, useState } from 'react';
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
  
  const [markerData, setmarkerData] = useState([]); 
  const [markers, setMarkers] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showSpinner, setSpinner] = useState(true);
  const flickerBaseAddress = 'https://api.flickr.com/services/rest/?api_key='
  const apikey = '4be14d0aadcd2bf236664597b159266c';
  const markerId = 123;
  const otherFlickerparams = '&method=flickr.photos.search&per_page=3&has_geo=1&format=json&nojsoncallback=1';
  let longLatParams = '&lat=55.606000&lon=12.993999';

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwGQGGoMZbLsSeUIk8tDOegcxBJm-d3fA',
    libraries,
  });

  const getFlickerRequest = async (markers) => {
    if(markers[0]) {
      longLatParams = '&lat=' + markers[0].lat + '&lon=' + markers[0].lng;
    }
    const url = flickerBaseAddress + apikey + longLatParams + otherFlickerparams;
    const response = await fetch(url); 
    const responseJson = await response.json();
    if(responseJson.stat){
      setLoading(false);
      setSpinner(true);
      setTimeout(() => {
        setLoading(true);
        setSpinner(false);
        setPictures(responseJson.photos.photo);
      }, "300");
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
    <div className="content-wrapper">
      <h1>
          Get some nice pictures from the map
      </h1>
      <p className='info-text'>Click on the map or choose a button to get local pictures from flickr.</p>
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
      <div className="location-picture-wrapper">
        <LocationHeading heading="Location pictures"/>
      </div>
      {isLoading && 
      <div className="location-picture-wrapper">
        <div className="pictures-wrapper">
          <LocationPictures 
            picturesData={pictures} 
            />
        </div>
      </div>}
      {showSpinner && 
      <div className='lds-hourglass spinner'></div>}
    </div>
    </>
  );
};

export default App;
