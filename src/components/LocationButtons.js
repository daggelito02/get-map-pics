import React from 'react';

const LocationButtons = (props) => {
  return (
    <>
        {
            props.markerButtons?.map((attrData) => (
                <div key={attrData.markerId} id={attrData.markerId}>
                    <button 
                        onClick={()=> props.handelButtonClick(attrData)} 
                        className='buttonStyle'>
                        {attrData.title}
                    </button>
                </div>
        ))}
    </>
  );  
};

export default LocationButtons; 