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
import axios from '../../axiosAPI';
import Api from './../../endpoints';
import { stat } from 'fs';

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
            ],
            statisticsData: []
        }
    }

    componentDidMount() {
        this.fetchComments();
        this.fetchStatistics();
    }

    fetchComments = () => {
        axios.put(Api.GET_COMMENTS).then((response) => {
            console.log(response);
            const comments = response.data.comments.map((comment) => {
                return {
                    avatarShape: 'square',
                    avatarSize: 64,
                    avatarSrc: comment.user.avatar,
                    userNickname: comment.user.username,
                    comment: comment.description
                }
            })
            
            this.setState({ commentsData: comments});
        })
    }

    fetchStatistics = () => {
        axios.put(Api.GET_STATISTICS).then((response) => {
            console.log(response);

            const {statistics} = response.data;

            const statisticsData = [
                {
                    icon: 'smile',
                    iconColor: '#E38627',
                    title: 'Użytkowincy',
                    numbers: statistics.users,
                    comment: 'liczba zarejestrowanych użytkowników'
                },
                {
                    icon: 'pushpin',
                    iconColor: '#C13C37',
                    title: 'Liczba rekordów',
                    numbers: statistics.records,
                    comment: 'dostępne dane'
                },
                {
                    icon: 'tags',
                    iconColor: '#6A2135',
                    title: 'Subkategorie',
                    numbers: statistics.tags,
                    comment: 'dostępne'
                },
                {
                    icon: 'star',
                    iconColor: '#123455',
                    title: 'Kupione',
                    numbers: statistics.boughtTables,
                    comment: 'bazy dostarczone uzytkownikom'
                }
            ]

            this.setState({ statisticsData: statisticsData})
           
        })
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
                            <StatisticsSection statistics={this.state.statisticsData} />
                        </Content>
                    </Layout >
                    <TsFooter />
                </Layout>
            </div>
        );
    }
}

export default MainPageView;