import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
class WalletView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Your wallet.'
                    image={{
                        name: 'wallet',
                        type: 'png'
                    }} />
            </div>
        );
    }
}

export default WalletView;