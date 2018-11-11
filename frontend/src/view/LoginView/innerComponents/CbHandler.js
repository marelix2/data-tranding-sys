import React, { Component } from 'react';
import axios from './../../../axiosAPI';
import API from './../../../endpoints';

class CbHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchParams: new URLSearchParams(props.location.search),
        }
        
    }

    extractParams = () => {
            return this.state.searchParams.get('code');     
    }

    onPostHandler = () => {
        axios.post(API.POST_GOOGLE_CODE, { code: this.extractParams()})
        .then((response) => {
            // to do redirect + utils
        });
    };

    componentDidMount() {
        this.onPostHandler();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default CbHandler;