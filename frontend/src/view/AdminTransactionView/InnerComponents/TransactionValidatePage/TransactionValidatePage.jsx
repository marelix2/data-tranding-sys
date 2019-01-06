import React, { Component } from 'react';
import TsTable from '../../../../components/TsTable/TsTable';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';

class TransactionValidatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Wartość',
                    width: '8'
                },
                {
                    name: 'Kategoria danych',
                    width: '8'
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
        this.fetchTransactionData();
    }

    fetchTransactionData = () => {
        axios.put(Api.PUT_USER_TRANSACTION, { id: this.props.tableId }).then((response) => {
            console.log(response.data.rows);
            const {rows, type} = response.data;

            switch(type) {
                case 'emails':
                    const data = rows.map( (row) => {
                        return ( [
                            {
                                value: row.name,
                                width: '8'
                            },
                            {
                                value: 'Emaile',
                                width: '8'
                            },
                            {
                                value: row.createdAt,
                                width: '4'
                            }
                        ])
                    })  

                    this.setState({data: data});

                break;

                case 'companies':
                break;

                default:
                break;
            }
        })
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <TsTable header={this.state.header} rows={this.state.data}></TsTable>
            </div>
        );
    }
}

export default TransactionValidatePage;