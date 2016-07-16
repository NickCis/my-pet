import { REQUEST_REGISTER, FINISHED_REGISTER, ERROR_REGISTER } from '../actions/register';

export default function(state={}, action) {
  switch(action.type) {
    case REQUEST_REGISTER:
      return {
        username: action.username,
        isFetching: true
      };

    case FINISHED_REGISTER:
      return {
        isFetching: false,
        success: true
      };

    case ERROR_REGISTER:
      return {
        isFetching: false,
        error: action.error
      };
  }

  return state;
}
