import React, { Component } from 'react';
import classes from './HomeView.module.css';
import CurrentValue from './innerComponents/WalletCurrentValue/CurrentValue';
import RecentlyViewedCategories from './innerComponents/RecentlyViewedCategories/RecentlyViewedCategories';
import { Col, Row } from 'antd';

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
        }
    }

    render() {
        return (
            <div className={classes.HomeViewWrapper}>
                <Row gutter={24}>
                    <Col offset={2} span={12}>
                        <RecentlyViewedCategories data={this.state.explored}/>
                    </Col>
                    <Col span={8}>
                        <CurrentValue value={1345}/>
                    </Col>
                </Row>
                
            </div>

        );
    }
}

export default HomeView;
