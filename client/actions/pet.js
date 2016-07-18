// XXX: integrar con backend
//import fetch from 'isomorphic-fetch';

export const REQUEST_GET_PETS = 'REQUEST_PET';
export const FINISHED_GET_PETS = 'FINISHED_GET_PET';
export const ERROR_GET_PETS = 'ERROR_GET_PET';

// XXX: mockeamos la interacción
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

function requestGetPets() {
  return {
    type: REQUEST_GET_PETS
  };
}

function finishedGetPets(pets) {
  return {
    type: FINISHED_GET_PETS,
    pets
  };
}

function errorGetPets(error) {
  return {
    type: ERROR_GET_PETS,
    error
  };
}

export function getPetsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if(!state.pet.pets.length){
      dispatch(requestGetPets());
      return fetch(`/api/user/pets?token=${state.login.token}`)
        .then(response => response.json())
        .then(json => dispatch(finishedGetPets(json)))
        .catch(error => dispatch(errorGetPets(error)));
    }
  };
}
