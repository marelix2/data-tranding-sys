import React, { Component } from 'react';
import axios from './../../../../axiosAPI';
import API from '../../../../endpoints';
import {Redirect } from 'react-router-dom';

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
            console.log(response);
            const { email, avatar, username, googleId} = response.data.user[0];

            console.log([response.data]);
            localStorage.setItem('email',email);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('username', username);
            localStorage.setItem('googleId', googleId);
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