import React from 'react'
import ReactDOM from 'react-dom'
import { handleErrors, safeCredentials } from './utils/fetchHelper';

import './home.scss';
import Layout from './layout';

class Home extends React.Component {
  state = {
    tweets: [],
    loading: true,
    authenticated: false,
    error: '',
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

    this.getTweets();
  }

  getTweets = () => {
    fetch('/api/tweets')
      .then(handleErrors)
      .then(data => {
        this.setState({
          tweets: data.tweets,
          loading: false,
        })
      })
  } 

  logoutUser = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          this.setState({
            authenticated: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log out.',
        })
      })
  }

  postTweet = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    const body = document.querySelector('#new-tweet').value;

    fetch('/api/tweets', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        tweet: {
          message: body,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        document.querySelector('#new-tweet').value = '';
        this.getTweets();
      })
      .catch(error => {
        this.setState({
          error: 'Could not post tweet.',
        })
      })
  }

  render() {
    const { tweets, loading, authenticated } = this.state;

    return (
      <Layout>
        <div className="row">
          <div className="col">
            <div className="d-grid col-6 mx-auto">
              {authenticated && <a href="/" className="btn btn-primary rounded-pill mb-3" onClick={this.logoutUser}>Log out</a>}
              {!authenticated && <a href="/login" className="btn btn-primary rounded-pill mb-3">Log in or Sign up</a>}
            </div>
          </div>
          <div className="home col mx-5">
            {loading && <div className="spinner-border text-primary" role="status"></div>}
            {(loading === false && authenticated === false) && 
              <div className="alert alert-info" role="alert">Please log in to post a tweet</div>
            }
            {(loading === false && authenticated === true) &&
              <div className="mb-3">
                <form onSubmit={this.postTweet}>
                  <div className="form-group">
                    <textarea className="form-control" id="new-tweet" rows="2" placeholder="What's happening?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary rounded-pill mb-3">Tweet</button>
                </form>
              </div>
            }
            <div className="tweets">
              {tweets.map(tweet => (
                <div className="tweet" key={tweet.id}>
                  <div className="author">
                    <a href={`/users/${tweet.username}`}>{tweet.username}</a>
                  </div>
                  <div className="message">
                    <div>{tweet.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col mx-5">
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
