import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import reset from './pages/reset/index';
import Login from './pages/login/login';
import Register from './pages/register/register';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';

export default class Portal extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/Register" component={Register} />
          <Route path="/find_pass" component={reset} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(<Portal />, document.getElementById('root'));
serviceWorker.unregister();
