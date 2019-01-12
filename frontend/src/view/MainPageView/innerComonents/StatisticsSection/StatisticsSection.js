
import TsHeaderTitle from '../../../../components/TsHeaderTitle/TsHeaderTitle';
import { Row, Col, Divider } from 'antd';
import chart from './../../../../assets/chart/chart_mockup.png';
import TsInfoCard from './../../../../components/TsInfoCard/TsInfoCard';
import PieChart from 'react-minimal-pie-chart';


import React from 'react';

const StatisticsSection = (props) => {

    const statistics = props.statistics.map((statistic, index) => {
        return (
            <Col offset={1} span={5}
                key={index}>
                <TsInfoCard
                    infoCardIcon={statistic.icon}
                    infoCardIconColor={statistic.iconColor}
                    infoCardTitle={statistic.title}
                    infoCardNumbers={statistic.numbers}
                    infoCardComment={statistic.comment} />
            </Col>
        )})

   
    const stats = props.statistics.map( stats => stats.numbers);
    console.log(stats);
    return (
        <div>
            <Row>
                <Col><Divider></Divider></Col>
                <Col  offset={2} span={10}>
                        <TsHeaderTitle message={'Statystyki strony'} textSize={96} />
                        <TsHeaderTitle message={'Prezentacja danych'} textSize={36} /> 
                </Col>
                
                <Col offset={2}span={6}>
                    <Row >
                        <Col offset={6}>
                            <PieChart
                                data={[
                                    { title: 'One', value: stats[0], color: '#E38627' },
                                    { title: 'Two', value: stats[1], color: '#C13C37' },
                                    { title: 'Three', value: stats[2], color: '#6A2135' },
                                    { title: 'Three', value: stats[3], color: '#123455' },
                                ]}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Col>
                <Divider></Divider>
            </Col>
            <Row gutter={18}>
                {statistics}
            </Row>
            <Col>
                <Divider></Divider>
            </Col>
        </div>
    );
};

export default StatisticsSection;