import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class BoughtDataDisplayerView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Bought Data Displayer View'
                    image={{ name: 'boughtData', type: 'png' }} />
            </div>
        );
    }
}

export default BoughtDataDisplayerView;