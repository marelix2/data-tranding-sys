import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Row, Col, Icon} from 'antd'
import TsTitle from '../../components/TsTitle/TsTitle';

const ThankYouView = () => {
    return (
        <div>
            <TsTitle
                title='Dziękujemy za zakup'
                image={{
                    name: 'check',
                    type: 'png'
                }} />
                <Row gutter={24}>
                    <Col offset={11} span={11} >
                    <Link to={'/dashboard/home'}><Button> Powrót <Icon type='home'></Icon></Button></Link>
                </Col>
                </Row>
            
        </div>
    );
};

export default ThankYouView;