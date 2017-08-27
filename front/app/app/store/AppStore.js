import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {reducer} from './reducers/index';
import DefaultState from './DefaultState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const AppStore = createStore(
  reducer,
  DefaultState,
  composeEnhancers(applyMiddleware(thunk, logger)));

export default AppStore;