import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderMenu from './../../components/HeaderMenu/HeaderMenu';
import SideBarMenu from './../../components/SiteBarMenu/SideBarMenu';
import { Route } from 'react-router-dom';
import HomeView from './../HomeView/HomeView';
import SettingsView from './../SettingsView/SettingsView';
import TsFooter from './../../components/TsFooter/TsFooter';

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
                            <Route exact path={`${this.props.match.path}/home`} component={HomeView} />
                            <Route path={`${this.props.match.path}/settings`} component={SettingsView} />
                        </div>
                    </Content>
                </Layout >
                <TsFooter />
            </Layout>
        );
    }
}

export default Dashboard;