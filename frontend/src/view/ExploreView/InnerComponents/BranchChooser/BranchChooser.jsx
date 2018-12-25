import React from 'react';
import TsDisplayer from '../../../../components/TsDisplayer/TsDisplayer';
import classes from './BranchChooser.module.css';
import StepTitle from '../StepTitle/StepTitle';

const BranchChooser = (props) => {
    return (
        <>
            <div className={classes.BranchChooserWrapper}>
                <div className={classes.Title}>
                    <StepTitle  value='Kategorię' />
                </div>
                <div className={classes.ChooserComponents}>
                    <TsDisplayer image={{ name: 'letter', type: 'png' }} path={`${props.pathUrl}/emails`}>
                        <h3> {'Emaile'}</h3>
                        <p> {props.rows || 0} wierszy</p>
                    </TsDisplayer>
                    <TsDisplayer image={{ name: 'letter', type: 'png' }} path={`${props.pathUrl}/companies`}>
                        <h3> {'Firmy'}</h3>
                        <p> {props.rows || 0}  wierszy</p>
                    </TsDisplayer>
                </div>
            </div>
        </>
    );
};

export default BranchChooser;