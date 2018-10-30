import React, { Component } from 'react';
import { Layout} from 'antd';
import HeaderMenu from "./../HeaderMenu/HeaderMenu";
const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Layout>
                <Header>
                    <HeaderMenu/>
                </Header>
                <Content style={{minHeight: '85vh'}}>
                <pre>dddd</pre>
                </Content>
                <Footer>
                    Data-trading system ©2018
                 </Footer>
            </Layout>
        );
    }
}

export default AppLayout;