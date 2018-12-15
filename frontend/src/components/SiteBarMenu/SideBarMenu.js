import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { logoutHandle } from './../../utils';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class SideBarMenu extends Component {

    render() {

        return (
            <div>
                <Menu
                    defaultOpenKeys={['storage','trade','options']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu key="storage" title={<span><Icon type="bar-chart" /><span>Zarządzanie</span></span>}>
                        <Menu.Item key="storage_0"><Link to='/dashboard/bought'>Kupione</Link></Menu.Item>
                        <Menu.Item key="storage_1"><Link to='/dashboard/sold'>Sprzedane</Link></Menu.Item>
                        <Menu.Item key="storage_2"><Link to='/dashboard/wallet'>Twoj Portwel</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="trade" title={<span><Icon type="appstore" /><span>Sprzedaż</span></span>}>
                        <Menu.Item key="trade_0"><Link to='/dashboard/buy'>Zakup</Link></Menu.Item>
                        <Menu.Item key="trade_1"><Link to='/dashboard/sell'>Sprzedaj</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="options" title={<span><Icon type="fullscreen" /><span> Więcej </span></span>}>
                        <Menu.Item key="options_1"><Link to='/dashboard/contact'>Kontakt</Link></Menu.Item>
                        <Menu.Item key="options_2" onClick={() => logoutHandle()}><Link to='/'>Wyloguj</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default SideBarMenu;