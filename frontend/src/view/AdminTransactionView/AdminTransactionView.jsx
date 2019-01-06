import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from '../../components/TsTable/TsTable';
import axios from './../../axiosAPI';
import Api from './../../endpoints';
import TableActions from './InnerComponents/TableActions/TableActions';
import { Route } from 'react-router-dom';
import TransactionValidatePage from './InnerComponents/TransactionValidatePage/TransactionValidatePage';

class AdminTransactionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
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
    render() {
        const actions = <TableActions path={`${this.props.match.path}`} />
        return (
            <>
                <TsTitle title='Panel zarządzania trazakcjami'
                    image={{ name: 'buyData', type: 'png' }} />

                <Route exact path={`${this.props.match.path}`} render={() => (
                    <TsTable
                        header={this.state.header}
                        rows={this.state.data}
                        actions={actions}>
                    </TsTable>)} />

                <Route path={`${this.props.match.path}/:name`} render={() => {
                    console.log(this.props)
                return (
                    <TransactionValidatePage />
                ) }} />

            </>
        );
    }
}

export default AdminTransactionView;