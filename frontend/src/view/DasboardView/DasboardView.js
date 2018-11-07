import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderMenu from './../../components/HeaderMenu/HeaderMenu';
import SideBarMenu from './../../components/SiteBarMenu/SideBarMenu';
import { Route } from 'react-router-dom';
import HomeView from './../HomeView/HomeView';
import SettingsView from './../SettingsView/SettingsView';

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sideMenuCollapsed: false,
        }
    }

    handleChangeCollapse = () => {
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
                    <HeaderMenu sideMenuCollapsed={this.state.sideMenuCollapsed} onChangeCollapse={this.handleChangeCollapse} />
                </Header>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.sideMenuCollapsed} >
                        <div>
                            <SideBarMenu />
                        </div>
                    </Sider>
                    <Content style={{ minHeight: '86.4vh' }}>
                        <div>
                            <Route exact path="/" component={HomeView} />
                            <Route path="/settings" component={SettingsView} />
                        </div>
                    </Content>
                </Layout >
                <Footer style={{ background: '#001529', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Data-trading system © 2018
                 </Footer>
            </Layout>
        );
    }
}

export default Dashboard;