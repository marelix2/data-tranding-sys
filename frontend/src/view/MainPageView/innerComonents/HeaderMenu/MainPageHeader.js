import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd';
import logo from './../../../../assets/logo.png';
import { Link,Route } from 'react-router-dom';
import './HeaderMenu.styles.css';
import LoginView from '../../../LoginView/LoginView';
import CbHandler from '../CbHandler';

const SubMenu = Menu.SubMenu;

class MainPageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCollapsed: props.onChangeCollapse,
            collapsed: props.sideMenuCollapsed
        }
    }

    render() {
        return (

            <div>
                <Row type='flex'
                    justify='center'
                    align='middle'>
                    <Col span={20}>
                        <Row type='flex'
                            justify='start'
                            align='middle'>
                            <Col span={1}>
                            </Col>
                            <Col span={2}>
                                <Link to='/'>
                                    <img className='headerLogo' src={logo} alt="logo of trading system" />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Menu
                            mode='horizontal'
                            theme='dark'>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Zaloguj</span>}>
                                <Menu.Item key="setting:1"><LoginView/></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>

                <Route path='/login/callback' component={CbHandler} />
            </div>
        );
    }
}

export default MainPageHeader;