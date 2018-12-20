import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsDisplayer from '../../components/TsDisplayer/TsDisplayer';

class ExploreView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Przeglądaj'
                    image={{ name: 'explore', type: 'png' }} />

                    <TsDisplayer image={{name: 'sellData', type: 'png'}}>
                        <h3> {'tytuł'}</h3>
                        <p> 0 wierszy</p>
                    </TsDisplayer>

            </div>
        );
    }
}

export default ExploreView;