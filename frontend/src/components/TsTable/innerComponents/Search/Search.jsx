import React from 'react';
import { Input, Row, Col } from 'antd';

const SearchTable = Input.Search;

const Search = (props) => {
  return (
    <>
    <Row style={{marginBottom: '0.5em'}}>
      <Col span={8}>
      <SearchTable
        placeholder={props.placeholder}
        enterButton 
        onChange= {(event) => props.changed(event)}
        />
      </Col>
    </Row>
      
    </>
  );
};

export default Search;