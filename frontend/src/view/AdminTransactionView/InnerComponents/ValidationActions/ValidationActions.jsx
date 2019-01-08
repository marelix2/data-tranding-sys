import React from 'react';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

const ValidationActions = (props) => {
    return (
        <>
            <ButtonGroup>
                <Button type='danger' onClick={() => props.rowDeleteHandle(props.param.value, props.category)} >
                    <Icon type="delete" />
                </Button>
                <Button type='default' onClick={() => props.expandRowClicked()}>
                    <Icon type={props.expand ? "up" : "down"} />
                </Button>
            </ButtonGroup>
        </>
    );
};

export default ValidationActions;