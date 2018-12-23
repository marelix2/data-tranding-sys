import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsDisplayer from '../../components/TsDisplayer/TsDisplayer';
import TsSteps from './InnerComponents/TsSteps';
import { Row, Col } from 'antd';
import classes from "./ExploreView.module.css";

class ExploreView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [
                {
                    status: 'process',
                    title: 'Wybór dziedziny',
                    description: 'wybór dziedziny',
                    icon: 'login'
                },
                {
                    status: 'wait',
                    title: 'krok pierwszy',
                    description: 'wybór dziedziny',
                    icon: 'login'
                },
                {
                    status: 'wait',
                    title: 'krok pierwszy',
                    description: 'wybór dziedziny',
                    icon: 'login'
                },
                {
                    status: 'wait',
                    title: 'krok pierwszy',
                    description: 'wybór dziedziny',
                    icon: 'login'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <TsTitle
                    title='Przeglądaj'
                    image={{ name: 'explore', type: 'png' }} />



                <Row>
                    <Row>
                        <Col span={20} offset={2}>
                            <TsSteps currentStep={1} steps={this.state.steps} />
                        </Col>
                    </Row>
                    <Row className={classes.ContentWrapper}>
                    <Col offset={2} span={10}>
                        <TsDisplayer image={{ name: 'letter', type: 'png' }}>
                            <h3> {'tytuł'}</h3>
                            <p> 0 wierszy</p>
                        </TsDisplayer>
                    </Col>
                    <Col span={10} >
                        <TsDisplayer image={{ name: 'letter', type: 'png' }}>
                            <h3> {'tytuł'}</h3>
                            <p> 0 wierszy</p>
                        </TsDisplayer>
                    </Col>
                    </Row>
                </Row>


            </div>
        );
    }
}

export default ExploreView;