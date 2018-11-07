import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LoginBox from './innerComponents/LoginBox';
import axios from './../../axiosAPI';
import Api from './../../endpoints';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        axios.get(Api.GET_GOOGLE_URL).then( (response) => {
            console.log(JSON.stringify(response));
        })

    }

    render() {
        return (
            <div>
                <Row type='flex'
                    justify='center'
                    align='center'>
                    <Col span={12}> <LoginBox/> </Col>
                </Row>
            </div>
        );
    }
}

export default LoginView;