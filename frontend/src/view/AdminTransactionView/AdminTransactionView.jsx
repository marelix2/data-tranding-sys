import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from '../../components/TsTable/TsTable';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import TableActions from './InnerComponents/TableActions/TableActions';
import { Route } from 'react-router-dom';
import TransactionValidatePage from './InnerComponents/TransactionValidatePage/TransactionValidatePage';
import { Row, Col, Divider } from 'antd';
import {filter} from 'lodash';

class AdminTransactionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'id',
                    isHidden: true
                },
                {
                    name: 'Nazwa',
                    width: '8'
                },
                {
                    name: 'Kategoria danych',
                    width: '4'
                },
                {
                    name: 'Liczba wierszy',
                    width: '4'
                },
                {
                    name: 'Data zakupu',
                    width: '4'
                }
                
            ],
            data: []
        }
    }

    componentDidMount() {
        this.dataImportHandler()
    }

    dataImportHandler = () => {
        axios.put(Api.PUT_ALL_IN_PROGRESS_DATA, { status: 'progress' }).then((response) => {
            const data = response.data.tables.map((row) => {
                return ([
                    {
                        value: row.id,
                        isHidden: true
                    },
                    {
                        value: row.name,
                        width: '8'
                    },
                    {
                        value: row.category,
                        width: '4'
                    },
                    {
                        value: row.rows,
                        width: '4'
                    },
                    {
                        value: row.createdAt,
                        width: '4'
                    }
                ])
            })

            this.setState({ data: data });
        })
    }

    tableUpdateHandler = (tableId) => {
        const tables = [...this.state.data];
        const data = tables.map((row) => {  
            const d = filter(row , (r) => { 
                return r.value !== parseInt(tableId);
            })
            if (d.length === row.length) return d;
         })

         this.setState( {data: filter(data , (d) => d !== undefined)});
        
    }


    render() {
        const actions = <TableActions path={`${this.props.match.path}`} />
        return (
            <>
                <TsTitle title='Panel zarządzania transakcjami'
                    image={{ name: 'buyData', type: 'png' }} />
                <Row>
                    <Col offset={1} span={22}>
                        <Route exact path={`${this.props.match.path}`} render={() => (
                            <TsTable
                                header={this.state.header}
                                rows={this.state.data}
                                actions={actions}>
                            </TsTable>)} />

                        <Route path={`${this.props.match.path}/:id`} render={(props) => {
                            return (
                                <TransactionValidatePage tableId={props.match.params.id} updateTable={this.tableUpdateHandler}/>
                            )
                        }
                    } />
                    </Col>
                    <Col offset={1} span={22}> <Divider></Divider></Col>
                </Row>

                

            </>
        );
    }
}

export default AdminTransactionView;