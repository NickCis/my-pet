import fetch from 'isomorphic-fetch';

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
