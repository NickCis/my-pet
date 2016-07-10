import { combineReducers } from 'redux'

import page from './page';
import login from './login';

const rootReducer = combineReducers({
  login,
  page
});

export default rootReducer
