import React from 'react';
import './ImageDisplay.css'
const ImageDisplay = ({ box, ImageUrl, PersonName }) => {

  return (
    <React.Fragment>
    <h3>{PersonName}</h3>
    <div className="center ma">
      <div className="absolute mt2">
        <img id='image-element' src={ImageUrl} alt='Please check the link..' style={{ width: '350px', height: 'auto' }} />
        <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
        </div>
      </div>
    </div>
    </React.Fragment>
  );


}
export default ImageDisplay;