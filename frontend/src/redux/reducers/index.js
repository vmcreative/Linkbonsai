import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  items: itemsReducer
});

export default rootReducer;
