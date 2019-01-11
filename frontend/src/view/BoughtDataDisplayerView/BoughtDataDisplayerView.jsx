import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';
import classes from './BoughtDataDisplayerView.module.css';
import { Col, Row } from 'antd';
import { Route } from 'react-router-dom';
import TableChooser from './InnerComponents/TableChooser/TableChooser';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import { getPathFromUrl } from './../../utils';
import {filter} from 'lodash';
import moment from 'moment'
class BoughtDataDisplayerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Nazwa',
                    width: '9'
                },
                {
                    name: 'Liczba wierszy',
                    width: '7'
                },
                {
                    name: 'Data zakupu',
                    width: '4'
                }
            ],
            data: [],
            shouldFetch: true,
            emailRows: 0,
            companyRows: 0
        }
    }
    
    componentDidMount() {
        this.fetchNumberOfTables();
    }

    fetchData = (category) => {
        if (this.state.shouldFetch && category === 'emails') {
            axios.put(Api.PUT_ALL_BOUGHT_DATA_EMAIL, { userId: localStorage.getItem('id'), categoryId: 1 }).then((response) => {
                const data = response.data.tables.map((row) => {
                    return ([
                        {
                            value: row.name,
                            width: '9'
                        },
                        {
                            value: row.rows,
                            width: '7'
                        },
                        {
                            value: moment(row.createdAt).format("YYYY-DD-MM"),
                            width: '4'
                        }
                    ])
                })

                this.setState({ data: data, shouldFetch: false });
            })
        } else if (this.state.shouldFetch && category === 'companies') {
            axios.put(Api.PUT_ALL_BOUGHT_DATA_COMPANY, { userId: localStorage.getItem('id'), categoryId: 2 }).then((response) => {
                const data = response.data.tables.map((row) => {
                    return ([
                        {
                            value: row.name,
                            width: '9'
                        },
                        {
                            value: row.rows,
                            width: '7'
                        },
                        {
                            value: moment(row.createdAt).format("YYYY-DD-MM"),
                            width: '4'
                        }
                    ])
                })

                this.setState({ data: data, shouldFetch: false });
            })
        }
    }

    fetchNumberOfTables() {
        axios.put(Api.PUT_TABLES_NUMBER, { userId: localStorage.getItem('id')}).then((response) => {
            const emailRows = filter(response.data.tables , (row) =>{return row.categoryId === 1});
            const companyRows = filter(response.data.tables, (row) =>{return row.categoryId === 2 });
            this.setState({ emailRows: emailRows.length, companyRows: companyRows.length});
        })
    }

    render() {
        return (
            <>
                <TsTitle
                    title='Kupione Dane'
                    image={{ name: 'boughtData', type: 'png' }} />

                <Row>

                    <Route exact path={`${this.props.match.path}`} render={() => (<TableChooser path={this.props.match.path} emailRows={this.state.emailRows} companyRows={this.state.companyRows} />)} />
                    <Route path={`${this.props.match.path}/:category`} render={() => {
                        this.fetchData(getPathFromUrl(this.props.location.pathname, this.props.match.path));
                        return (
                            <Col offset={1} span={22} className={classes.ContentWrapper}>
                                <TsTable
                                    header={this.state.header}
                                    rows={this.state.data} />
                            </Col>)
                    }
                    } />
                </Row>
            </>
        );
    }
}

export default BoughtDataDisplayerView;



