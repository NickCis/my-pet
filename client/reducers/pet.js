import {
  REQUEST_GET_PETS,
  FINISHED_GET_PETS,
  ERROR_GET_PETS
} from '../actions/pet';

export default (state={pets: []}, action) => {
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
        pets: action.pets
      };

    case ERROR_GET_PETS:
      return {
        ...state,
        isLoading: false
      };
  }

  return state;
}
