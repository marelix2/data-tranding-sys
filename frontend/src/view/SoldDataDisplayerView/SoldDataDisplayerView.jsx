import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import classes from './SoldDataDisplayerView.module.css';
import { Col, Row } from 'antd';
import { Route } from 'react-router-dom';
import TsTable from './../../components/TsTable/TsTable';

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
            data: [
                [
                    {
                        value: 'tabela_1',
                        width: '4'
                    },
                    {
                        value: 'email',
                        width: '4'
                    },
                    {
                        value: 'gry',
                        width: '4'
                    },
                    {
                        value: '150',
                        width: '4'
                    },
                    {
                        value: '19-05-05',
                        width: '4'
                    }
                ]
            ]
        }
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