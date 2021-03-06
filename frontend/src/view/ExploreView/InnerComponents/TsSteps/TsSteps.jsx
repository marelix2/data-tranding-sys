import React from 'react';
import { Steps,Icon } from 'antd';

const Step = Steps.Step;

const TsSteps = (props) => {
  const steps = props.steps.map((step, index) => {
    return (
      <Step key={index} status={step.status} title={step.title} icon={<Icon type={step.icon} />} />
    )
  })
  return (
    <>
      <Steps current={props.currentStep}>
        {steps}
      </Steps>
    </>
  );
};

export default TsSteps;