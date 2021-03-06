import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';
import logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
import classes from './HeaderMenu.module.css';
import {logoutHandle} from './../../utils';

const SubMenu = Menu.SubMenu;

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCollapsed: props.onChangeCollapse,
            collapsed: props.sideMenuCollapsed
        }
    }

    logoutHandle = () => {
        localStorage.removeItem('code');
        localStorage.removeItem('avatar');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.sideMenuCollapsed !== this.state.collapsed) {
            this.setState({ collapsed: nextProps.sideMenuCollapsed });
        }
    };

    render() {
        return (

            <div>
                <Row type='flex'
                    justify='space-between'
                    align='middle'>
                    <Col span={20}>
                        <Row type='flex'
                            justify='start'
                            align='middle'>
                            <Col span={1}>
                                <Button ghost={true} onClick={() => this.state.toggleCollapsed()} style={{ marginBottom: 16 , marginLeft: 16}}>
                                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                                </Button>
                            </Col>
                            <Col span={2}>
                                <Link to='/dashboard/home'>
                                    <img className={classes.headerLogo} src={logo} alt="logo of trading system" />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Menu
                            mode='horizontal'
                            theme='dark'
                        >
                            <Menu.Item key="a"> {localStorage.getItem('username') || 'Użytkownik'} </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Opcje</span>}>

                                <Menu.Item key="setting:1"> <Link to='/dashboard/settings'>Ustawienia </Link></Menu.Item>
                                <Menu.Item key="setting:2" onClick={() => logoutHandle()}><Link to='/'>Wyloguj</Link></Menu.Item>

                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HeaderMenu;