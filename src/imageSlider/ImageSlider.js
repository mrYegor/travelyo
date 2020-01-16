import React, {useContext, useState} from 'react';
import { Slide } from 'react-slideshow-image';
import './ImageSlider.css';
import Context from '../context';

function ImageSlider({visibleSlider, slideImages}) {
    const {hideSlider} = useContext(Context);
    const images = slideImages[0];

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };

    return (
        visibleSlider && (<div className="slide-container">
            <Slide {...properties}>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${images[0]})`}} />
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${images[1]})`}} />
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${images[2]})`}} />
                </div>

            </Slide>
            <button onClick={hideSlider} className='close-slider'>&times;</button>
        </div>)
    )
}

export default ImageSlider;
