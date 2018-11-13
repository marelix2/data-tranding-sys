import React from 'react';
import './SliderRow.css'

function SliderRow (props){
        return (
            <div>
                <img className={'sliderRowImage'} src={props.img.src} alt={props.img.altText}></img>
            </div>
        );
}

export default SliderRow;