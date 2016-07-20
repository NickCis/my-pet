import {
  REQUEST_GET_CANDIDATES,
  FINISHED_GET_CANDIDATES,
  ERROR_GET_CANDIDATES,
  INVALIDATE_GET_CANDIDATES,
  REMOVE_CANDIDATE
} from '../actions/candidate';

import { completePet } from '../utils';

export default function candidate(
    state={
      pet: 0,
      candidates: []
    },
    action
) {
  switch(action.type) {
    case REQUEST_GET_CANDIDATES:
      return {
        ...state,
        pet: action.id,
        isLoading: true,
        invalidate: false,
        candidates: []
      };

    case FINISHED_GET_CANDIDATES:
      if(state.pet == action.pet && !state.invalidate)
        return {
          ...state,
          isLoading: false,
          candidates: action.candidates.map(c => completePet(c))
        };

    case ERROR_GET_CANDIDATES:
      return {
        ...state,
        isLoading: false
      };

    case INVALIDATE_GET_CANDIDATES:
      return {
        ...state,
        isLoading: false,
        invalidate: true,
        candidates: []
      };

    case REMOVE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.filter(candidate => candidate.id != action.idCandidate)
      };
  }

  return state;
}
