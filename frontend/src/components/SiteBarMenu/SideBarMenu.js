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
                    defaultOpenKeys={['storage']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu key="storage" title={<span><Icon type="bar-chart" /><span>Zarządzanie</span></span>}>
                        <Menu.Item key="storage_0">Kupione</Menu.Item>
                        <Menu.Item key="storage_1">Sprzedane</Menu.Item>
                        <Menu.Item key="storage_2">Twoj Portwel</Menu.Item>
                    </SubMenu>
                    <SubMenu key="trade" title={<span><Icon type="appstore" /><span>Sprzedaż</span></span>}>
                        <Menu.Item key="trade_0">Zakup</Menu.Item>
                        <Menu.Item key="trade_1">Sprzedaj</Menu.Item>
                    </SubMenu>
                    <SubMenu key="options" title={<span><Icon type="options" /><span>Ustawienia </span></span>}>
                        <Menu.Item key="options_0"><Link to='/dashboard/settings'>Opcje</Link></Menu.Item>
                        <Menu.Item key="options_1">Kontakt</Menu.Item>
                        <Menu.Item key="options_2" onClick={() => logoutHandle()}><Link to='/'>Wyloguj</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default SideBarMenu;