import React from 'react';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const DeafultActions = (props) => {
  return (
    <>
      <ButtonGroup>
        <Button type='primary'>
          <Icon type="cloud-download" />
        </Button>
        <Button type='primary'  onClick={() => props.expandRowClicked()}>
          <Icon type="down"/>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default DeafultActions;