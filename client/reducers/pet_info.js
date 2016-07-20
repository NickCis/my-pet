import {
  REQUEST_BREEDS,
  FINISHED_BREEDS,
  ERROR_BREEDS
} from '../actions/pet_info';

export default function(state={
  breed: { breeds: [] }
}, action) {
  switch(action.type){
    case REQUEST_BREEDS:
      return {
        ...state,
        breed: {
          breeds: [],
          isLoading: true
        }
      };

    case FINISHED_BREEDS:
      return {
        ...state,
        breed: {
          breeds: action.breeds,
          isLoading: false
        }
      };

    case ERROR_BREEDS:
      return {
        ...state,
        breed: {
          error: action.error,
          isLoading: false
        }
      };
  }

  return state;
}
