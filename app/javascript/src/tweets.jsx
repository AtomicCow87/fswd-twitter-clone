import React from 'react';
import { checkStatus, json } from './utils';
import { Link, useLocation } from 'react-router-dom';

const Tweets = props => {

  getTweets = () => {
    fetch('/api/')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      if (data.Response === 'True') {
        //unknown
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <Link to="/user/:${username}">{username}</Link>
          <p>{Tweet}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Tweets;