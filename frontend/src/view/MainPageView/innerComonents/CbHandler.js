import React, { Component } from 'react';
import axios from '../../../axiosAPI';
import API from '../../../endpoints';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {Spin} from 'antd';

class CbHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchParams: new URLSearchParams(props.location.search),
            toDashboard: false,
        }
        
    }

    extractParams = () => {
            return this.state.searchParams.get('code');     
    }

    onPostHandler = () => {

        axios.post(API.POST_GOOGLE_CODE, { code: this.extractParams()})
        .then((response) => {
            const {email,avatar,username,code} = response.data.user;
            localStorage.setItem('email',email);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('username', username);
            localStorage.setItem('code', code);
            console.log('jestem');
            this.setState({ toDashboard: true });
        });
    };

    componentDidMount() {
        this.onPostHandler();
    }

    render() {

        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
    
        return (
            <div>
            </div>
        );
    }
}

export default CbHandler;