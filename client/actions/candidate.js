// XXX: integrar con backend
//import fetch from 'isomorphic-fetch';

export const REQUEST_GET_CANDIDATES = 'REQUEST_GET_CANDIDATES';
export const FINISHED_GET_CANDIDATES = 'FINISHED_GET_CANDIDATES';
export const ERROR_GET_CANDIDATES = 'ERROR_GET_CANDIDATES';
export const INVALIDATE_GET_CANDIDATES = 'INVALIDATE_GET_CANDIDATES';
export const REMOVE_CANDIDATE = 'REMOVE_CANDIDATE';

function fetch(path, conf) {
  return new Promise((rs, rj) => {
    setTimeout(() => rs({
      json: () => [
        { id: 1, name: 'Pepita', owner: 1, birthdate: '2000/1/1', breed: 'Boxer' },
        { id: 2, name: 'Mascotita', owner: 1, birthdate: '2000/1/1', breed: 'Boxer' }
      ]
    }), 200);
  });
}

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

      return fetch(`/api/${id}/candidate?token=${state.login.token}`)
        .then(response => response.json())
        .then(json => dispatch(finishedGetCandidates(id, json)))
        .catch(error => errorGetCandidates(error));
    }
  };
}

export function invalidateGetCandidates() {
  return {
    type: INVALIDATE_GET_CANDIDATES
  }
}
