import React from 'react';
import { Card } from 'antd';
import Selector from '../Selector/Selector';

const CalculatorForm = (props) => {
  return (
    <>
      <Card>
        <Selector
        title={'Kategoria'}
        handleChange={props.handleChange}/>
        <Selector
        title={'Tag'}
        handleChange={props.handleChange}
        disabled={true}/>
      </Card>
    </>
  );
};

export default CalculatorForm;