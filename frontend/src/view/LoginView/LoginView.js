import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LoginBox from './innerComponents/LoginBox';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import { BrowserRouter as Router, Route, Link ,Redirect} from 'react-router-dom';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        axios.get(Api.GET_GOOGLE_URL).then( (response) => {
            this.setState({url : response.data.url});
        })

    }

    render() {
        return (
            <div>
                <Row type='flex'
                    justify='center'
                    align='center'>
                    <Col span={12}> <LoginBox url={this.state.url}/> </Col>
                    <Route path='/login/:callback' render={(match) => {
                            console.log([match])
                    }}/>
                </Row>
            </div>
        );
    }
}

export default LoginView;