import React from 'react';
import {Row, Col} from 'antd';

const commentTitle = (props) => {
    return (
        <div>
            <Row> 
                <Col>
            {props.userNickname}
            </Col>
            </Row>
        </div>
    );
};

export default commentTitle;