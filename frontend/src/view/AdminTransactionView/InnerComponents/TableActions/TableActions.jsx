import React from 'react';
import { Button, Icon } from 'antd';
import { Link} from 'react-router-dom';
const ButtonGroup = Button.Group;

const TableActions = (props) => {
    return (
       
            <>
                <ButtonGroup>
                    <Button type='primary' onClick={() => console.log("kiedys sie pobiore! ..")} disabled={!!props.disableDownload}>
                        <Icon type="cloud-download" />
                    </Button>
                    <Button type='primary' onClick={() => props.expandRowClicked()}>
                        <Icon type={props.expand ? "up" : "down"} />
                    </Button>
                    <Button type='primary'>
                    <Link to={props.path} params={{ name: props.params }}> <Icon type="right" /> </Link>
                    </Button>
                </ButtonGroup>
            </>
       
    );
};

export default TableActions;