import React, { Component } from 'react';
import { Button } from 'antd';

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Button type="danger" icon="google">Login with Google</Button>
            </div>
        );
    }
}

export default LoginBox;