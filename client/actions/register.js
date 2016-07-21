import fetch from 'isomorphic-fetch';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const FINISHED_REGISTER = 'FINISHED_REGISTER';
export const INVALIDATE_REGISTER = 'INVALIDATE_REGISTER';
export const ERROR_REGISTER = 'ERROR_REGISTER';

function requestRegister(user) {
  return {
    type: REQUEST_REGISTER,
    user
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

function doRegister(user) {
  return dispatch => {
    dispatch(requestRegister(user));
    return fetch('/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => dispatch(finishedRegister(json)));
  };
}

export function invalidateRegister() {
  return {
    type: INVALIDATE_REGISTER
  };
}

export function doRegisterIfNeeded(user) {
  return (dispatch, getState) => {
    if(! getState().user.isFetching)
      return dispatch(doRegister(user));
  };
}
