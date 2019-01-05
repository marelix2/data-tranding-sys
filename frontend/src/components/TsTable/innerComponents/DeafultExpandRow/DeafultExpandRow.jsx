import React from 'react';
import {Row,Col} from 'antd';
import classes from './DeafultExpandRow.module.css'

const ExpandRow = (props) => {
  console.log("eoeoeoeoe");
  const dataToDisplay = props.data.map((col,index) => {
    console.log("eoeoeoeoe");
    return(
      <Col key={index} offset={1} className={classes.ExpandCol}>
      <span className={classes.ColumnName}>{props.cols[index].name}:</span>  {col.value}
      </Col>
    )
  })
  return (
    <>
      <Row className={classes.ExpandWrapper}>
        {dataToDisplay}
      </Row>
    </>
  );
};

export default ExpandRow;