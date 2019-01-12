import React from 'react';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const DeafultActions = (props) => {
  console.log(props);
  return (
    <>
      <ButtonGroup>
        <Button type='default' onClick={() => props.downloadHandler(props.id)} disabled={!!props.disableDownload}>
          <Icon type="cloud-download" />
        </Button>
        <Button type='default'  onClick={() => props.expandRowClicked()}>
          <Icon type={props.expand ?"up" : "down"}/>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default DeafultActions;