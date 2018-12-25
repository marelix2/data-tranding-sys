import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';
import classes from './BoughtDataDisplayerView.module.css';
import { Col, Row } from 'antd';

class BoughtDataDisplayerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Nazwa',
                    width: '6'
                },
                {
                    name: 'tag',
                    width: '6'
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
                        width: '6'
                    },
                    {
                        value: 'gry',
                        width: '6'
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
            <>
                <TsTitle
                    title='Kupione Dane'
                    image={{ name: 'boughtData', type: 'png' }} />

                <Row>
                    <Col offset={1} span={22} className={classes.ContentWrapper}>
                        <TsTable
                            header={this.state.header}
                            rows={this.state.data} />
                    </Col>
                </Row>
            </>
        );
    }
}

export default BoughtDataDisplayerView;



