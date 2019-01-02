import React from 'react';
import TsDisplayer from '../../../../components/TsDisplayer/TsDisplayer';
import classes from './CategoryChooser.module.css';
import { Button, Icon } from 'antd';
import StepTitle from '../StepTitle/StepTitle';
import {upperFirst} from 'lodash'

const CategoryChooser = (props) => {
  const categories = props.data.map((category) => {
    return (
      
      <TsDisplayer key={category.id}
        image={{ name: 'letter', type: 'png' }}
        img={category.img}
        path={`${props.pathUrl.current}/${category.name}`}>
        <h3> {category.title}</h3>
        <p> {category.rows} wierszy</p>
      </TsDisplayer>)
  })

  return (
    <>
      <div className={classes.CategoryWrapper}>
        <Button type="primary"
          onClick={() => props.goBack(props.pathUrl.home)}>
          <Icon type="left" />Powrót
        </Button>
       <StepTitle value={'Tag'}> 
       <p>Wybrano kategorie: {upperFirst(props.category)}</p>
       </StepTitle>
        <div className={classes.DisplayersWrapper}>{categories}</div>
      </div>

    </>
  );
};

export default CategoryChooser;