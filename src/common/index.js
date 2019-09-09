import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import reset from '../pages/reset/index';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

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
