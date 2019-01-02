import React from 'react';
import classes from './TsDisplayer.module.css';
import { Link } from 'react-router-dom';

const TsDisplayer = (props) => {
  let imgSrc;
  if (props.img) {
    imgSrc ="data:image/png;base64," + props.img;
  }else {
    imgSrc = require(`./../../assets/displayer/${props.image.name}.${props.image.type || 'png'}`);
  }

  return (
    <>
     
      <div className={classes.DisplayerBox} >
      <Link to={props.path || 'home'}>
        <div className={classes.InnerWrapper}>
            <img className={classes.InnerWrapperImage} src={imgSrc} alt=""/>
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