import fetch from 'isomorphic-fetch';

export const CHANGE_PROFILE_TAB = 'CHANGE_PROFILE_TAB';
export const REQUEST_UPDATE_PROFILE = 'REQUEST_UPDATE_PROFILE';
export const FINISHED_UPDATE_PROFILE = 'FINISHED_UPDATED_PROFILE';
export const ERROR_UPDATE_PROFILE = 'ERROR_UPDATED_PROFILE';

export function changeProfileTab(tab) {
  return {
    type: CHANGE_PROFILE_TAB,
    tab
  };
}

function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    username
  };
}

function checkUpdateProfile(json) {
  if(json.error)
    return Promise.reject(json.error);
  return json;
}

function finishedUpdateProfile(json) {
  return {
    type: FINISHED_UPDATE_PROFILE
  };
}

function errorUpdateProfile(error) {
  return {
    type: ERROR_UPDATE_PROFILE,
    error
  };
}

export function updateProfile(data) {
  return (dispatch, getState) => {
    const state = getState();

    return fetch('/api/user', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        token: state.login.token
      })
    })
      .then(response => response.json())
      .then(checkUpdateProfile)
      .then(json => dispatch(finishedUpdateProfile(json)))
      .catch(error => dispatch(errorUpdateProfile(error)));
  };
}
