import React from 'react';
import {Row, Col} from 'antd';
import classes from './ChosenMark.module.css';

const ChosenMark = (props) => {
    return (
        <>
            <Row>
                <Col span={24} className={classes.ColumnWrapper}>
                    {props.isPayloadVisible ? (<h2 > {props.textInHeader} : {props.value}</h2>) : (<h2 className={classes.ChoiceProgress}>Najedź na znacznik</h2>)}
                </Col>
            </Row>
        </>
    );
};

export default ChosenMark;