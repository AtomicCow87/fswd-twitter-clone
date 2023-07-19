/* import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkStatus, json } from './utils';
import Tweets from './tweets';

const User = props => {
  const location = useLocation();
  const username = location.pathname.split('/')[2];

  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  componentDidMount = () => {
    fetchTweets();
  }
  
  fetchTweets = () => {
    fetch('/api/tweets/')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      if (data.Response === 'True') {
        setTweets(data.tweets);
      }
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <h3>${username}'s Feed</h3>
        </div>
        <div className="col">
          {(() => {
            if (error) {
              return error;
            }
            return tweets.map((tweet) => {
              return <div key={tweet.id}>
                      <Link to='/users/:{tweet.username}/tweets'>{tweet.username}</Link>
                      <p>{tweet.tweet}</p>;
                    </div>
            });
          })()}
        </div>
        <div className="col">
          <h3>Who to follow</h3>
        </div>
      </div>
    </React.Fragment>
  )
} */