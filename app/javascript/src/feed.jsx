import React from 'react';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: []
    };
  }

  render() {
  
    return (
      <React.Fragment>
        <div className="main container">
          <div className="row">
            <div className="col-xs-3 profile-trends">
              <div className="profileCard col-xs-12">
                <div className="profileCard-content">
                  <div className="user-field col-xs-12">
                    <a className="username" href="#">User</a><br/>
                    <a className="screenName" href="#">@User</a>
                  </div>
                  <div className="user-stats">
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
                  </div>
                </div>
              </div>
              <div className="trends col-xs-12">
                <div className="col-xs-12">
                  <div className="trends-header">
                    <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
                  </div>
                  <ul className="trends-list">
                    <li><a href="#">#Hongkong</a></li>
                    <li><a href="#">#Ruby</a></li>
                    <li><a href="#">#foobarbaz</a></li>
                    <li><a href="#">#rails</a></li>
                    <li><a href="#">#API</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-6 feed-box">
              <div className="col-xs-12 post-tweet-box">
                <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
                <div className="post-tweet-btns">
                  <button className="btn btn-default btn-primary pull-right">Tweet</button>
                </div>
              </div>
              <div className="feed">
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">User</a>
                  <a className="tweet-screenName" href="#">@User</a>
                  <p>This is an amazing tweet</p>
                  <a className="delete-tweet" href="#">Delete</a>
                </div>
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">User</a>
                  <a className="tweet-screenName" href="#">@User</a>
                  <p>This is an amazing tweet</p>
                </div>
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">User</a>
                  <a className="tweet-screenName" href="#">@User</a>
                  <p>This is an amazing tweet</p>
                </div>
              </div>
            </div>
            <div className="col-xs-3 follow-suggest">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Feed;