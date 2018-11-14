import React, { Component } from 'react';
import { Row, Col, Menu, Icon,Dropdown,Button} from 'antd';
import logo from './../../../assets/logo.png';
import { Link,Route } from 'react-router-dom';
import classes from './MainPageHeader.module.css';
import LoginView from '../../LoginView/LoginView';
import CbHandler from './CbHandler';

class MainPageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCollapsed: props.onChangeCollapse,
            collapsed: props.sideMenuCollapsed
        }
    }


     menu = (
        <Menu
        theme='dark'>
        <Menu.Item key="setting:1"><LoginView/></Menu.Item>
        </Menu>
     );

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
                                    <img className={classes.headerLogo} src={logo} alt="logo of trading system" />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                    <Dropdown overlay={this.menu} placement="bottomCenter">
                    <Button type='primary'>Zaloguj  <Icon type="down" /></Button>
                    </Dropdown>
                    </Col>
                </Row>

                <Route path='/login/callback' component={CbHandler} />
            </div>
        );
    }
}

export default MainPageHeader;