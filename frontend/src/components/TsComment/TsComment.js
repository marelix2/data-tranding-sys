import React, { Component } from 'react';
import {Card, Avatar, Row } from 'antd';
import TsAvatar from '../TsAvatar/TsAvatar';
import classes from './TsComment.module.css';

const { Meta } = Card;

class TsComment extends Component {
    constructor(props){
        super(props);

        this.state = {
            avatarShape: props.avatarShape,
            avatarSize: props.avatarSize,
            avatarSrc: props.avatarSrc,
            userNickname: props.userNickname,
            comment: props.comment,
        }
    }

    render() {
        return (
            <div>
                <Card style={{ width: '25vw', marginTop: 16 }}>
                <Meta
                    avatar={<TsAvatar avatarSize={this.state.avatarSize} avatarShape={this.state.avatarShape} avatarSrc={this.state.avatarSrc}/>}
                    title={<Row className={classes.commnetRowTitle} type='flex' justify='start'>{this.state.userNickname}</Row>}
                    description={<Row className={classes.commentRowDescription}>"{this.state.comment}"</Row>}
                />
                </Card>

            </div>
        );
    }
}

export default TsComment;