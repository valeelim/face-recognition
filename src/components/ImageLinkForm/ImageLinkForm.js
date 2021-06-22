import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder='https://i.scdn.co/image/e1e0353693229e0a2a0877aba2af50dec5ef4385'/>
                    <button className='dib w-30 grow f4 link ph3 pv2 white bg-light-purple' onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;