import React, { Component } from 'react';
import { Layout } from 'antd';
import MainPageHeader from './innerComonents/MainPageHeader/MainPageHeader';
import TsFooter from '../../components/TsFooter/TsFooter';
import TsSlider from '../../components/TsSlider/TsSlider';
import slider1 from './../../assets/slider/slider1.png';
import slider2 from './../../assets/slider/slider2.png';
import slider3 from './../../assets/slider/slider3.png';
import CommentSection from './innerComonents/CommentSection/CommentSection';
import Newsletter from './innerComonents/Newsletter/Newsletter';
import StatisticsSection from './innerComonents/StatisticsSection/StatisticsSection.js';

const { Header, Content } = Layout;
class MainPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderData: [
                {
                    src: slider1,
                    altText: 'slider 1'
                },
                {
                    src: slider2,
                    altText: 'slider 2'
                },
                {
                    src: slider3,
                    altText: 'slider 3'
                }
            ],
            commentsData: [
                {
                    avatarShape: 'square',
                    avatarSize: 64,
                    avatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    userNickname: 'DylanK',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc et mauris mattis varius. Vestibulum porta pretium ultrices. In sollicitudin lectus sapien, ut venenatis eros pretium dignissim. Pellentesque quis lorem ligula. Praesent interdum mi eget nisi ultrices facilisis. Nullam convallis nisl mi, ac scelerisque erat commodo non.'
                },
                {
                    avatarShape: 'square',
                    avatarSize: 64,
                    avatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    userNickname: 'DylanK',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc et mauris mattis varius. Vestibulum porta pretium ultrices. In sollicitudin lectus sapien, ut venenatis eros pretium dignissim. Pellentesque quis lorem ligula. Praesent interdum mi eget nisi ultrices facilisis. Nullam convallis nisl mi, ac scelerisque erat commodo non.'
                },
                {
                    avatarShape: 'square',
                    avatarSize: 64,
                    avatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    userNickname: 'DylanK',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc et mauris mattis varius. Vestibulum porta pretium ultrices. In sollicitudin lectus sapien, ut venenatis eros pretium dignissim. Pellentesque quis lorem ligula. Praesent interdum mi eget nisi ultrices facilisis. Nullam convallis nisl mi, ac scelerisque erat commodo non.'
                },
            ]
        }
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <MainPageHeader />
                    </Header>
                    <Layout>
                        <Content style={{ minHeight: '94vh' }}>
                            <TsSlider displayableContent={this.state.sliderData} autopaly='true' />
                            <CommentSection comments={this.state.commentsData} />
                            <StatisticsSection />
                            <Newsletter />
                        </Content>
                    </Layout >
                    <TsFooter />
                </Layout>
            </div>
        );
    }
}

export default MainPageView;