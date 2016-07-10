import fetch from 'isomorphic-fetch';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const FINISHED_REGISTER = 'FINISHED_REGISTER';
export const ERROR_REGISTER = 'ERROR_REGISTER';

function requestRegister(username) {
  return {
    type: REQUEST_REGISTER,
    username
  };
}

function finishedRegister(json) {
  if(json.error)
    return {
      type: ERROR_REGISTER,
      error: json.error
    };

  return {
    type: FINISHED_REGISTER
  };
}

function doRegister(username, password) {
  return dispatch => {
    dispatch(requestRegister(username));
    return fetch('/api/user', {
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
      .then(json => dispatch(finishedRegister(json)));
  };
}

export function doRegisterIfNeeded(username, password) {
  return (dispatch, getState) => {
    if(! getState().user.isFetching)
      return dispatch(doRegister(username, password));
  };
}
