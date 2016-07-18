// XXX: integrar con backend
//import fetch from 'isomorphic-fetch';

function fetch(url, config) {
  console.log(url, config);
  return Promise.resolve();
}

export function likePet(idFrom, idTo, result) {
  return (dispatch, getState) => {
    return fetch('/api/like/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pet1: idFrom,
        pet2: idTo,
        result: result
      })
    });
  };
}
