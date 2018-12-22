import React, {Component} from 'react';
import { Row, Col } from 'antd';
import classes from './TsRow.module.css';
import DeafultActions from '../DeafultActions';
import ExpandRow from '../ExpandRow/ExpandRow';

class TsRow extends Component {
  constructor(props){
    super(props);

    this.state = {
      expandRow: false
    }
  }

  rowExpandHandler = () => {
    this.setState((previousState) => {
      return( { expandRow: !previousState.expandRow});
    })
  }

  render() {
    const row = this.props.data.map((row) => {
      if (row.isHidden) return null;
      return (
        <Col key={row.value} span={row.width} >
          {row.value}
        </Col>
      )
    })

    let actions = null;
    if (this.props.children) {
      actions = (<Col span={4} className={classes.ActionRow}>
        {this.props.children}
      </Col>)
    } else {
      actions = (<Col span={4} className={classes.ActionRow}>
        <DeafultActions expandRowClicked={this.rowExpandHandler}/>
      </Col>)
    }

    let expandRow = null;
    
    if(this.state.expandRow) {
      expandRow = (
        <ExpandRow />
      )
    }
  
    return (
      <>
        <Row className={classes.RowWrapper}>
          {row}
          {actions}
        </Row>
        {expandRow}
      </>
    );
  }
}

export default TsRow;