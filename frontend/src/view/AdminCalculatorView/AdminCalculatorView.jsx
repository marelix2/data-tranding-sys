import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import CalculatorForm from './innerComponents/ClculatorForm/CalculatorForm';
import axios from '../../axiosAPI';
import Api from './../../endpoints';
import { Col, Row, Select, Divider, notification  } from 'antd';
import {filter} from 'lodash';

const Option = Select.Option;

class AdminCalculatorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyTags: [],
      emailTags: [],
      categories: [],
      chosenTags: [],
      dataValue: null,
      rowId: null
    }
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchTags('emails');
    this.fetchTags('companies');
  }

  fetchCategories = () => {
    axios.put(Api.GET_CATEGORIES).then((response) => {

      const categories = response.data.categories.map((category) => {
        const { name } = category;
        return (<Option value={name} key={name}>{name}</Option>)
      });

      this.setState({ categories: categories });
    })
  }



  fetchTags = (category) => {
    axios.put(Api.GET_TAGS, { category: category }).then((response) => {
      const tags = response.data.tags.map((tag) => {
        const { title } = tag;
        return (<Option value={title} key={title}>{title}</Option>)
      });
      switch (category) {
        case 'emails':
          this.setState({ emailTags: { display: tags, values: response.data.tags }});
          break;
        case 'companies':
          this.setState({ companyTags: { display: tags, values: response.data.tags } });
          break;
        default:
          break;
      }
    })
  }

  onCategoryChooseHandler = (value) => {
    if (value === undefined) {
      this.setState({ chosenTags: [] });
    }else {
      const tags = value === 'Emails' ? [...this.state.emailTags.display] : [...this.state.companyTags.display];
      this.setState({ chosenTags: tags });
    }

  }

  onTagChooseHandler = (value) => {

    let row = filter(this.state.emailTags.values, (tag) => tag.title === value);

    if(row.length === 0) {
      row = filter(this.state.companyTags.values, (tag) => tag.title === value);
    }
   
    this.setState({ dataValue: row[0].TagValue.value, rowId: row[0].TagValue.id });
    
  }

  onValueChange = (value) => {
    this.setState({ dataValue: value });
  }

  onSaveValueHandler = () => {
    if(this.state.dataValue){
    axios.put(Api.UPDATE_TAG_VALUE, {tagValueId: this.state.rowId, dataValue: this.state.dataValue}).then((response) => {
      notification.open({
        message: 'Zmodyfikowano Wiersz!',
        description: `Wartść tagu ustawiona na: ${this.state.dataValue} PLN `
      });
    })
    }
  
  }

  render() {
    return (
      <>
        <TsTitle title='Edycja wartości danych'
          image={{ name: 'adminCalculator', type: 'png' }} />
        <Row gutter={22}>
          <Col offset={1} span={22}>
            <CalculatorForm
              categories={this.state.categories}
              tags={this.state.chosenTags}
              handleChange={{
                category: this.onCategoryChooseHandler,
                tag: this.onTagChooseHandler
              }}
              onValueChange={this.onValueChange}
              dataValue={this.state.dataValue}
              cardButtonClicked={this.onSaveValueHandler}
          />
          </Col>
          <Col offset={1} span={22}>
           <Divider></Divider>
          </Col>
        </Row>


      </>
    );
  }
}

export default AdminCalculatorView;