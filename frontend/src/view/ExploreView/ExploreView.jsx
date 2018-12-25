import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsSteps from './InnerComponents/TsSteps/TsSteps';
import { Row, Col } from 'antd';
import classes from "./ExploreView.module.css";
import BranchChooser from './InnerComponents/BranchChooser/BranchChooser';
import { Route, Redirect } from 'react-router-dom';
import CategoryChooser from './InnerComponents/CategoryChooser/CategoryChooser';
import { findIndex ,findLastIndex} from 'lodash';

class ExploreView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goBack: false,
            path: "",
            steps: [
                {
                    status: 'process',
                    title: 'Wybór Kategorii',
                    description: 'wybór dziedziny',
                    icon: 'highlight'
                },
                {
                    status: 'wait',
                    title: 'Wybór Tagu',
                    description: 'wybór dziedziny',
                    icon: 'tags'
                },
                {
                    status: 'wait',
                    title: 'Finalizacja',
                    description: 'wybór dziedziny',
                    icon: 'star'
                }
            ],
            emailCategories: [
                {
                    id: '1',
                    name: 'games',
                    title: 'gry',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '2',
                    title: 'botanika',
                    name: 'botany',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '3',
                    title: 'geografia',
                    name: 'geography',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '4',
                    title: 'vege',
                    name: 'vege',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '5',
                    title: 'religia',
                    name: 'religion',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '6',
                    title: 'moda',
                    name: 'fashion',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '7',
                    title: 'obuwie',
                    name: 'boots',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '8',
                    title: 'zwierzęta',
                    name: 'animals',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '9',
                    title: 'filmy',
                    name: 'films',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '10',
                    title: 'programowanie',
                    name: 'dev',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '11',
                    title: 'wyprzedaże',
                    name: 'sales',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '12',
                    title: 'samorozwój',
                    name: 'selfDev',
                    rows: 150,
                    imageType: 'png'
                }
            ],

            companyCategories: [
                {
                    id: '1',
                    name: 'games',
                    title: 'gry',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '2',
                    name: 'botanika',
                    title: 'botany',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '3',
                    name: 'geografia',
                    title: 'geography',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '4',
                    name: 'vege',
                    title: 'vege',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '5',
                    name: 'religia',
                    title: 'religion',
                    rows: 150,
                    imageType: 'png'
                },
                {
                    id: '6',
                    name: 'moda',
                    title: 'fashion',
                    rows: 150,
                    imageType: 'png'
                }
            ]
        }
    }

    stepForwardHandler = () => {
        let steps = [...this.state.steps];
        let index = findIndex(steps, (step) => step.status === 'process');

        if (index >= 0 && index < steps.length) {
            steps[index].status = 'finish';
            steps[index + 1].status = 'process';
            this.setState({ steps: steps });
        }

    }

    stepBackwardHandler = () => {
        let steps = [...this.state.steps];
        let index = findLastIndex(steps, (step) => step.status === 'finish');
 
        if (index >= 0 && index < steps.length) {
            steps[index].status = 'process';
            steps[index + 1].status = 'wait';
            this.setState({ steps: steps });
        }

    }

    goBackHandler = (path) => {
        this.stepBackwardHandler();
        this.setState({ goBack: true, path: path });
    }

    render() {
        if (this.state.goBack) {
            this.setState({ goBack: false });
            return <Redirect to={this.state.path} />;
        }

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
                        <Route exact path={`${this.props.match.path}`} render={() => (<BranchChooser pathUrl={this.props.match.url} />)} />
                        <Route
                            exact path={`${this.props.match.path}/emails`}
                            render={() => {
                                console.log(this.state.steps);
                                if(this.state.steps[0].status === 'process') this.stepForwardHandler()
                                return (<CategoryChooser category={'email'}
                                    data={this.state.emailCategories}
                                    pathUrl={{
                                        home: this.props.match.path,
                                        current: `${this.props.match.path}/emails`
                                    }}
                                    goBack={this.goBackHandler} />)
                            }
                            }
                        />
                        <Route
                            exact path={`${this.props.match.path}/companies`}
                            render={() => () => {
                                if(this.state.steps[0].status === 'process') this.stepForwardHandler()
                                return (<CategoryChooser
                                    category={'companies'}
                                    data={this.state.companyCategories}
                                    pathUrl={{
                                        home: this.props.match.path,
                                        current: `${this.props.match.path}/companies`
                                    }}
                                    goBack={this.goBack} />)
                            }}
                        />
                        <Route exact path={`${this.props.match.path}/emails/:category`} render={() => {
                            if(this.state.steps[1].status === 'process') this.stepForwardHandler()
                            return(<h1>eoeoeoeo</h1>)}
                            } />
                        <Route exact path={`${this.props.match.path}/companies/:category`} render={() => (<h1>eoeoeoeo</h1>)} />
                    </Row>
                </Row>
            </div>
        );
    }
}

export default ExploreView;