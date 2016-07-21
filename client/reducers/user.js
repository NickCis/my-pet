import {
  REQUEST_REGISTER,
  FINISHED_REGISTER,
  ERROR_REGISTER,
  INVALIDATE_REGISTER
} from '../actions/register';

export default function(state={}, action) {
  switch(action.type) {
    case REQUEST_REGISTER:
      return {
        user: action.user,
        username: action.user.username,
        isFetching: true
      };

    case FINISHED_REGISTER:
      return {
        ...state,
        isFetching: false,
        success: true
      };

    case ERROR_REGISTER:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case INVALIDATE_REGISTER:
      return {
        ...state,
        success: false,
        error: undefined
      };
  }

  return state;
}
