import { combineReducers } from 'redux'

import page from './page';
import login from './login';

const rootReducer = combineReducers({
  login: login,
  page: page
});

export default rootReducer
