import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';
import { Button, Icon, Row, Col, Divider } from 'antd';
import axios from './../../axiosAPI';
import Api from './../../endpoints';

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
            ]
        }
    }

    componentDidMount() {
        this.fetchCompanies();
        this.fetchEmails();
    }

    fetchEmails = () => {
        axios.put(Api.GET_EMAIL_TABLES, { userId: localStorage.getItem('id') }).then((response) => {
            console.log(response);

            let tables = [...this.state.data];

            let data = response.data.tables.map((table) => {
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
                        value: 0.1,
                        width: 2
                    }
                ])
            })

            tables = [...tables,...data];
            this.setState({data:tables});

        })
    }

    fetchCompanies = () => {
        axios.put(Api.GET_COMPANY_TABLES, { userId: localStorage.getItem('id') }).then((response) => {
            let tables = [...this.state.data];

            let data = response.data.tables.map((table) => {
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
                        value: 0.1,
                        width: 2
                    }
                ])
            })

            tables = [...tables, ...data];
            this.setState({ data: tables });
        })
    }

    render() {
        return (
            <div>
                <TsTitle title='Zakup Danych'
                    image={{ name: 'buyData', type: 'png' }} />

                <Row gutter={22}>
                    <Col offset={1} span={22}>
                        <Divider>Koszyk</Divider>
                    </Col>
                    <Col offset={1} span={22}>
                        <TsTable header={this.state.header} rows={this.state.data}></TsTable>
                    </Col>

                    <Col offset={1} span={8}>
                        <Button type='primary' onClick={() => console.log("kiedys usunę dane!")}>
                            Wyczyść <Icon type="fire" />
                        </Button>
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
                        <DirectoryButtons />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BuyDataView;