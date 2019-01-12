import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';
import WalletCurrentValue from './innerComponents/WalletCurrentValue/WalletCurrentValue';
import { Row, Col, Divider } from 'antd';
import classes from './WalletView.module.css';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import moment from 'moment';
class WalletView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Nazwa',
                    width: '4'
                },
                {
                    name: 'Kategoria danych',
                    width: '4'
                },
                {
                    name: 'status',
                    width: '4'
                },
                {
                    name: 'Liczba wierszy',
                    width: '4'
                },
                {
                    name: 'Data dostarczenia',
                    width: '4'
                }
            ],
            data: [],
            walletValue: 0
        }
    }
    componentDidMount() {
        this.fetchWalletValue();
        this.fetchTransactions();
    }

    fetchWalletValue = () => {
        axios.put(Api.GET_CURRENT_VALUE, { userId: localStorage.getItem('id') }).then((response) => {
            this.setState({ walletValue: response.data.current.currentState })
        })
    }

    fetchTransactions = () => {
        axios.put(Api.PUT_ALL_USER_PROGRESS_DATA, { userId: localStorage.getItem('id'), status: 'progress' }).then((response) => {
            const data = response.data.tables.map((row) => {
                return ([
                    {
                        value: row.name,
                        width: '4'
                    },
                    {
                        value: row.category,
                        width: '4'
                    },
                    {
                        value: 'progress',
                        width: '4'
                    },
                    {
                        value: row.rows,
                        width: '4'
                    },
                    {
                        value: moment(row.createdAt).format("YYYY-DD-MM"),
                        width: '4'
                    }
                ])
            })

            this.setState({ data: data });
        })
    }

    render() {
        return (
            <div>
                <TsTitle
                    title='Twój Portwel.'
                    image={{
                        name: 'wallet',
                        type: 'png'
                    }} />

                <Row gutter={24}>
                    <Col offset={2} span={20} className={classes.ColWrapper}>
                        <WalletCurrentValue value={this.state.walletValue} />
                    </Col>
                    <Col offset={1} span={22}>
                        <Divider>Operacje w toku</Divider>
                    </Col>
                    <Col offset={1} span={22} className={classes.ColWrapper}>
                        <TsTable
                            header={this.state.header}
                            rows={this.state.data}
                            disableDownload={true}/>
                    </Col>
                </Row>



            </div>
        );
    }
}

export default WalletView;