import React, { Component } from 'react';
import { Layout} from 'antd';
import HeaderMenu from "./../HeaderMenu/HeaderMenu";
import SideBarMenu from './../SiteBarMenu/SideBarMenu';
const { Header, Content, Footer, Sider } = Layout;

class AppLayout extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            sideMenuCollapsed: false,
        }
    }

    handleChangeCollapse =  () => {
            this.setState((currentState) => {
                return {
                    sideMenuCollapsed: !currentState.sideMenuCollapsed
                }
            })
    }

    render() {
        return (
            <Layout>
                <Header>
                    <HeaderMenu sideMenuCollapsed = {this.state.sideMenuCollapsed}/>
                </Header>
                <Layout>
                 <Sider>
                     <SideBarMenu/>
                 </Sider>
                <Content style={{minHeight: '86.4vh'}}>
                <pre>dddd</pre>
                </Content>
                
                </Layout >
                <Footer style={{ background: '#001529', color: 'rgba(255, 255, 255, 0.65)'}}>
                    Data-trading system © 2018
                 </Footer>
            </Layout>
        );
    }
}

export default AppLayout;