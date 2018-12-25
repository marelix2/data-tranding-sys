import React from 'react';
import classes from './StepTitle.module.css';

const StepTitle = (props) => {
  return (
    <>
      <h1 className={classes.Header}>Wybierz <span className={classes.Value}>{props.value}</span>:</h1>
      <h3 className={classes.Subtitle}>{props.children}</h3>
    </>
  );
};

export default StepTitle;