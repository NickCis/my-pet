import fetch from 'isomorphic-fetch';

import { changePageIfNeeded } from './';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const FINISHED_LOGIN = 'FINISHED_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN';
export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT,
    persistLogin: true
  };
}

function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    persistLogin: true,
    username
  };
}

function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    persistLogin: true,
    error: error
  };
}

function finishedLogin(token) {
  return {
    type: FINISHED_LOGIN,
    persistLogin: true,
    token: token
  };
}

export function invalidateLogin() {
  return {
    type: INVALIDATE_LOGIN,
    persistLogin: true
  };
}

function checkLogin(json) {
  if(json.token)
    return json.token;
  return Promise.reject(json.error);
}

function doLogin(username, password) {
  return (dispatch, getState) => {
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
      .then(checkLogin)
      .then(token => dispatch(finishedLogin(token)))
      .then(() => {
        let prevPage = getState().page.previous;
        if(['Register', 'Login'].indexOf(prevPage) != -1)
          prevPage = 'Home';
        return dispatch(changePageIfNeeded(prevPage));
      })
      .catch(error => dispatch(errorLogin(error)))
  };
}

export function doLoginIfNeeded(username, password) {
  return (dispatch, getState) => {
    if(! getState().login.isFetching)
      return dispatch(doLogin(username, password));
  };
}
