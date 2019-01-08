import React from 'react';
import { InputNumber, Row, Col, Divider } from 'antd';

const DataValueInput = (props) => {

    return (
        <Row gutter={22}>
            <Col offset={1} span={22}>
                <Divider></Divider>
            </Col>
            <Col offset={1} span={20}>
                <InputNumber
                    defaultValue={props.value}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    step={0.01}
                    onChange={props.changed}
                    min={0}
                    style={{ width: '100%' }} />
            </Col>
            <Col offset={1} span={2}>
                <span> PLN</span> 
             </Col>

        </Row>
    );
};

export default DataValueInput;