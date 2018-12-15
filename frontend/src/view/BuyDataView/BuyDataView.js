import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class BuyDataView extends Component {
    render() {
        return (
            <div>
                <TsTitle title='Buying data dashboard'
                image={{name:'buyData',type:'png'}}/>
            </div>
        );
    }
}

export default BuyDataView;