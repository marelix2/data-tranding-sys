import React from 'react';
import {Icon} from 'antd';
import classes from './CardButton.module.css';

const CardButton = (props) => {
    return (
        <div className={classes.Wrapper} onClick={props.clicked}>
            <span className={classes.ButtonMessage}>{props.message}</span>
            <Icon type={props.type} theme={props.theme} />
        </div>
    );
};

export default CardButton;