const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

const json = (response) => response.json()

export const createUser = (username, email, password) => {
  const body = JSON.stringify({
    user: {
      username,
      email,
      password,
    },
  });
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(checkStatus)
    .then(json);
}

export const signInUser = (username, password) => {
  const body = JSON.stringify({
    user: {
      username,
      password,
    },
  });
  return fetch('/api/user_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(checkStatus)
    .then(json);
}

export const logoutUser = () => {
  return fetch('/api/sessions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

export const authenticateUser = () => {
  return fetch('/api/authenticate', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

//-------------- Tweets -----------------//

export const createTweet = (tweet) => {
  const body = JSON.stringify({
    tweet: {
      tweet,
    },
  });
  return fetch('/api/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(checkStatus)
    .then(json);
}

export const getTweets = () => {
  return fetch('/api/tweets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

export const getOneTweet = (id) => {
  return fetch(`/api/tweets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

export const getUserTweets = (username) => {
  return fetch(`/api/tweets/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

export const deleteTweet = (id) => {
  return fetch(`/api/tweets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}

export const searchTweets = (keyword) => {
  return fetch(`/api/tweets/search/${keyword}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(json);
}