import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const FINISHED_LOGIN = 'FINISHED_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';

function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    username
  };
}

function finishedLogin(json) {
  if(json.error)
    return {
      type: ERROR_LOGIN,
      error: json.error
    };

  return {
    type: FINISHED_LOGIN,
    token: json.token
  };
}

function doLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username));
    return fetch('/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => dispatch(finishedLogin(json)));
  };
}

export function doLoginIfNeeded(username, password) {
  return (dispatch, getState) => {
    if(! getState().login.isFetching)
      return dispatch(doLogin(username, password));
  };
}
