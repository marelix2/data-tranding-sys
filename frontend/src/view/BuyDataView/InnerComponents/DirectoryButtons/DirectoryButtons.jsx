import React from 'react';
import { Button, Icon ,Popconfirm} from 'antd';
import { Link } from 'react-router-dom';

const ButtonGroup = Button.Group;

const DirectoryButtons = (props) => {
  return (
    <div>
      <ButtonGroup>
        <Button type='primary' size={'large'} onClick={() => console.log("kiedys sie pobiore!")}>
          <Link to={'/dashboard/explore'} > <Icon type="left" />  Przejdź do zakupów </Link>
        </Button>
        <Popconfirm placement="top" title={'Czy na pewno chcesz przejść do płatności?'} onConfirm={props.confirmed} okText="Tak" cancelText="Nie">
          <Button type='primary' size={'large'} disabled={props.disabled}>
             Przejdź do Płatności <Icon type={"right"} />
          </Button>
        </Popconfirm>
      </ButtonGroup>
    </div>
  );
};

export default DirectoryButtons;