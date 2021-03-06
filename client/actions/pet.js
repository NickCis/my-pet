import fetch from 'isomorphic-fetch';

export const REQUEST_GET_PETS = 'REQUEST_GET_PET';
export const FINISHED_GET_PETS = 'FINISHED_GET_PET';
export const ERROR_GET_PETS = 'ERROR_GET_PET';

export const REQUEST_DEL_PET = 'REQUEST_DEL_PET';
export const FINISHED_DEL_PET = 'FINISHED_DEL_PET';
export const ERROR_DEL_PET = 'ERROR_DEL_PET';
export const INVALIDATE_DEL_PET = 'INVALIDATE_DEL_PET';

export const CREATE_NEW_PET = 'CREATE_NEW_PETS';
export const FINISHED_NEW_PET = 'FINISHED_NEW_PET';
export const ERROR_NEW_PET = 'ERROR_NEW_PET';
export const INVALIDATE_NEW_PET = 'INVALIDATE_NEW_PET';

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

function _createNewPet(pet) {
  return {
    type: CREATE_NEW_PET,
    pet
  };
}

export function errorNewPet(error) {
  return {
    type: ERROR_NEW_PET,
    error
  };
}

function finishedNewPet(pet) {
  return {
    type: FINISHED_NEW_PET,
    pet
  };
}

export function invalidateNewPet(pet) {
  return {
    type: INVALIDATE_NEW_PET
  };
}

export function createNewPet(pet) {
  return (dispatch, getState) => {
    if(!pet.birthdate)
      return dispatch(errorNewPet({description: "Se debe completar la fecha de nacimiento"}));

    if(pet.images.length < 1)
        return dispatch(errorNewPet({description: "Se deben agregar imagenes"}));

    if(pet.breed <= 0)
        return dispatch(errorNewPet({description: "Se debe seleccionar una raza"}));

    const state = getState();
    if(state.pet.create.isLoading)
      return;

    dispatch(_createNewPet(pet));
    return fetch('/api/pet', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...pet,
        token: state.login.token
      })
    })
      .then(response => response.json())
      .then(json => {
        if(json.error)
          return Promise.reject(json.error);
        return json;
      })
      .then(json => dispatch(finishedNewPet(json)))
      .catch(err => dispatch(errorNewPet(err)));
  };
}

function requestDelPet(id) {
  return {
    type: REQUEST_DEL_PET
  };
}

function finishedDelPet(id) {
  return {
    type: FINISHED_DEL_PET,
    id
  };
}

function errorDelPet(error) {
  return {
    type: ERROR_DEL_PET,
    error
  };
}

export function invalidateDelPet() {
  return {
    type: INVALIDATE_DEL_PET
  };
}

export function delPet(id) {
  return (dispatch, getState) => {
    const state = getState();
    if(state.pet.del.isLoading)
      return;

    dispatch(requestDelPet(id));
    return fetch(`/api/pet/${id}?token=${state.login.token}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if(json.error)
          return Promise.reject(json.error);
      })
      .then(() => dispatch(finishedDelPet(id)))
      .catch(err => dispatch(errorDelPet(err)));
  }
};

