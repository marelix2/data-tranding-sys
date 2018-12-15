import React from 'react';
import { Spin, Icon, Layout } from 'antd';

const LoadingWheel = (props) => {
    return (
        <div>
            <Layout>
                <Spin indicator={<Icon type='loading' style={{ fontSize: 72 }} spin />} />
            </Layout>
        </div>
    );
};

export default LoadingWheel;


