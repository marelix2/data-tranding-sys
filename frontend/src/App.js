import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Dashboard from './view/DasboardView/DasboardView';
import MainPageView from './view/MainPageView/MainPageView';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { IsUserLoggedIn } from './utils';
import "./styles/global.css";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" render={() => (
              IsUserLoggedIn() ? (
                <Redirect to={{ pathname: "/dashboard" }} />
              ) : (
                  <MainPageView />
                ))} />
            <Route path='/dashboard' component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
