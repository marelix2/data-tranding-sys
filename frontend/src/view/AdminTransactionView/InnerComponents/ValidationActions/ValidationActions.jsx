import React from 'react';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

const ValidationActions = (props) => {
    console.log(props);
    return (
        <>
            <ButtonGroup>
                <Button type='primary' onClick={() => props.rowDeleteHandle(props.param.value)} >
                    <Icon type="cloud-download" />
                </Button>
                <Button type='primary' onClick={() => props.expandRowClicked()}>
                    <Icon type={props.expand ? "up" : "down"} />
                </Button>
            </ButtonGroup>
        </>
    );
};

export default ValidationActions;