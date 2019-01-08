import React from 'react';
import { Card, Icon } from 'antd';
import Selector from '../Selector/Selector';
import DataValueInput from '../DataValueInput/DataValueInput';
import TsBasicButton from './../../../../components/TsBasicButton/TsBasicButton';
import CardButton from '../../CardButton/CardButton';

const CalculatorForm = (props) => {

  const tagSelector = props.tags.length !== 0 ? (<Selector
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
        <Selector
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