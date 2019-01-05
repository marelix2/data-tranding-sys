import React from 'react'; 
import classes from './Header.module.css';
import { Row, Col} from 'antd';
import {upperCase} from 'lodash';

const Header = (props) => {
  const header = props.headerCloumns.map( (column,index) => {
    if (column.isHidden){
      return null;
    } 
    else{
      return (
        <Col key={index} span={column.width} >
          {upperCase(column.name)}
        </Col>
      )
    }
   
  })
  
  const actions = ( <Col span={4} className={classes.ActionHeader}>ACTIONS</Col>)

  return (
    <Row className={classes.HeaderWrapper}>
        {header}
        {actions}
    </Row>
  );
};

export default Header;