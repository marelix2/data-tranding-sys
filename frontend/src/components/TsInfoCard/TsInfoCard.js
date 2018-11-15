import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import clasess from './TsInfoCard.module.css';

class TsInfoCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            icon: props.infoCardIcon,
            iconColor: props.infoCardIconColor,
            title: props.infoCardTitle,
            numbers: props.infoCardNumbers,
            comment: props.infoCardComment,
        }
    }

    render() {
        return (
            <div>
                <Row
                type="flex"
                justify='center'
                align='center'
                className={clasess.infoCardWrapper}>
                    <Col >
                    <div className={clasess.infoCardTitle}>{this.state.title}</div>
                    <div className={clasess.infoCardNumbers}> <Icon type={this.state.icon} theme='twoTone' twoToneColor={this.state.iconColor}/> {this.state.numbers} </div>
                    <div className={clasess.infoCardComment}>{this.state.comment}</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TsInfoCard;