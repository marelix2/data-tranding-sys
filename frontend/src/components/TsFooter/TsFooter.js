

import React, { Component } from 'react';
import { Layout } from 'antd';

const {Footer} = Layout;

class TsFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Footer style={{ background: '#001529', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Data-trading system © 2018
                 </Footer>
            </div>
        );
    }
}

export default TsFooter;