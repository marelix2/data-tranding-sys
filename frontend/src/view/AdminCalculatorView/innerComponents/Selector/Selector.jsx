import React from 'react';
import { Row, Col, Divider, Select } from 'antd';

const Option = Select.Option;



const Selector = (props) => {
  return (
    <>
      <Row gutter={22}>
        <Col offset={1} span={22}>
          <Divider>{props.title}</Divider>
        </Col>
        <Col offset={1} span={22}>
          <Select 
          onChange={props.handle} 
          style={{width:'100%'}}
          disabled={props.disabled}
          allowClear={props.allowClear}
          >
            {props.options}
          </Select></Col>
      </Row>

    </>
  );
};

export default Selector;