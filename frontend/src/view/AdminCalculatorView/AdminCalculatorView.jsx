import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import CalculatorForm from './innerComponents/ClculatorForm/CalculatorForm';
import axios from '../../axiosAPI';
import Api from './../../endpoints';

class AdminCalculatorView extends Component {
  constructor(props){
    super(props);

    this.state = {
      companyTags: [],
      emailTags: [],
      categoires: [],
      chosenCategory: ''
    }
  }

  componentDidMount(){
      this.fetchTags('emails');
      this.fetchTags('companies');
  }

  fetchCategories = () => {
    axios.put(Api.GET_CATEGORIES)
  }

  fetchTags = (category) => {
    axios.put(Api.GET_TAGS, {category : category}).then((response) => {
      const tags = response.data.tags;

      switch(category){

        case 'emails': 
        this.setState({emailTags: tags});
        break;
        case 'companies':
        this.setState({companyTags: tags});
        break;
        default: 
        break;
      }
    })
  }


  render() {
    return (
      <>
          <TsTitle title='Edycja wartości danych'
                    image={{ name: 'adminCalculator', type: 'png' }} />

                   <CalculatorForm />
      </>
    );
  }
}

export default AdminCalculatorView;