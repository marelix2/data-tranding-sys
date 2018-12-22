import React from 'react';
import { Row} from 'antd';
import Search from './innerComponents/Search';
import Header from './innerComponents/Header/Header';
import classes from './TsTable.module.css';
import TsRow from './innerComponents/TsRow/TsRow';

const TsTable = (props) => {
  const header = <Header headerCloumns={props.header}/>;
  const rows = props.rows.map((row,index) => (
        <TsRow key={index} class={classes.RowColor} data={row}></TsRow>
      )
  ) 
  return (
    <div>
      <Row >
        <Search/>
        <Row className={classes.TableWrapper}>
        {header}
        {rows}
        </Row>
      </Row>
    </div>
  );
};

export default TsTable;