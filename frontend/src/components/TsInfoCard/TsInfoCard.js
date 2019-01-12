import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
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
            <Row>
                <Col offset={4}span={16}>
                <Row gutter={16}>
                    <Col offset={1}
                        span={10}>
                        <Icon type={this.state.icon}
                            theme='twoTone'
                            twoToneColor={this.state.iconColor}
                            style={{ fontSize: '4em' }} />
                    </Col>
                    <Col span={10}
                        style={{
                            fontSize: '3.5em',
                            lineHeight: '1.2em',
                        }}>
                        {this.state.numbers}
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col
                     offset={3}
                     span={18}
                     style={{
                         marginTop: '0.5em'
                     }}>
                        <h2>{this.state.title}</h2>
                    </Col>
                        <Col offset={3}
                            span={12}
                            style={{textAlign: 'center'}}>
                        {this.state.comment}
                    </Col>
                </Row>
            </Col>
            </Row>
        );
    }
}

export default TsInfoCard;