import React, { Component } from 'react';
import { Row, Col } from 'antd';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import LoginView from '../LoginView/LoginView';

class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <p>main page</p>
                <LoginView/>
            </div>
        );
    }
}

export default MainPageView;