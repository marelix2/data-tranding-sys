import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {  Route} from 'react-router-dom';
import LoginView from '../LoginView/LoginView';
import {Layout} from 'antd';
import MainPageHeader from './innerComonents/HeaderMenu/MainPageHeader';
import TsFooter from '../../components/TsFooter/TsFooter';

const { Header, Content } = Layout;
class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {


        return (
            <div>
                <Layout>
                    <Header>
                        <MainPageHeader/>
                    </Header>
                    <Layout>
                        <Content>
                        </Content>
                    </Layout >
                    <TsFooter/>
                </Layout>
            </div>
        );
    }
}

export default MainPageView;