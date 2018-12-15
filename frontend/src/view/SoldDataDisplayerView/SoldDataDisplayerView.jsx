import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class SoldDataDisplayerView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Data, you sold us.'
                    image={{
                        name: 'soldData',
                        type: 'png'
                    }} />
               
            </div>
        );
    }
}

export default SoldDataDisplayerView;