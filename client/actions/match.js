import fetch from 'isomorphic-fetch';
import { getPetsIfNeeded } from './pet';

export const REQUEST_MATCH = 'REQUEST_MATCH';
export const FINISHED_MATCH = 'FINISHED_MATCH';
export const ERROR_MATCH = 'ERROR_MATCH';

function requestMatch(id){
  return{
    type: REQUEST_MATCH,
    id
  };
}

function errorMatch(error){
  return{
    type: ERROR_MATCH,
    error: error
  };
}

function finishedMatch(matches){
  return{
    type: FINISHED_MATCH,
    matches
  };
}

export function getMatch(id){
  return (dispatch, getState) => {
    dispatch(requestMatch(id));
    return fetch(`/api/pet/${id}/match`)
      .then(response => response.json())
      .then(json => finishedMatch(json))
      .catch(error => errorMatch(error))
      .then(action => dispatch(action));
  }
}

export function getPetsAndDefaultMatch(){
  return (dispatch,getState) => {
    return (getPetsIfNeeded()(dispatch, getState) || Promise.resolve())
      .then(() => {
        const state = getState();
        if(state.pet.pets.length)
          return getMatch(state.pet.pets[0].id)(dispatch, getState);
      })
  }
}
