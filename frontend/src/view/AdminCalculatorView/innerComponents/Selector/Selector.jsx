import React from 'react';
import { Row, Col, Divider, Select } from 'antd';

const Option = Select.Option;

const Selector = (props) => {
  const options = <Option value="jack">Jack</Option>
  return (
    <>
      <Row gutter={22}>
        <Col offset={1} span={22}>
          <Divider>{props.title}</Divider>
        </Col>
        <Col offset={1} span={22}>
          <Select 
          nChange={props.handleChange} 
          style={{width:'100%'}}
          disabled={props.disabled}
          >
            {options}
          </Select></Col>
      </Row>

    </>
  );
};

export default Selector;