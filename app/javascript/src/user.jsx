import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkStatus, json } from './utils';
import Tweets from './tweets';

const User = props => {
  const location = useLocation();
  const username = location.pathname.split('/')[2];

  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  

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
              return <Tweets key={tweet.id} tweet={tweet} />;
            });
          })()}
        </div>
        <div className="col">
          <h3>Who to follow</h3>
        </div>
      </div>
    </React.Fragment>
  )
}