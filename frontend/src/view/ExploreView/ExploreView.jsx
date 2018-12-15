import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class ExploreView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Przeglądaj'
                    image={{ name: 'explore', type: 'png' }} />
            </div>
        );
    }
}

export default ExploreView;