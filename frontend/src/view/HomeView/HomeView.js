import React, { Component } from 'react';
import classes from './HomeView.module.css';
import CurrentValue from './innerComponents/WalletCurrentValue/CurrentValue';
import RecentlyViewedCategories from './innerComponents/RecentlyViewedCategories/RecentlyViewedCategories';
import { Col, Row } from 'antd';
import TsTable from './../../components/TsTable/TsTable';

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
            header: [
                {
                    name: 'Kolumna 1',
                    width: '4'
                },
                {
                    name: 'Miasta',
                    width: '4'
                },
                {
                    name: 'Co tam',
                    width: '3'
                },
                {
                    name: 'Super dluga nazwa',
                    width: '6'
                },
                {
                    name: 'col1',
                    width: '3'
                }
            ],
            data: [
                [
                    {
                        value: 'Kolumna 1',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Co tam',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 1',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Co tam',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 1',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Co tam',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ]
            ]        
        }
    }

    render() {
        return (
            <div className={classes.HomeViewWrapper}>
                {/* <Row gutter={24}>
                    <Col offset={2} span={12}>
                        <RecentlyViewedCategories data={this.state.explored}/>
                    </Col>
                    <Col span={8}>
                        <CurrentValue value={1345}/>
                    </Col>
                    
                </Row> */}

                <TsTable
                    header={this.state.header}
                    rows={this.state.data} />

            </div>

        );
    }
}

export default HomeView;
