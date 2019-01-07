import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

const ButtonGroup = Button.Group;

const DirectoryButtons = (props) => {
  return (
    <div>
      <ButtonGroup>
        <Button type='primary' size={'large'} onClick={() => console.log("kiedys sie pobiore!")}>
          <Link to={'/dashboard/explore'} > <Icon type="left" />  Przejdź do zakupów </Link>
        </Button>
        <Button type='primary' size={'large'} onClick={() => console.log("kiedys sie pobiore!")}>
          <Link to={'/dashboard/pay'} > Przejdź do Płatności <Icon type={"right"} /> </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DirectoryButtons;