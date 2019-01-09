import React, { Component } from 'react';
import { Row, Pagination, Col } from 'antd';
import Search from './innerComponents/Search/Search';
import Header from './innerComponents/Header/Header';
import classes from './TsTable.module.css';
import TsRow from './innerComponents/TsRow/TsRow';
import { filter, reduce, upperCase } from 'lodash';
import equal from 'fast-deep-equal';

class TsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowsData: this.props.rows,
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      rows: ""
    }
  }

  componentDidUpdate(prevProps,prevState, snapshot) {
    if (!equal(this.props.rows, prevProps.rows) || !equal(this.state.currentPage, prevState.currentPage) || !equal(this.state.pageSize, prevState.pageSize)){
      this.setState({ rows: this.renderRows()})
    }
  }

  componentDidMount() {
    this.setState({ rows: this.renderRows() })
  }

  searchDataHandler = (e) => {
    this.setState({
      rowsData: [...filter(this.props.rows, (row) => {
        let str = reduce(row, (result, r) => {
          return result + upperCase(r[Object.keys(r)[0]])
        }, "")
        return str.includes(upperCase(e.target.value))
      })]
    }
    )
  }

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pageSize: pageSize,
      currentPage: current
    });
  }
  onPageChange = (page, pageSize) => {
    this.setState({
      currentPage: page
    });
  }

  shouldShowRow = (index) => {
    return (this.state.currentPage - 1) * this.state.pageSize <= index && index < this.state.currentPage * this.state.pageSize;
  }


  renderRows = () => {
    if(this.props.rows.length > 0){ 
    return this.props.rows.map((row, index) => (
      this.shouldShowRow(index) ?
        <TsRow key={index}
         cols={this.props.header} 
         class={classes.RowColor}
          rowExpandHandler={this.rowExpandHandler}
           data={row}
            disableDownload={this.props.disableDownload}
            showActions={true}
            >{this.props.actions}</TsRow>
        : null))
    }else {
      return <TsRow data={[{value: 'Brak Danych', width: 20}]}></TsRow>
    }
  }

  render() {
    const header = <Header headerCloumns={this.props.header} />;
    const pagination = (<Col className={classes.Pagination}>
      <Pagination
        defaultCurrent={this.state.currentPage}
        total={this.props.rows.length }
        onShowSizeChange={this.onShowSizeChange}
        onChange={this.onPageChange}
        showSizeChanger
      />
    </Col>)

    return (
      <div>
        <Row >
          <Search placeholder='szukaj'
            data={this.props.rows}
            changed={this.searchDataHandler} />
          <Row className={classes.TableWrapper}>
            {header}
            {this.state.rows}
          </Row>
          {pagination}
        </Row>
      </div>
    );
  }
}

export default TsTable;