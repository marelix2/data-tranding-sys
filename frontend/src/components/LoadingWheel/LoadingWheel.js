import React, { Component } from 'react';
import { Spin, Icon, Layout } from 'antd';

class LoadingWheel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Layout>
                    <Spin indicator={<Icon type='loading' style={{ fontSize: 72 }} spin />} />
                </Layout>
            </div>
        );
    }
}

export default LoadingWheel;
