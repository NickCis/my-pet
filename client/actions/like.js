import fetch from 'isomorphic-fetch';
import { removeMatch } from './match';

export const REQUEST_DEL_LIKE = 'REQUEST_DEL_LIKE';
export const FINISHED_DEL_LIKE = 'FINISHED_DEL_LIKE';
export const ERROR_DEL_LIKE = 'ERROR_DEL_LIKE';
export const INVALIDATE_DEL_LIKE = 'INVALIDATE_DEL_LIKE';

export function likePet(idFrom, idTo, result) {
  return (dispatch, getState) => {
    const state = getState();
    return fetch('/api/like', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: state.login.token,
        pet1: idFrom,
        pet2: idTo,
        result: result
      })
    });
  };
}

function requestDelLike(from, to) {
  return {
    type: REQUEST_DEL_LIKE,
    from,
    to
  };
}

function finishedDelLike() {
  return {
    type: FINISHED_DEL_LIKE,
  };
}

function errorDelLike(error) {
  return {
    type: ERROR_DEL_LIKE,
    error
  }
}

export function invalidateDelLike() {
  return {
    type: INVALIDATE_DEL_LIKE
  }
}

export function delLike(from, to) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(requestDelLike(from, to));
    return fetch(`/api/like?from=${from}&to=${to}&token=${state.login.token}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if(json.success)
          return json;
        return Promise.reject(json.error);
      })
      .then(() => dispatch(removeMatch(to)))
      .then(() => finishedDelLike())
      .catch(err => errorDelLike(err))
      .then(action => dispatch(action));
  };
}
