import React from 'react';

const LocationPictures = (props) => {
  return (
    <>
        {
            props.picturesData?.map((picturData) => (
            <div className="picture-container" key={picturData.id} id={picturData.id}>
                <div className="picture-container">
                    <img src={'https://live.staticflickr.com/' 
                    + picturData.server + "/" + picturData.id + "_" + picturData.secret + '_s.jpg'} 
                    alt={picturData.title} />
                </div>
                <p className='caption-text'>{picturData.title}</p>
            </div>
        ))}
    </>
  );  
};

export default LocationPictures; 