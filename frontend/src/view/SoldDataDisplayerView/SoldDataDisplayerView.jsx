import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import classes from './SoldDataDisplayerView.module.css';
import { Col, Row } from 'antd';
import TsTable from './../../components/TsTable/TsTable';
import axios from './../../axiosAPI';
import Api from './../../endpoints';

class SoldDataDisplayerView extends Component {
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
                    name: 'tag',
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
        this.dataImportHandler();
    }

    dataImportHandler = () => {
        axios.put(Api.PUT_ALL_SOLD_DATA, { userId: localStorage.getItem('id'), status: 'completed' }).then((response) => {
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
                        value: 'gry',
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
        return (
            <div>
                <TsTitle
                    title='Dostarczone dane.'
                    image={{
                        name: 'soldData',
                        type: 'png'
                    }} />

                <Row>
                    <Col offset={1} span={22} className={classes.ContentWrapper}>
                    <TsTable
                header={this.state.header}
                rows={this.state.data} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SoldDataDisplayerView;