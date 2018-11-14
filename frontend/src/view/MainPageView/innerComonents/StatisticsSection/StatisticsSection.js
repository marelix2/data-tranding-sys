import React, { Component } from 'react';
import TsHeaderTitle from '../../../../components/TsHeaderTitle/TsHeaderTitle';
import {Row,Col} from 'antd';
import classes from './StatisticsSection.modules.css';

class StatisticsSection extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Row className={classes.statisticSectionWrapper}>
                    <Col span={12}><TsHeaderTitle message={'Jakiś śmieszny Tytuł'} textSize={72}/></Col>
                    <Col span={12}><TsHeaderTitle message={'Jakiś śmieszny Tytuł'} textSize={72}/></Col>
                </Row>
                <Row>
                <p>tu beda statystyki</p>
                </Row>
            </div>
        );
    }
}

export default StatisticsSection;