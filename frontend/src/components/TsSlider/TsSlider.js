import React, { Component } from 'react';
import { Carousel } from 'antd';
import SliderRow from './innerComponents/SliderRow';
import './TsSlider.css';

class TsSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: props.autoplay,
            displayableContent : props.displayableContent,
        }
    }

    onSliderRowGenerate = () => {
       return this.state.displayableContent.map( (slide, index) =>  <SliderRow key={index} img={slide}/>)
    }

    render() {
        return (
            <div>
                <Carousel autoplay={this.state.autoplay? 'true': 'false'}>
                    {this.onSliderRowGenerate()}
                </Carousel>
            </div>
        );
    }
}

export default TsSlider;