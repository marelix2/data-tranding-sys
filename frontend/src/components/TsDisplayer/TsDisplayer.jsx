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

  const colors = [
    { color: '#F2BE54'},
    { color: '#F0D9CF' },
    { color: '#87AEB4' },
    { color: '#159D5C'}
  ]
  

  return (
    <>
     
      <div className={classes.DisplayerBox} >
      <Link to={props.path || 'home'}>
          <div className={classes.InnerWrapper}  >
            <img className={classes.InnerWrapperImage} src={imgSrc} style={{ background: colors[Math.floor(Math.random() * (+colors.length))].color }}alt=""/>
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