import React from 'react';
import { Row, Col} from 'antd';
import Search from './innerComponents/Search';

const TsTable = (props) => {
  const header = 'header';
  const columns = 'columns'
  return (
    <div>
      <Row>
        <Search/>
        {header}
        {columns}
      </Row>
    </div>
  );
};

export default TsTable;