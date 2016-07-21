import fetch from 'isomorphic-fetch';

export const REQUEST_BREEDS = 'REQUEST_BREEDS';
export const FINISHED_BREEDS = 'FINISHED_BREEDS';
export const ERROR_BREEDS = 'ERROR_BREEDS';

function requestBreeds() {
  return {
    type: REQUEST_BREEDS
  };
}

function finishedBreeds(breeds) {
  return {
    type: FINISHED_BREEDS,
    breeds
  };
}

function errorBreeds(error) {
  return {
    type: ERROR_BREEDS,
    error
  };
}

export function getBreedsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if(!state.pet_info.breed.breeds.length){
      dispatch(requestBreeds());
      return fetch('/api/pet_info/breeds')
        .then(response => response.json())
        .then(json => dispatch(finishedBreeds(json)))
        .catch(error => dispatch(errorBreeds(error)));
    }
  };
}


