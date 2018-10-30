import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';
import './HeaderMenu.styles.css';

const SubMenu = Menu.SubMenu;

class AppLayout extends Component {
    render() {
        return (
            <div>
                <Row type='flex'
                    justify='space-between'
                    align='middle'>
                    <Col span={18}>
                        <Row>
                            <Col span={2}>
                                <Button type="dark" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                                    <Icon type={'menu-fold'} />
                                </Button>
                            </Col>
                            <Col span={10}>
                                <div className='header-logo'>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Menu
                            mode='horizontal'
                            theme='dark'
                        >
                            <Menu.Item key="a"> user </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Opcje</span>}>
                                <Menu.Item key="setting:1">Ustawienia</Menu.Item>
                                <Menu.Item key="setting:2">Wyloguj</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AppLayout;