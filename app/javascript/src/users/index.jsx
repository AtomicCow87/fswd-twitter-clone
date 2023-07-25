import React from 'react';
import ReactDOM from 'react-dom';
import Users from './users';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Users />,
    document.body.appendChild(document.createElement('div')),
  )
})