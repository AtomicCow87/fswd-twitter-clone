import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './home.scss';
import Layout from './layout';
import Login from './login';
import User from './user';

const Home = props => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/user/:username" component={User} />
        </Switch>
      </Layout>
    </Router>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
