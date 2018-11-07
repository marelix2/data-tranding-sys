import React, { Component } from 'react';
import './../App.css';
import 'antd/dist/antd.css';
import Dashboard from './../view/DasboardView/DasboardView';
import { BrowserRouter as Router, Route, Link ,Redirect} from 'react-router-dom';
import { IsUserLoggedIn } from './../utils';
import "./../styles/global.css";
import LoginView from '../view/LoginView/LoginView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <Route exact path="/" render={() => (
            IsUserLoggedIn() ? (
              <Dashboard />
            ) : (
              <Redirect to={{pathname: "/login"}}/>
              ))} />
              <Route path='/login' component={LoginView}/>
              </div>
        </Router>
      </div>
    );
  }
}

export default App;
