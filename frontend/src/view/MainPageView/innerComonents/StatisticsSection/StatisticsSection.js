import React, { Component } from 'react';
import TsHeaderTitle from '../../../../components/TsHeaderTitle/TsHeaderTitle';
import { Row, Col } from 'antd';
import classes from './StatisticsSection.module.css';
import chart from './../../../../assets/chart/chart_mockup.png';
import TsInfoCard from './../../../../components/TsInfoCard/TsInfoCard';

class StatisticsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statisticsData: [
                {
                    icon: 'stop',
                    iconColor: '#eb2f96',
                    title: 'Super title',
                    numbers: 12345678,
                    comment: 'some data'
                },
                {
                    icon: 'smile',
                    iconColor: '#eb2f96',
                    title: 'Super long long long title',
                    numbers: 12345678,
                    comment: 'some data'
                },
                {
                    icon: 'shopping',
                    iconColor: '#eb2f96',
                    title: 'Super title',
                    numbers: 12345678,
                    comment: 'some data'
                },
                {
                    icon: 'shop',
                    iconColor: '#eb2f96',
                    title: 'Super title',
                    numbers: 12345678,
                    comment: 'some data'
                },
                {
                    icon: 'gift',
                    iconColor: '#eb2f96',
                    title: 'Super title',
                    numbers: 12345678,
                    comment: 'some data'
                }
            ]
        }
    }

    onStatisticInfoCardRender = () => {
        return this.state.statisticsData.map((statistic) => {
            return (
                <div className={classes.statisticsSectionCard}>
                    <TsInfoCard
                        infoCardIcon={statistic.icon}
                        infoCardIconColor={statistic.iconColor}
                        infoCardTitle={statistic.title}
                        infoCardNumbers={statistic.numbers}
                        infoCardComment={statistic.comment} />
                </div>
            )
        }
        )

    }

    render() {
        return (
            <div className={classes.statisticSectionBackground}>
                <Row>
                    <Col span={12}>
                        <Row
                            type='flex'
                            align='middle'
                            className={classes.statisticSectionTitle}>
                            <TsHeaderTitle message={'Statystyki naszych użytkowników'} textSize={72} /></Row>
                    </Col>
                    <Col span={6}>
                        <Row type='flex'
                            align='middle'
                            className={classes.statisticSectionTitle}>
                            <Col offset={6}>
                                <img src={chart} alt="mockup of future donut chart"></img>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row type='flex'
                align='middle'
                justify='space-around'
                >
                    {this.onStatisticInfoCardRender()}
                </Row>
            </div>
        );
    }
}

export default StatisticsSection;