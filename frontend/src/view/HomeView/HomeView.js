import React, { Component } from 'react';
import classes from './HomeView.module.css';
import CurrentValue from './innerComponents/WalletCurrentValue/CurrentValue';
import RecentlyViewedCategories from './innerComponents/RecentlyViewedCategories/RecentlyViewedCategories';
import { Col, Row } from 'antd';
import axios from './../../axiosAPI';
import Api from './../../endpoints';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explored: [
                {
                    categoryName: 'kategoria 1',
                    dataToDisplay: {
                        date: '12-12-12'
                    },
                    path: 'explore'
                },
                {
                    categoryName: 'kategoria 2',
                    dataToDisplay: {
                        date: '12-12-12'
                    },
                    path: 'explore'
                },
                {
                    categoryName: 'kategoria 3',
                    dataToDisplay: {
                        date: '12-12-12'
                    },
                    path: 'explore'
                },
                {
                    categoryName: 'kategoria 4',
                    dataToDisplay: {
                        date: '12-12-12'
                    },
                    path: 'explore'
                }
            ],

            walletValue: 0
        }
    }

    componentDidMount() {
        this.fetchWalletValue();
        this.fetchExplored();
    }

    fetchWalletValue = () => {
        axios.put(Api.GET_CURRENT_VALUE, {userId: 1}).then((response) => {
            this.setState({walletValue: response.data.current.currentState})
        })
    }

    fetchExplored = () => {
        axios.put(Api.GET_EXPLORED, { userId: 1 }).then((response) => {
            console.log(response);
            const explored = response.data.exploredTag.map((tag) => {
                return ({
                    categoryName: tag.name,
                    dataToDisplay: {
                        date: tag.updatedAt
                    },
                    path: tag.path
                })
            })

            this.setState({explored: explored})
        })
    }

    render() {
        return (
            <div className={classes.HomeViewWrapper}>
                <Row gutter={24}>
                    <Col offset={2} span={12}>
                        <RecentlyViewedCategories data={this.state.explored}/>
                    </Col>
                    <Col span={8}>
                        <CurrentValue value={this.state.walletValue}/>
                    </Col>
                </Row>
                
            </div>

        );
    }
}

export default HomeView;
