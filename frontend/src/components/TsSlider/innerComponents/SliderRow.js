import React from 'react';
import classes from './SliderRow.module.css'

function SliderRow (props){
        return (
            <div>
                <img className={classes.sliderRowImage} src={props.img.src} alt={props.img.altText}></img>
            </div>
        );
}

export default SliderRow;