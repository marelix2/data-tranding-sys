import React from 'react';
import TsComment from '../../../../components/TsComment/TsComment';
import {Row,Col} from 'antd';
import classes from './CommnetSection.module.css';


const CommentSection = (props) => {

    const comments = (props.comments.map((comment, index) => <TsComment
        key={index}
        avatarShape={comment.avatarShape}
        avatarSize={comment.avatarSize}
        avatarSrc={comment.avatarSrc}
        userNickname={comment.userNickname}
        comment={comment.comment} />)
)
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
                 {comments}
                 </Row>
             </div>
    );
};

export default CommentSection;