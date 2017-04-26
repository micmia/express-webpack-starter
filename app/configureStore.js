import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger}  from 'redux-logger';
import Immutable from 'immutable';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const initialState = Immutable.Map();

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
);
