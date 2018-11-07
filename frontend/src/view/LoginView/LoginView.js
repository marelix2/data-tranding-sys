import React, { Component } from 'react';
import { Row, Col } from 'antd';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Row type='flex'
                    justify='center'
                    align='center'>
                    <Col span={12}> co tam </Col>
                </Row>
            </div>
        );
    }
}

export default LoginView;