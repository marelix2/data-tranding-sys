import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsSteps from './InnerComponents/TsSteps/TsSteps';
import { Row, Col, Divider, notification} from 'antd';
import classes from "./ExploreView.module.css";
import BranchChooser from './../../components/BranchChooser/BranchChooser';
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
            totalCompanies: 0,
            companyHeader: [
                {
                    name: 'Nazwa',
                    width: '9'
                },
                {
                    name: 'Tag',
                    width: '7'
                },
                {
                    name: 'Data zakupu',
                    width: '4'
                },
                {
                    name: 'Opis',
                    isHidden: true
                },
                {
                    name: 'Lokalizacja',
                    isHidden: true
                },
                {
                    name: 'Województwo',
                    isHidden: true
                },
                {
                    name: 'Numer Kontaktowy',
                    isHidden: true
                },
                {
                    name: 'strona internetowa',
                    isHidden: true
                },
                {
                    name: 'Kod pocztowy',
                    isHidden: true
                },
               
            ],
            emailHeader: [
                {
                    name: 'Nazwa',
                    width: '9'
                },
                {
                    name: 'Tag',
                    width: '7'
                },
                {
                    name: 'Data zakupu',
                    width: '4'
                }
            ],
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

    buyCategoryDataHandler = (data) => {
        axios.put(Api.PUT_TABLE_TO_BUY, { title: data, userId: localStorage.getItem('id') }).then((response) => {
            if(response.data.message) {
                notification.open({
                    message: response.data.message
                });
            }
        })
    }

    render() {
        if (this.state.goBack) {
            this.setState({ goBack: false });
            return <Redirect to={this.state.path} />;
        }

        const emailCategoryChildren = (<>
            <h3> {'Emaile'}</h3>
            <p> {this.state.totalEmails || 0} tagów</p>
            </>)

        const companyCategoryChildren = (<>
            <h3> {'Firmy'}</h3>
            <p> {this.state.totalCompanies || 0} tagów</p>
        </>)
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
                        <Route exact path={`${this.props.match.path}`} render={() => (<BranchChooser 
                        pathUrl={this.props.match.url}
                        emailCategoryChildren={emailCategoryChildren}
                        companyCategoryChildren = {companyCategoryChildren}
                         stepTitleText={ {subText:'Wybierz: ', value:'Kategorię', postText: null}}
                          />)} />
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
                            if (this.state.steps[1].status === 'process' || this.state.steps[0].status === 'process' ) this.stepForwardHandler()
                            return (<CategoryInfoPage
                                location={this.props.location.pathname}
                                path={`${this.props.match.path}/emails`}
                                tableHeader={this.state.emailHeader}
                                goBack={this.goBackHandler} 
                                category={'email'}
                                buyDataClicked={this.buyCategoryDataHandler}/>)
                        }
                        } />
                        <Route exact path={`${this.props.match.path}/companies/:category`} render={() => {
                            if (this.state.steps[1].status === 'process' || this.state.steps[0].status === 'process' ) this.stepForwardHandler()
                            return (<CategoryInfoPage
                                location={this.props.location.pathname}
                                path={`${this.props.match.path}/companies`}
                                tableHeader={this.state.companyHeader} 
                                goBack={this.goBackHandler}
                                category={'companies'}
                                showMap={true}
                                buyDataClicked={this.buyCategoryDataHandler}
                                />)
                        }} />
                    </Row>
                    <Col offset={1} span={22}> <Divider></Divider></Col>
                </Row>
            </div>
        );
    }
}

export default ExploreView;