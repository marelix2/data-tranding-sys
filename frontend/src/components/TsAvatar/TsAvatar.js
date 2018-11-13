import React, { Component } from 'react';
import {Avatar} from 'antd';

class TsAvatar extends Component {

constructor(props){
    super(props);

    this.state = {
        avatarShape: props.avatarShape || 'circle',
        avatarSize: props.avatarSize || 'default',
        avatarSrc: props.avatarSrc
    }
}

    render() {
        return (
            <div>
                <Avatar 
                 size={this.state.avatarSize}
                 shape={this.state.avatarShape}
                 src={this.state.avatarSrc}/> 
            </div>
        );
    }
}

export default TsAvatar;