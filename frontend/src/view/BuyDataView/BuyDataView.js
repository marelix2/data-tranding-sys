import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';
import { Button, Icon, Row, Col, Divider, Popconfirm } from 'antd';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import { Redirect} from 'react-router-dom';

import SummaryPanel from './InnerComponents/SummaryPanel/SummaryPanel';
import DirectoryButtons from './InnerComponents/DirectoryButtons/DirectoryButtons';

class BuyDataView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Nazwa',
                    width: '8'
                },
                {
                    name: 'Kategoria',
                    width: '4'
                },
                {
                    name: 'Liczba Wierszy',
                    width: '6'
                },
                {
                    name: 'Cena',
                    width: '2'
                }
            ],
            data: [],
            sumUp: [
                {
                    title: 'Całkowita liczba wierszy',
                    value: 0,
                    suffix: 'wierszy'
                },
                {
                    title: 'Koszt',
                    value: 0,
                    suffix: 'PLN'
                }
            ],
            shouldRedirect: false,
            disabled: true
        }
    }

    componentDidMount() {
        this.fetchCompanies();
        this.fetchEmails();
    }

    fetchEmails = () => {
        axios.put(Api.GET_EMAIL_TABLES, { userId: localStorage.getItem('id') }).then((response) => {

            let tables = [...this.state.data];
            let sumUp = [...this.state.sumUp];

            let data = response.data.tables.map((table) => {

                sumUp[0].value += table.rows;
                sumUp[1].value += table.rows * response.data.tableValue.value;

                return ([
                    {
                        value: table.name,
                        width: 8
                    },
                    {
                        value: 'Emaile',
                        width: 4
                    },
                    {
                        value: table.rows,
                        width: 6
                    },
                    {
                        value: response.data.tableValue.value + ' PLN',
                        width: 2
                    }
                ])
            })

            tables = [...tables, ...data];
            const isConfirmDisabled = tables.length === 0;
            this.setState({ data: tables, sumUp: sumUp, disabled: isConfirmDisabled});

        })
    }

    fetchCompanies = () => {
        axios.put(Api.GET_COMPANY_TABLES, { userId: localStorage.getItem('id') }).then((response) => {
            let tables = [...this.state.data];
            let sumUp = [...this.state.sumUp];

            let data = response.data.tables.map((table) => {

                sumUp[0].value += table.rows;
                sumUp[1].value += table.rows * response.data.tableValue.value;

                return ([
                    {
                        value: table.name,
                        width: 8
                    },
                    {
                        value: 'Firmy',
                        width: 4
                    },
                    {
                        value: table.rows,
                        width: 6
                    },
                    {
                        value: response.data.tableValue.value,
                        width: 2
                    }
                ])
            })

            tables = [...tables, ...data];
            const isConfirmDisabled = tables.length === 0;
            this.setState({ data: tables, sumUp: sumUp, disabled: isConfirmDisabled});

        })
    }

    clearCartHandler = () => {
        axios.put(Api.PUT_CLEAR_CART, { userId: localStorage.getItem('id') }).then((response) => {
            this.setState({ data: [] });
        })
    }

    buyConfirmedHandler = () => {
        axios.put(Api.PUT_BUY_CONFIRMED,{userId: localStorage.getItem('id')}).then((response) => {
            this.setState({ shouldRedirect: true})
        })
    }
   

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to='/dashboard/thanks'/>
        }

        return (
            <>
                <TsTitle title='Zakup Danych'
                    image={{ name: 'buyData', type: 'png' }} />

                <Row gutter={22}>
                    <Col offset={1} span={22}>
                        <Divider>Koszyk</Divider>
                    </Col>
                    <Col offset={1} span={22}>
                        <TsTable
                            header={this.state.header}
                            rows={this.state.data}
                            disableDownload={true}
                        ></TsTable>
                    </Col>

                    <Col offset={1} span={8}>
                        <Popconfirm placement="top" title={'Czy na pewno chcesz wyczyścić?'} onConfirm={() => this.clearCartHandler()} okText="Tak" cancelText="Nie">
                            <Button type='primary'>
                                Wyczyść <Icon type="fire" />
                            </Button>
                        </Popconfirm>

                    </Col>
                    <Col offset={1} span={22}>
                        <Divider>Podsumowanie</Divider>
                    </Col>
                    <Col offset={1} span={22}>
                        <SummaryPanel sumUp={this.state.sumUp} />

                    </Col>
                    <Col offset={1} span={22}>
                        <Divider></Divider>
                    </Col>
                    <Col offset={9} span={8}>
                        <DirectoryButtons 
                        confirmed={this.buyConfirmedHandler}
                        disabled={this.state.disabled}
                        />
                    </Col>
                    <Col offset={1} span={22}>
                        <Divider></Divider>
                    </Col>
                </Row>
            </>
        );
    }
}

export default BuyDataView;