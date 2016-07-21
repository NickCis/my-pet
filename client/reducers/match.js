import {
  REQUEST_MATCH,
  FINISHED_MATCH,
  ERROR_MATCH
} from '../actions/match';

import { completePet } from '../utils';

export default function(state={
  matches: [],
  isLoading: false,
  error: undefined,
  pet: 0
}, action) {
  switch(action.type){
    case REQUEST_MATCH:
      return{
        ...state,
        isFetching: true,
        finished: false,
        pet: action.id
      };

    case FINISHED_MATCH:
      return{
        ...state,
        isFetching: false,
        finished: true,
        matches: action.matches.map(completePet)
      };

    case ERROR_MATCH:
      return{
        ...state,
        isFetching: false,
        error: action.error,
      };
  }

  return state;
}
