import React, { useState } from 'react';
import { createUser, signInUser, authenticateUser } from './utils';


const Login = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (e) => {
  e.preventDefault();
  setUsername(e.target.querySelector('.username').value);
  setPassword(e.target.querySelector('.password').value);
  signInUser(username, password)
    .then(data => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        authenticateUser()
          .then(data => {
            if (data.username) {
              props.history.push(`/user/${data.username}`);
            }
          })
      }
    })
  }

  const signUpSubmit = (e) => {
    e.preventDefault();
    setUsername(e.target.querySelector('.username').value);
    setEmail(e.target.querySelector('.email').value);
    setPassword(e.target.querySelector('.password').value);
    createUser(username, email, password)
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          authenticateUser()
            .then(data => {
              if (data.username) {
                props.history.push(`/user/${data.username}`);
              }
            })
        }
      })
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
          <form onSubmit={signUpSubmit} className="sign-up-form">
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