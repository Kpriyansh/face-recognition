import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png'
const Logo = () => {
    return(
        <Tilt className="Tilt br2 shadow-2 tc ma4" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> <img src={brain} alt="logo"/></div>
        </Tilt>
    );
}
export default Logo;