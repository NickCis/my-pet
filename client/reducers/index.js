import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';
import profile from './profile';
import pet from './pet';
import candidate from './candidate';
import pet_info from './pet_info';

const rootReducer = combineReducers({
  login,
  page,
  user,
  profile,
  pet,
  candidate,
  pet_info
});

export default rootReducer
