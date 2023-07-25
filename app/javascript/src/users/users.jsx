// property.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './users.scss';

class Users extends React.Component {
  state = {
    tweets: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`/users/${user_id}/tweets`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          tweets: data.tweets,
          loading: false,
        })
      })
  }

  render () {
    const { tweets, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    return (
      <Layout>
        <div className="row">
          <div className="col">
            <div className="d-grid col-6 mx-auto">
              {authenticated && <a href="/" className="btn btn-primary" onClick={logoutUser}>Log out</a>}
              {!authenticated && <a href="/login" className="btn btn-primary rounded-pill mb-3">Log in or Sign up</a>}
            </div>
          </div>
          <div className="home col mx-5">
            {loading && <div className="spinner-border text-primary" role="status">loading...</div>}
            {(loading === false && authenticated === false) && 
              <div className="alert alert-info" role="alert">Please log in to post a tweet</div>
            }
            <div className="tweets">
              <p>middle</p>
              {tweets.map(tweet => (
                <div className="tweet" key={tweet.id}>
                  <div className="author">
                    <a href={`/users/${tweet.user.username}`}>{tweet.user.username}</a>
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

export default Users;