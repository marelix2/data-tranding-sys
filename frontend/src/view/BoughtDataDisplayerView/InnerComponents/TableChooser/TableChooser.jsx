import React from 'react';
import classes from './TableChooser.module.css'
import TsDisplayer from '../../../../components/TsDisplayer/TsDisplayer';

const TableChooser = (props) => {
  return (
    <>
      <div className={classes.ContentWrapper}>
        <TsDisplayer image={{ name: 'letter', type: 'png' }} path={`${props.path}/emails`}>
          <h3> {'Emaile'}</h3>
          <p> {props.emailRows || 0} wykupionych</p>
        </TsDisplayer>
        <h1> Której kategorii szukasz? </h1>
        <TsDisplayer image={{ name: 'letter', type: 'png' }} path={`${props.path}/companies`}>
          <h3> {'Firmy'}</h3>
          <p> {props.companyRows || 0} wykupionych</p>
        </TsDisplayer>
      </div>

    </>
  );
};

export default TableChooser;