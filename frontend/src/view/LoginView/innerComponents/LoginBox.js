import React, { Component } from 'react';
import { Button } from 'antd';

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
        }
        console.log(props.url, 'state url')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.state.url) {
            this.setState({ url: nextProps.url });
        }
    }

    render() {
        return (
            <div>
                <Button type="danger" icon="google"><a href={this.state.url}>Login with Google</a></Button>
            </div>
        );
    }
}

export default LoginBox;