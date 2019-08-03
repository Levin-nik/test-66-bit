import { combineReducers } from 'redux';
import News from './News';
import Themes from './Themes';

const rootReducer = combineReducers({
  News,
  Themes,
});

export default rootReducer;