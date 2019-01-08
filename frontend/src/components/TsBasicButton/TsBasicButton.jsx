import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import classes from './TsBasicButton.module.css';
import { Link } from 'react-router-dom';

const TsBasicButton = (props) => {
    return (
        <Link to={props.directory}>
        <div className={classes.Wrapper} onClick={props.clicked}>
           <span className={classes.ButtonMessage}>{props.message}</span> 
           <Icon type={props.type} theme={props.theme} />
        </div>
       </Link>
        );
    };
    
TsBasicButton.propTypes = {
    message: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string.isRequired,
    directory: PropTypes.string.isRequired
}

export default TsBasicButton;