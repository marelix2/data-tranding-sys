

import React, { Component } from 'react';
import { Layout } from 'antd';
import classes from './TsFooter.module.css';

const {Footer} = Layout;

class TsFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Footer className={classes.FooterWrapper}>
                    Data-trading system © 2018
                 </Footer>
            </div>
        );
    }
}

export default TsFooter;