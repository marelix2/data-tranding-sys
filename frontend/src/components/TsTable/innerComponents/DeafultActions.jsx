import React from 'react';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const DeafultActions = (props) => {
  return (
    <>
      <ButtonGroup>
        <Button type='primary' onClick={ () => console.log("kiedys sie pobiore!")} disabled={!!props.disableDownload}>
          <Icon type="cloud-download" />
        </Button>
        <Button type='primary'  onClick={() => props.expandRowClicked()}>
          <Icon type={props.expand ?"up" : "down"}/>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default DeafultActions;