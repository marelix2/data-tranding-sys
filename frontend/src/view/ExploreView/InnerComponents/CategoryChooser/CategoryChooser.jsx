import React from 'react';
import TsDisplayer from '../../../../components/TsDisplayer/TsDisplayer';
import classes from './CategoryChooser.module.css';
import { Button, Icon } from 'antd';
import StepTitle from '../StepTitle/StepTitle';
import {upperFirst} from 'lodash';
import {Row, Col } from 'antd';

const CategoryChooser = (props) => {
  const categories = props.data.map((category) => {
    console.log(category)
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
      <Row gutter={24}>
        <Col className={classes.CategoryWrapper}>
        <Button type="primary"
          onClick={() => props.goBack(props.pathUrl.home)}>
          <Icon type="left" />Powrót
        </Button>
       <StepTitle subText={'Wybierz: '} value={'Tag'}> 
       <p>Wybrano kategorie: {upperFirst(props.category)}</p>
       </StepTitle>
        </Col>
        <Col span={16} offset={4} className={classes.DisplayersWrapper}>{categories}</Col>
      </Row>

    </>
  );
};

export default CategoryChooser;