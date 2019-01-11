import React, { Component } from 'react';
import TsTable from '../../../../components/TsTable/TsTable';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';
import ValidationActions from '../ValidationActions/ValidationActions';
import { Divider, Col, Button, Icon, Popconfirm, notification } from 'antd';
import classes from './TransactionValidatePage.module.css';
import {filter} from 'lodash';
import {Redirect} from 'react-router-dom';
class TransactionValidatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailsHeader: [
                {
                    name: 'Id',
                    isHidden: true
                },
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
            companiesHeader: [
                {
                    name: 'Id',
                    isHidden: true
                },
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
                },
                {
                    name: 'Opis',
                    isHidden: true
                },
                {
                    name: 'Miasto',
                    isHidden: true
                },
                {
                    name: 'Kraj',
                    isHidden: true
                },
                {
                    name: 'Kod pocztowy',
                    isHidden: true
                },
                {
                    name: 'strona',
                    isHidden: true
                },
                {
                    name: 'Województwo',
                    isHidden: true
                },

            ],
          
            data: [],
            category: 'emails',
            stepBack: false
        }
    }

    componentDidMount() {
        this.fetchTransactionData();
    }

    fetchTransactionData = () => {
        axios.put(Api.PUT_USER_TRANSACTION, { id: this.props.tableId }).then((response) => {
            const { rows, type } = response.data;
            switch (type) {
                case 'emails':
                    const data = rows.map((row) => {
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
                                value: 'Emaile',
                                width: '8'
                            },
                            {
                                value: row.createdAt,
                                width: '4'
                            }
                        ])
                    })

                    this.setState({ data: data, category: type });

                    break;

                case 'companies':
                console.log(rows);
                   const  companies = rows.map((row) => {
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
                                value: 'Firmy',
                                width: '8'
                            },
                            {
                                value: row.createdAt,
                                width: '4'
                            },
                            {
                                value: row.description,
                                isHidden: true
                            },
                            {
                                value: row.locationCity,
                                isHidden: true
                            },
                            {
                                value: row.country,
                                isHidden: true
                            },
                            {
                                value: row.zipCode,
                                isHidden: true
                            },
                            {
                                value: row.website,
                                isHidden: true
                            },
                            {
                                value: row.province,
                                isHidden: true
                            },
                            
                            
                        ])
                    })

                    this.setState({ data: companies, category: type });

                    break;

                default:
                    break;
            }
        })
    }

    rowDeleteHandle = (id, category) => {
        axios.put(Api.DELETE_IN_PROGRESS_ROW_DATA, { rowId: id, category: category }).then((response) => {
           
           const data = this.state.data.map((row) => {  
               const d = filter(row , (r) => {
                   return r.value !== response.data.row.id;
               })
               if (d.length === row.length) return d;
            })
            this.setState( {data: filter(data , (d) => d!== undefined)});
        })
    }

    acceptTableHandler = () => {
        axios.put(Api.ACCEPT_PROGRESS_TABLE, {id: this.props.tableId, category: this.state.category}).then((response) => {
            this.props.updateTable(this.props.tableId);
            this.setState({stepBack: true})

            notification.open({
                message: 'Tabela Zaakceptowana!',
                description: `Portwel użytkownika ${localStorage.getItem('username')} zaktualizowany`,
            });
        })
    }

    deleteTableHandler = () => {
        axios.put(Api.DELETE_PROGRESS_TABLE, {id: this.props.tableId, category: this.state.category}).then((response) => {
            this.props.updateTable(this.props.tableId);
            this.setState({stepBack: true});
            notification.open({
                message: 'Unięto tabelę!',
                description: 'Nastąpiło automatyczne przekierowanie',
            });
        })
    }

    render() {

        if (this.state.stepBack) {
            return <Redirect to='/dashboard/admin/transactions' />
          }

        const actions = <ValidationActions rowDeleteHandle={this.rowDeleteHandle} category={this.state.category} />
        return (
            <>  <Col>
                <TsTable header={this.state.category === 'emails' ? this.state.emailsHeader : this.state.companiesHeader } 
                rows={this.state.data}
                 actions={actions}></TsTable>
            </Col>
                <Col>
                    <Divider></Divider>
                </Col>
                <Col offset={8} span={6} className={classes.Buttons}>
                    <Popconfirm placement="top" title={'Czy napewno chcesz usunąć dane?'} onConfirm={this.deleteTableHandler} okText="Tak" cancelText="Nie">
                        <Button type="danger" size={'large'}> <Icon type={'exclamation-circle'} /> Usuń całą tabele</Button>
                    </Popconfirm>
                    <Popconfirm placement="top" title={'Czy napewno chcesz zaakceptować dane?'} onConfirm={this.acceptTableHandler} okText="Tak" cancelText="Nie">
                    <Button type="primary" size={'large'} > Zaakceptuj <Icon type={'check'} /></Button>
                    </Popconfirm>
                </Col>
            </>
        );
    }
}

export default TransactionValidatePage;