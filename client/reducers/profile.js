import {
  CHANGE_PROFILE_TAB,
  REQUEST_UPDATE_PROFILE,
  FINISHED_UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE
} from '../actions/profile';

function defaultState() {
  return {
    tab: 'profile',
    profile: {}
  }
}

export default function(state=defaultState(), action) {
  switch(action.type) {
    case CHANGE_PROFILE_TAB:
      return {
        ...defaultState(),
        tab: action.tab
      };

    case REQUEST_UPDATE_PROFILE:
      return {
        ...state,
        profile: { isLoading: true }
      };

    case FINISHED_UPDATE_PROFILE:
      return {
        ...state,
        profile: { success: true }
      };

    case ERROR_UPDATE_PROFILE:
      return {
        ...state,
        profile: { error: action.error }
      };
  }

  return state;
}
