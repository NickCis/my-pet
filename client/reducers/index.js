import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';
import profile from './profile';
import pet from './pet';
import candidate from './candidate';

const rootReducer = combineReducers({
  login,
  page,
  user,
  profile,
  pet,
  candidate
});

export default rootReducer
