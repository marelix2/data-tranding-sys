import React, { Component } from 'react';
import {Layout} from 'antd';
import MainPageHeader from './innerComonents/MainPageHeader';
import TsFooter from '../../components/TsFooter/TsFooter';
import TsSlider from '../../components/TsSlider/TsSlider';
import slider1 from './../../assets/slider/slider1.jpg';
import slider2 from './../../assets/slider/slider2.png';
import slider3 from './../../assets/slider/slider3.jpg';

const { Header, Content } = Layout;
class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderData: [
                { 
                src: slider1,
                altText:'slider 1'
                }, 
                { 
                src: slider2,
                altText:'slider 2'
                }, 
                { 
                src:slider3,
                altText:'slider 3'
                 }
                ]
        }
    }

    render() {


        return (
            <div>
                <Layout>
                    <Header>
                        <MainPageHeader/>
                    </Header>
                    <Layout>
                        <Content style={{ minHeight: '94vh' }}>
                            <TsSlider displayableContent={this.state.sliderData} autopaly='true'></TsSlider>
                        </Content>
                    </Layout >
                    <TsFooter/>
                </Layout>
            </div>
        );
    }
}

export default MainPageView;