import React from 'react'
import ReactDOM from 'react-dom'
import { handleErrors } from './utils/fetchHelper';

import './home.scss';
import Layout from './layout';

class Home extends React.Component {
  state = {
    tweets: [],
    loading: true,
    authenticated: false,
  }

  componentDidMount() {
    fetch('/api/tweets')
      .then(handleErrors)
      .then(data => {
        this.setState({
          tweets: data.tweets,
          loading: false,
        })
      })

    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render() {
    const { tweets, loading } = this.state;

    if (loading) {
      return (
        <Layout>
          <h4>Loading...</h4>
        </Layout>
      )
    }

    return (
      <Layout>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <h1>left side</h1>
            </div>
          </div>
          <div className="home col">
            <div className="tweets">
              <p>middle</p>
              {tweets.map(tweet => (
                <div className="tweet" key={tweet.id}>
                  <div className="author">
                    <span>{tweet.user.username}</span>
                  </div>
                  <div className="body">
                    <div>{tweet.body}</div>
                    <div className="date">
                      {new Date(tweet.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <h1>right side</h1>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
