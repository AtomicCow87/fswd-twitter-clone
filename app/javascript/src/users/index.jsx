import React from 'react';
import ReactDOM from 'react-dom';
import Users from './users';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Users user_id={data.user_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})