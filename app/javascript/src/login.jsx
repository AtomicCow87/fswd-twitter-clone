import React from 'react';

class Login extends React.Component {
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
        <div className="row">
          <div className="col-xs-6 welcome">
            <div id="welcome-text">
              <h1><strong>Welcome to Twitter.</strong></h1>
              <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="log-in col-xs-4 col-xs-offset-1">
            <form>
              <div className="form-group">
                <input type="text" className="form-control username" placeholder="Username" />
              </div>
              <div className="form-group col-xs-8">
                <input type="password" className="form-control password" placeholder="Password" />
              </div>
              <button id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1">Log in</button>
            </form>
          </div>
          <div className="sign-up col-xs-4 col-xs-offset-1">
            <form>
              <div className="new-to-t">
                <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
              </div>
              <div className="form-group">
                <input type="text" className="form-control username" placeholder="Username" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control email" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control password" placeholder="Password" />
              </div>
              <button id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;