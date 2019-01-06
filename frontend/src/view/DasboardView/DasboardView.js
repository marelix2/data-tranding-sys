import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderMenu from './../../components/HeaderMenu/HeaderMenu';
import SideBarMenu from './../../components/SiteBarMenu/SideBarMenu';
import { Route } from 'react-router-dom';
import HomeView from './../HomeView/HomeView';
import SettingsView from './../SettingsView/SettingsView';
import TsFooter from './../../components/TsFooter/TsFooter';
import SellDataView from './../SellDataView/SellDataView';
import BuyDataView from './../BuyDataView/BuyDataView';
import ContactView from './../ContactView/ContactView';
import BoughtDataDisplayerView from './../BoughtDataDisplayerView/BoughtDataDisplayerView';
import SoldDataDisplayerView from './../SoldDataDisplayerView/SoldDataDisplayerView';
import WalletView from './../WalletView/WalletView';
import ExploreView from './../ExploreView/ExploreView';
import AdminTransactionView from './../AdminTransactionView/AdminTransactionView';

const { Header, Content, Sider } = Layout;

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
                    <Content style={{ minHeight: '94vh' }}>
                        <div>
                            <Route exact path={`${this.props.match.path}/home`} component={HomeView} />
                            <Route path={`${this.props.match.path}/sold`} component={SoldDataDisplayerView} />
                            <Route path={`${this.props.match.path}/bought`} component={BoughtDataDisplayerView} />
                            <Route path={`${this.props.match.path}/wallet`} component={WalletView} />
                            <Route path={`${this.props.match.path}/settings`} component={SettingsView} />
                            <Route path={`${this.props.match.path}/buy`} component={BuyDataView} />
                            <Route path={`${this.props.match.path}/sell`} component={SellDataView} />
                            <Route path={`${this.props.match.path}/contact`} component={ContactView} />
                            <Route path={`${this.props.match.path}/explore`} component={ExploreView} />
                            <Route path={`${this.props.match.path}/admin/transactions`} component={AdminTransactionView} />
                           
                        </div>
                    </Content>
                </Layout >
                <TsFooter />
            </Layout>
        );
    }
}

export default Dashboard;