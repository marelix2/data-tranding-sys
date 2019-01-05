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


  componentDidUpdate(prevProps) {
    if (!equal(this.props.rows, prevProps.rows)) {
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
    return this.props.rows.map((row, index) => (
      this.shouldShowRow(index) ?
        <TsRow key={index} cols={this.props.header} class={classes.RowColor} data={row}></TsRow>
        : null

    ))
  }

  render() {
    const header = <Header headerCloumns={this.props.header} />;
    const pagination = (<Col className={classes.Pagination}>
      <Pagination
        defaultCurrent={this.state.currentPage}
        total={this.state.rowsData.length}
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