import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form/immutable';
import stories from './stories';

export default combineReducers({
  stories,
  form
});
