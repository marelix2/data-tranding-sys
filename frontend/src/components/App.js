import React, { Component } from 'react';
import './../App.css';
import 'antd/dist/antd.css';
import Layout from "./Layout/Layout";
import "./../styles/global.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
