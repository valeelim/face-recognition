import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    if (imageUrl === undefined){
        imageUrl = 'https://i.scdn.co/image/e1e0353693229e0a2a0877aba2af50dec5ef4385'
    }
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage'alt='pic' src={imageUrl} width='500px' height='auto'/>
                {
                    box.map((region, i) => {
                        return  <div key={i} className='bounding-box' style={{top: region.topRow, right: region.rightCol, bottom: region.botRow, left: region.leftCol}}></div>
                    })
                }
            </div>
        </div>
    );
}

export default FaceRecognition;