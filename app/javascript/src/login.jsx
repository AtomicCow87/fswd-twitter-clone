import React, { useState } from 'react';
import { checkStatus, json } from './utils';

const Login = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = event => {
    event.preventDefault();

    fetch('/api/')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      if (data.Response === 'True') {
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
        props.history.push('/tweets');
      }
    })  
    .catch((error) => {
      console.log(error.message);
    });
  }

  const signupSubmit = event => {
    event.preventDefault();

    fetch('/api/')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      if (data.Response === 'True') {
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
        props.history.push('/tweets');
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
          <h1>Welcome to Twitter</h1>
          <p>Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
        </div>
        <div className="col">
          <h2>Log in</h2>
          <form onSubmit={loginSubmit} className="log-in-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary log-in-button">Login</button>
          </form>
          <h2>Sign up</h2>
          <form onSubmit={signupSubmit} className="sign-up-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control" />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-warning sign-up-button">Sign Up</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}


export default Login;