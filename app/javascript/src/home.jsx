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
    username: '',
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          username: data.username,
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
    const { tweets, loading, authenticated, username } = this.state;

    return (
      <Layout>
        <div className="row">
          <div className="col">
            {authenticated &&
            <div className="d-grid col-6 mx-auto">
               <a href={`/users/${username}`} className="btn btn-primary rounded-pill mb-3">Profile</a>              
            </div>}
            {!authenticated && 
            <div className="d-grid col-6 mx-auto">
              <h1 className="mt-3 mb-5 text-center">Welcome to Twitter!</h1>
              <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
            </div>}
            <div className="d-grid col-6 mx-auto">
              {authenticated && <a href={`${window.location.pathname}`} className="btn btn-primary rounded-pill mb-3" onClick={this.logoutUser}>Log out</a>}
              {!authenticated && <a href={`/login?redirect_url=${window.location.pathname}`} className="btn btn-primary rounded-pill mb-3">Log in or Sign up</a>}
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
                <div className="tweet border-bottom border-1 pb-3 mb-3" key={tweet.id}>
                  <div className="author mb-2">
                    <a href={`/users/${tweet.username}`}>@{tweet.username}</a>
                  </div>
                  <div className="message mb-2">
                    <div>{tweet.message}</div>
                  </div>
                  {tweet.username === username &&
                  <div className="delete mb-2 d-flex justify-content-end">
                    <button className="btn btn-danger btn-sm rounded-pill" onClick={this.deleteTweet}>Delete</button>
                  </div>}
                </div>
              ))}
            </div>
          </div>
          <div className="col mx-5">
            <div className="mb-3">
              <h3>What's Happening</h3>
              <ul>
                <li>
                  <a href="#">#React</a>
                </li>
                <li>
                <a href="#">#RubyOnRails</a>
                </li>
                <li>
                <a href="#">#JavaScript</a>
                </li>
                <li>
                <a href="#">#FullStack</a>
                </li>
                <li>
                <a href="#">#WebDevelopment</a>
                </li>
                <li>
                <a href="#">#Coding</a>
                </li>
                <li>
                <a href="#">#MyFingersHurt</a>
                </li>
              </ul>
              <h3>Who to follow</h3>
              <ul>
                <li>
                  <a href="#">@ByYourLogic</a>
                </li>
                <li>
                  <a href="#">@dril</a>
                </li>
              </ul>
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
