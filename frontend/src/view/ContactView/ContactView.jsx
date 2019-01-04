import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';

class ContactView extends Component {
    render() {
        return (
            <div>
                <TsTitle
                    title='Kontakt'
                    image={{ name: 'contacts', type: 'png' }} />
            </div>
        );
    }
}

export default ContactView;