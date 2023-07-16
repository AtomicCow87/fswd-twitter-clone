import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './home.scss';
import Layout from './layout';
import Login from './login';
import Tweets from './tweets';

const Home = props => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/tweets" component={Tweets} />
      </Switch>
    </Layout>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
