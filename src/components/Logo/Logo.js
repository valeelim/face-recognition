import doge from './doge.png'
import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () => {
    return (
        <div>
            <Tilt 
            className='logo ml3 br2 shadow-2'
            style={{width: '120px', height: '120px'}}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}>
                <img alt='logo' src={doge} />
            </Tilt>
        </div>
    );
}

export default Logo;