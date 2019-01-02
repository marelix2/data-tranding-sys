import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsSteps from './InnerComponents/TsSteps/TsSteps';
import { Row, Col } from 'antd';
import classes from "./ExploreView.module.css";
import BranchChooser from './InnerComponents/BranchChooser/BranchChooser';
import { Route, Redirect } from 'react-router-dom';
import CategoryChooser from './InnerComponents/CategoryChooser/CategoryChooser';
import { findIndex, findLastIndex } from 'lodash';
import CategoryInfoPage from './InnerComponents/CategoryInfoPage/CategoryInfoPage';
import axios from '../../axiosAPI';
import Api from './../../endpoints';

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
            ],

            companyCategories: [
            ],
            totalEmails: 0,
            totalCompanies: 0
              
        }
    }

    componentDidMount() {
        this.fetchCategories();
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

    fetchCategories = () => {

        axios.put(Api.GET_EMAIL_CATEGORIES).then((response) => {
            const emailCategories = response.data.emailTags.map((tag) => {
                return ({
                    id: tag.id,
                    title: tag.title,
                    name: tag.name,
                    rows: tag.rows,
                    img: tag.img
                });
            })

            this.setState({
                emailCategories: emailCategories,
                totalEmails: emailCategories.length
            })
        });

        axios.put(Api.GET_COMPANY_CATEGORIES).then((response) => {
            const companyCategories = response.data.companyTags.map((tag) => {
                return ({
                    id: tag.id,
                    title: tag.title,
                    name: tag.name,
                    rows: tag.rows,
                    img: tag.img
                });
            })
            
            this.setState({
                companyCategories: companyCategories,
                totalCompanies: companyCategories.length
            });
        });

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
                        <Route exact path={`${this.props.match.path}`} render={() => (<BranchChooser pathUrl={this.props.match.url} totalEmails={this.state.totalEmails} totalCompanies={this.state.totalCompanies} />)} />
                        <Route
                            exact path={`${this.props.match.path}/emails`}
                            render={() => {
                                if (this.state.steps[0].status === 'process') this.stepForwardHandler();
                                return (<CategoryChooser category={'email'}
                                    data={this.state.emailCategories}
                                    pathUrl={{
                                        home: this.props.match.path,
                                        current: `${this.props.match.path}/emails`
                                    }}
                                    goBack={this.goBackHandler} />)
                            }}
                        />
                        <Route exact path={`${this.props.match.path}/companies`}
                            render={() => {
                                if (this.state.steps[0].status === 'process') this.stepForwardHandler();
                                return (<CategoryChooser
                                    category={'companies'}
                                    data={this.state.companyCategories}
                                    pathUrl={{
                                        home: this.props.match.path,
                                        current: `${this.props.match.path}/companies`
                                    }}
                                    goBack={this.goBackHandler} />)
                            }}
                        />
                        <Route exact path={`${this.props.match.path}/emails/:category`} render={() => {
                            if (this.state.steps[1].status === 'process') this.stepForwardHandler()
                            return (<CategoryInfoPage location={this.props.location.pathname} path={`${this.props.match.path}/emails`} />)
                        }
                        } />
                        <Route exact path={`${this.props.match.path}/companies/:category`} render={() => {
                            if (this.state.steps[1].status === 'process') this.stepForwardHandler()
                            return (<CategoryInfoPage location={this.props.location.pathname} path={`${this.props.match.path}/companies`} />)
                        }} />
                    </Row>
                </Row>
            </div>
        );
    }
}

export default ExploreView;