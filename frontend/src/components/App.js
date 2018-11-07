import React, { Component } from 'react';
import './../App.css';
import 'antd/dist/antd.css';
import Dashboard from './../view/DasboardView/DasboardView';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { IsUserLoggedIn } from './../utils';
import "./../styles/global.css";
import LoginView from '../view/LoginView/LoginView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" render={() => (
            IsUserLoggedIn() ? (
              <Dashboard />
            ) : (
                <LoginView />
              ))} />
        </Router>
      </div>
    );
  }
}

export default App;
