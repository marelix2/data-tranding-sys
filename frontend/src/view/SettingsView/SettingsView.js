import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div>
                <TsTitle
                    title='Settings'
                    image={{ name: 'settings', type: 'png' }} />
            </div>
        );
    }
}

export default SettingsView;