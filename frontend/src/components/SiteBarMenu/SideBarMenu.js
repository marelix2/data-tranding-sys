import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { logoutHandle } from './../../utils';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import {findKey} from 'lodash';

const SubMenu = Menu.SubMenu;

class SideBarMenu extends Component {   

    constructor(props){
        super(props);

        this.state = {
            focus : this.props.focus,
            paths: {
                bought: '/dashboard/bought',
                sold:'/dashboard/sold',
                wallet: '/dashboard/wallet',
                explore: '/dashboard/explore',
                buy: '/dashboard/buy',
                sell: '/dashboard/sell',
                adminTransactions: '/dashboard/admin/transactions',
                adminCalculator: '/dashboard/admin/calculator',
                contact: '/dashboard/contact'

            }
        }
    }
    
    render() {
        return (
            <div>
                <Menu
                    defaultOpenKeys={['storage', 'trade', 'options','admin']}
                    mode="inline"
                    theme="dark"
                    selectedKeys={[this.props.focus]}
                >
                    <SubMenu key="storage" title={<span><Icon type="bar-chart" /><span>Zarządzanie</span></span>}>
                        <Menu.Item key={this.state.paths.bought}><Link to={this.state.paths.bought}>Kupione</Link></Menu.Item>
                        <Menu.Item key={this.state.paths.sold}><Link to={this.state.paths.sold}>Sprzedane</Link></Menu.Item>
                        <Menu.Item key={this.state.paths.wallet}><Link to={this.state.paths.wallet}>Twoj Portwel</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="trade" title={<span><Icon type="appstore" /><span>Sprzedaż</span></span>}>
                        <Menu.Item key={this.state.paths.explore}><Link to={this.state.paths.explore}>Przeglądaj</Link></Menu.Item>
                        <Menu.Item key={this.state.paths.buy}><Link to={this.state.paths.buy}>Zakup</Link></Menu.Item>
                        <Menu.Item key={this.state.paths.sell}><Link to={this.state.paths.sell}>Sprzedaj</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="admin" title={<span><Icon type="paper-clip" /><span> Moderacja </span></span>}>
                        <Menu.Item key={this.state.paths.adminTransactions}><Link to={this.state.paths.adminTransactions}>Transakcje</Link></Menu.Item>
                        <Menu.Item key={this.state.paths.adminCalculator}><Link to={this.state.paths.adminCalculator}>Wartości</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="options" title={<span><Icon type="fullscreen" /><span> Więcej </span></span>}>
                        <Menu.Item key={this.state.paths.contact}><Link to={this.state.paths.contact}>Kontakt</Link></Menu.Item>
                        <Menu.Item key="options_2" onClick={() => logoutHandle()}><Link to='/'>Wyloguj</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default SideBarMenu;