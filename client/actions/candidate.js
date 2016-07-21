import fetch from 'isomorphic-fetch';

import { getPetsIfNeeded } from './pet';

export const REQUEST_GET_CANDIDATES = 'REQUEST_GET_CANDIDATES';
export const FINISHED_GET_CANDIDATES = 'FINISHED_GET_CANDIDATES';
export const ERROR_GET_CANDIDATES = 'ERROR_GET_CANDIDATES';
export const INVALIDATE_GET_CANDIDATES = 'INVALIDATE_GET_CANDIDATES';
export const REMOVE_CANDIDATE = 'REMOVE_CANDIDATE';

function requestGetCandidates(id) {
  return {
    type: REQUEST_GET_CANDIDATES,
    id
  };
}

function finishedGetCandidates(id, json) {
  return {
    type: FINISHED_GET_CANDIDATES,
    pet: id,
    candidates: json
  };
}

function errorGetCandidates(error) {
  return {
    type: ERROR_GET_CANDIDATES,
    error
  };
}

export function removeCandidate(idPet, idCandidate) {
  return {
    type: REMOVE_CANDIDATE,
    idPet,
    idCandidate
  };
}

function shouldGetCandidates(state, idPet) {
  if(idPet == state.candidate.pet){
    if(state.candidate.candidates.length || state.candidate.isLoading)
      return false;
  }

  return true;
}

/** Obtiene candidatos si es necesario
 * @params id: Id de la mascota
 */
export function getCandidatesIfNeeded(id) {
  return (dispatch, getState) => {
    const state = getState();
    if(shouldGetCandidates(state, id)){
      dispatch(requestGetCandidates(id));

      return fetch(`/api/pet/${id}/candidate?token=${state.login.token}`)
        .then(response => response.json())
        .then(json => dispatch(finishedGetCandidates(id, json)))
        .catch(error => errorGetCandidates(error));
    }
  };
}

export function getPetsAndDefaultCandidate() {
  return (dispatch, getState) => {
    return (getPetsIfNeeded()(dispatch, getState) || Promise.resolve())
      .then(() => {
        const state = getState();
        if(state.pet.pets.length)
          return getCandidatesIfNeeded(state.pet.pets[0].id)(dispatch, getState)
      });
  };
}

export function invalidateGetCandidates() {
  return {
    type: INVALIDATE_GET_CANDIDATES
  }
}
