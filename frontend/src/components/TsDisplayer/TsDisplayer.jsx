import React from 'react';
import classes from './TsDisplayer.module.css';
import { Link } from 'react-router-dom';

const TsDisplayer = (props) => {
  const imgSrc = require(`./../../assets/displayer/${props.image.name}.${props.image.type || 'png'}`);
  return (
    <>
     
      <div className={classes.DisplayerBox} >
      <Link to={props.path || 'home'}>
        <div className={classes.InnerWrapper}>
            <img classname={classes.InnerWrapperImage} src={imgSrc} alt=""/>
            <div className={classes.childComponent}>
              {props.children}
            </div>
          </div>
          </Link>
      </div>
      
    </>
  );
};

export default TsDisplayer;