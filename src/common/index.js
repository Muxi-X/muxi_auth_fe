import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Index from '../pages/Index/index';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

export default class Portal extends Component {
    render() {
        return (
        <Router>
            <Switch>
            <Redirect exact from="/" to="/index" />
              <Route path="/Register" component={Register}/>
              <Route path="/index" component={Index}/>
              <Route path="/login" component={Login}/>
            </Switch>
        </Router>
        )
    }
}
