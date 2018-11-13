import React, { Component } from 'react';
import {Card, Avatar } from 'antd';
import TsAvatar from '../TsAvatar/TsAvatar';

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
                    title={this.state.userNickname}
                    description={this.state.comment}
                />
                </Card>

            </div>
        );
    }
}

export default TsComment;