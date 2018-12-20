import React from 'react';
import classes from './TsDisplayer.module.css';
import { Link } from 'react-router-dom';

const TsDisplayer = (props) => {
  const imgSrc = require(`./../../assets/titleViewsImages/${props.image.name}.${props.image.type || 'png'}`);
  return (
    <>
     <Link to={props.path || 'home'}>
      <div className={classes.DisplayerBox} >
        <div className={classes.InnerWrapper}>
            <img classname={classes.InnerWrapperImage} src={imgSrc} alt=""/>
            <div className={classes.childComponent}>
              {props.children}
            </div>
          </div>
      </div>
      </Link>
    </>
  );
};

export default TsDisplayer;