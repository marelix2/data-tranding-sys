import React from 'react';
import TsDisplayer from './../TsDisplayer/TsDisplayer';
import classes from './BranchChooser.module.css';
import StepTitle from './../StepTitle/StepTitle';

const BranchChooser = (props) => {
    return (
        <>
            <div className={classes.BranchChooserWrapper}>
                <div className={classes.Title}>
                    <StepTitle subText={props.stepTitleText.subText} value={props.stepTitleText.value} postText={props.stepTitleText.postText} />
                </div>
                <div className={classes.ChooserComponents}>
                    <TsDisplayer image={{ name: 'letter', type: 'png' }} path={`${props.pathUrl}/emails`}>
                         {props.emailCategoryChildren}
                    </TsDisplayer>
                    <TsDisplayer image={{ name: 'company', type: 'png' }} path={`${props.pathUrl}/companies`}>
                        {props.companyCategoryChildren}
                    </TsDisplayer>
                </div>
            </div>
        </>
    );
};

export default BranchChooser;