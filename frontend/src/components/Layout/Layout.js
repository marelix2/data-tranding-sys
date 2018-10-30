import React, { Component } from 'react';
import { Layout} from 'antd';
import HeaderMenu from "./../HeaderMenu/HeaderMenu";
import styles from './Layout.styles.css'
const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
    constructor(props){
        super(props);

        console.log(styles);
    }
    render() {
        return (
            <Layout>
                <Header className={styles.back}>
                    <HeaderMenu/>
                </Header>
                <Content>
                </Content>
                <Footer>
                    Ant Design ©2018
                 </Footer>
            </Layout>
        );
    }
}

export default AppLayout;