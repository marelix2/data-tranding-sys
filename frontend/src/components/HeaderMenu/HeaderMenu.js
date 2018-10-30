import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';
import './HeaderMenu.styles.css';

const SubMenu = Menu.SubMenu;

class HeaderMenu extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            toggleCollapsed: props.onChangeCollapse,
            collapsed: props.sideMenuCollapsed
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sideMenuCollapsed !== this.state.collapsed) {
            this.setState({ collapsed: nextProps.sideMenuCollapsed });
        }
    }

    render() {
        return (
            <div>
                <Row type='flex'
                    justify='space-between'
                    align='middle'>
                    <Col span={20}>
                        <Row>
                            <Col span={1}>
                                <Button ghost={true} onClick={() => this.state.toggleCollapsed()} style={{ marginBottom: 16 }}>
                                    <Icon type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} />
                                </Button>
                            </Col>
                            <Col span={10}>
                                <div className='header-logo'>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
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

export default HeaderMenu;