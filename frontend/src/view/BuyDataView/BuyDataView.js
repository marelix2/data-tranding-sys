import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';

class BuyDataView extends Component {
    render() {
        return (
            <div>
                <TsTitle title='Buying data dashboard'
                image={{name:'buyData',type:'png'}}/>

                <TsTable />
            </div>
        );
    }
}

export default BuyDataView;