import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import rootReducer from './reducers';

const initialState = Immutable.Map();

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
  ),
);
