import { combineReducers } from 'redux';
import countriesReducer from './countries';
import themesReducer from './themes';

export default combineReducers({
  countries: countriesReducer,
  themes: themesReducer,
});
