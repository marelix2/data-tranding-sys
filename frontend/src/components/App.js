import React, { Component } from 'react';
import './../App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DatePicker/>
      </div>
    );
  }
}

export default App;
