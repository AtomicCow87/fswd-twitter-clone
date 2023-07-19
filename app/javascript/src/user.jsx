import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from './layout';
import { getTweets, getOneTweet, getUserTweets, deleteTweet, searchTweets, logoutUser, authenticateUser } from './utils';

const User = props => {
  const location = useLocation();
  const [username, setUsername] = useState(location.pathname.split('/')[2]);
  const [tweets, setTweets] = useState([]);
  const [search, setSearch] = useState('');

  const getAllTweets = () => {
    getTweets(username)
      .then(data => {
        setTweets(data);
      })
  }

  const deleteOneTweet = (id) => {
    authenticateUser()
    deleteTweet(id)
      .then(data => {
        getTweets();
      })
  }

  const searchTweets = (e) => {
    e.preventDefault();
    searchTweets(search)
      .then(data => {
        setTweets(data);
      })
  }

  const logout = () => {
    logoutUser()
      .then(data => {
        localStorage.removeItem('jwt');
        props.history.push('/');
      })
  }

  const getOneTweet = (id) => {
    getOneTweet(id)
      .then(data => {
        setTweets([data]);
      })
  }

  const getUserTweets = (username) => {
    getUserTweets(username)
      .then(data => {
        setTweets(data);
      })
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getAllTweets();
  }, [])

  return (
    <div className="main container mt-5">
      <div className="row">          
        <div className="user-field col">
          <a className="username" href="#">@{username}</a><br/>
          <div className="col-xs-3">
            <a href="">
              <span>Tweets<br/></span>
              <span className="user-stats-tweets">10</span>
            </a>
          </div>
          <div className="col-xs-4">
            <a href="">
              <span>Following<br/></span>
              <span className="user-stats-following">0</span>
            </a>
          </div>
          <div className="col-xs-4">
            <a href="">
              <span>Followers<br/></span>
              <span className="user-stats-followers">0</span>
            </a>
          </div>
          <div className="col-xs-12">
            <button className="btn btn-primary" onClick={logout}>Logout</button>
          </div>
        </div>
        <div className="col feed-box">
          <div className="col-xs-12 post-tweet-box">
            <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
            <div className="pull-right">
              <button className="btn btn-primary" disabled id="post-tweet-btn">Tweet</button>
            </div>
          </div>
          <div className="feed">
            {tweets.map(tweet => {
              return (
                <div className="tweet" key={tweet.id}>
                  <p>{tweet.tweet}</p>
                  <div className="tweet-footer">
                    <small><a href="#">{tweet.username}</a></small>
                    <small><a href="#">{tweet.created_at}</a></small>
                    <small><a href="#" onClick={deleteOneTweet}>Delete</a></small>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
        <div className="trends col">
          <div className="col-xs-12">
            <form onSubmit={searchTweets}>
              <input type="text" className="form-control" placeholder="Search Twitter" onChange={handleChange} />
            </form>
            <div className="trends-header">
              <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
            </div>
            <ul className="trends-list">
              <li><a href="#">#React</a></li>
              <li><a href="#">#Ruby</a></li>
              <li><a href="#">#foobarbaz</a></li>
              <li><a href="#">#rails</a></li>
              <li><a href="#">#API</a></li>
            </ul>
          </div>
        </div>          
        <div className="col follow-suggest">
        </div>
      </div>
    </div>
  )
}

export default User;