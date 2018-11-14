import React, { Component } from 'react';
import TsComment from './../../../components/TsComment/TsComment';
import {Row,Col} from 'antd';
import classes from './CommnetSection.module.css';

class CommentSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: props.comments
        }
    }

    onCommentGenerateHandle = () => {
        return this.state.comments.map( (comment, index) => <TsComment
        key={index}
         avatarShape={ comment.avatarShape} 
          avatarSize= { comment.avatarSize}
        avatarSrc = {comment.avatarSrc}
        userNickname = {comment.userNickname}
        comment={ comment.comment} />)
    }

    render() {
        return (
            <div className={classes.commnetSectionWrapper}>
                <Row type='flex'
                justify= 'space-around'
                align='bottom'>
                    <Col>
                    <h2>Komentarze:</h2>
                    </Col>
                </Row>
                <Row type='flex'
                justify= 'space-around'
                align='top'>
                {this.onCommentGenerateHandle()}
                </Row>
            </div>
        );
    }
}

export default CommentSection;