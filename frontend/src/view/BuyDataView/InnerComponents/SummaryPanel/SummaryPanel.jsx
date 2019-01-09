import React from 'react';
import { Collapse } from 'antd';
import classes from './SummaryPanel.module.css';

const Panel = Collapse.Panel;

const SummaryPanel = (props) => {
  const panels = props.sumUp.map((panel,index) => (
    <Panel 
      header={props.sumUp[index].title} 
      key={index}>
      <div className={classes.Panel}>
        <span>{panel.title} </span>
        <span>{panel.value} {panel.suffix}</span>
      </div>
    </Panel>
  ))
  return (
    <>
      <Collapse defaultActiveKey={['0', '1']}>
        {panels}
      </Collapse>
    </>
  );
};

export default SummaryPanel;