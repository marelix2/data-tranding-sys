import React from 'react';
import { Card } from 'antd';
import TsSelector from './../../../../components/TsSelector/TsSelector';
import DataValueInput from '../DataValueInput/DataValueInput';

import CardButton from '../../CardButton/CardButton';

const CalculatorForm = (props) => {

  const tagSelector = props.tags.length !== 0 ? (<TsSelector
    key={'Tag'}
    title={'Tag'}
    handle={props.handleChange.tag}
    options={props.tags}
    allowClear={false} />) : null

  const valueInput = props.tags.length !== 0 && props.dataValue ? (<DataValueInput
    value={props.dataValue}
    changed={props.onValueChange} />) : null

  return (
    <>
      <Card
        title={'Wypełnij Formularz'}
        actions={[<CardButton message='Zapisz' type='check' clicked={props.cardButtonClicked} />]}>
        <TsSelector
          key={'Kategoria'}
          title={'Kategoria'}
          handle={props.handleChange.category}
          options={props.categories}
          allowClear={true} />
        {tagSelector}
        {valueInput}

      </Card>
    </>
  );
};

export default CalculatorForm;