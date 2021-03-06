import {
  REQUEST_GET_PETS,
  FINISHED_GET_PETS,
  ERROR_GET_PETS,
  CREATE_NEW_PET,
  FINISHED_NEW_PET,
  ERROR_NEW_PET,
  INVALIDATE_NEW_PET,
  REQUEST_DEL_PET,
  FINISHED_DEL_PET,
  ERROR_DEL_PET,
  INVALIDATE_DEL_PET
} from '../actions/pet';

import { completePet } from '../utils';

const createDefaultState = () => {
  return {
    isSubmitting: false,
    error: undefined,
    success: undefined
  };
}

const delDefaultState = () => {
  return {
    isLoading: false,
    error: undefined,
    success: undefined
  };
}

export default (state={
  pets: [],
  create: createDefaultState(),
  del: delDefaultState()
}, action) => {
  switch(action.type) {
    case REQUEST_GET_PETS:
      return {
        ...state,
        pets: [],
        isLoading: true
      };

    case FINISHED_GET_PETS:
      return {
        ...state,
        isLoading: false,
        pets: action.pets.map(completePet)
      };

    case ERROR_GET_PETS:
      return {
        ...state,
        isLoading: false
      };

    case CREATE_NEW_PET:
      return {
        ...state,
        create: {
          isSubmitting: true
        }
      };

    case ERROR_NEW_PET:
      return {
        ...state,
        create: {
          error: action.error
        }
      };

    case FINISHED_NEW_PET:
      return {
        ...state,
        pets: [ ...state.pets, action.pet ].map(completePet),
        create: {
          success: true
        }
      };

    case INVALIDATE_NEW_PET:
      return {
        ...state,
        create: createDefaultState()
      };

    case REQUEST_DEL_PET:
      return {
        ...state,
        del: { isLoading: true }
      };

    case FINISHED_DEL_PET:
      return {
        ...state,
        pets: state.pets.filter(p => p.id != action.id),
        del: { success: true }
      };

    case ERROR_DEL_PET:
      return {
        ...state,
        del: { error: action.error }
      };

    case INVALIDATE_DEL_PET:
      return {
        ...state,
        del: delDefaultState()
      };
  }

  return state;
}
