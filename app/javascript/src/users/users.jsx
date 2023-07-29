// property.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';

import './users.scss';

class Users extends React.Component {
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

    this.getUserTweets();
  }

  getUserTweets = () => {
    let pageUser = window.location.pathname.replace('/users/', '');

    fetch('/api/users/' + pageUser + '/tweets')
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

    let body = document.querySelector('#new-tweet').value;

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
        this.getUserTweets();
      })
      .catch(error => {
        this.setState({
          error: 'Could not post tweet.',
        })
      })
  }

  deleteTweet = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    let id = e.target.parentElement.parentElement.id;

    fetch('/api/tweets/' + id, safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        this.getUserTweets();
      })
      .catch(error => {
        this.setState({
          error: 'Could not delete tweet.',
        })
      }
    )
  }

  render () {
    const { tweets, loading, authenticated, username } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    let pageUser = window.location.pathname.replace('/users/', '');

    return (
      <Layout>
        <div className="row">
          <div className="col">
            <div className="d-grid col-6 mx-auto">
              <h1 className="left-side-user mt-3 mb-5">@{pageUser}</h1>
              <a href="#" className="left-side">{tweets.length} Tweets</a>
              <a href="#" className="left-side">0 Following</a>
              <a href="#" className="left-side">0 Followers</a>
              <a href="#" className="left-side">Likes</a>
            </div>
            <div className="d-grid col-6 mx-auto">
              {authenticated && <a href={`${window.location.pathname}`} className="btn btn-primary rounded-pill my-5" onClick={this.logoutUser}>Log out</a>}
              {!authenticated && <a href={`/login?redirect_url=${window.location.pathname}`} className="btn btn-primary rounded-pill my-5">Log in or Sign up</a>}
            </div>
          </div>
          <div className="home col mx-5">
            {pageUser === username && <div className="mb-3">
            {loading && <div className="spinner-border text-primary" role="status"></div>}
            {(loading === false && authenticated === true) &&
              <div className="mb-3">
                <form onSubmit={this.postTweet}>
                  <div className="form-group mt-5 mb-2">
                    <textarea className="form-control" id="new-tweet" rows="1" placeholder={`Got something to say @${username}?`}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary rounded-pill mb-3">Tweet</button>
                </form>
              </div>
            }
            </div>}
            <div className="tweets mt-5">
              {tweets.map(tweet => (
                <div className="tweet pb-3 mb-3" key={tweet.id} id={tweet.id}>
                  <div className="author mb-2">
                    <a href={`/users/${tweet.username}`} className="user">@{tweet.username}</a>
                  </div>
                  <div className="message mb-2">
                    <div>{tweet.message}</div>
                  </div>
                  {pageUser === username &&
                  <div className="delete mb-2 d-flex justify-content-end">
                    <button className="btn btn-danger btn-sm rounded-pill" onClick={this.deleteTweet}>Delete</button>
                  </div>}
                </div>
              ))}
            </div>
          </div>
          <div className="col m-5">
            <div className="mb-3 trend-box">
              <h3 className="right-side-hashes">What's Happening</h3>
              <ul>
                <li>
                  <a href="#" className="right-side">#React</a>
                </li>
                <li>
                  <a href="#" className="right-side">#RubyOnRails</a>
                </li>
                <li>
                  <a href="#" className="right-side">#JavaScript</a>
                </li>
                <li>
                  <a href="#" className="right-side">#FullStack</a>
                </li>
                <li>
                  <a href="#" className="right-side">#WebDevelopment</a>
                </li>
                <li>
                  <a href="#" className="right-side">#Coding</a>
                </li>
                <li>
                  <a href="#" className="right-side">#MyFingersHurt</a>
                </li>
              </ul>
            </div>
            <div className="mb-3 follow-box">
              <h3 className="right-side-follow">Who to follow</h3>
              <ul>
                <li>
                  <a href="#" className="right-side">@ByYourLogic</a>
                </li>
                <li>
                  <a href="#" className="right-side">@dril</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Users;