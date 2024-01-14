import React from 'react';

const LocationPictures = (props) => {
    console.log('data pics: ', props.picturesData);
  return (
    <>
        {
            props.picturesData?.map((picturData) => (
                <div className="picture-container" key={picturData.id} id={picturData.id}>
                    <p>{picturData.title}</p>
                    <div className="picture-container">
                        <img src={'https://live.staticflickr.com/' 
                        + picturData.server + "/" + picturData.id + "_" + picturData.secret + '_s.jpg'} 
                        alt={picturData.title} />
                    </div>
                </div>
        ))}
    </>
  );  
};

export default LocationPictures; 