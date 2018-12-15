import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class SellDataView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Selling data dashobard'
                    image={{ name: 'sellData', type: 'png' }} />
            </div>
        );
    }
}

export default SellDataView;