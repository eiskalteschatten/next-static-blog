import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import app, { AppState } from './reducers/appReducer';

const devExtension = process.browser && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;  // eslint-disable-line no-undef

const composeEnhancers = devExtension && process.env.NODE_ENV !== 'production' ? devExtension : compose;

const reducer = combineReducers({
  app
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

export interface State {
  app: AppState;
}

// Shortcuts
export const dispatch: ThunkDispatch<any, any, AnyAction> = store.dispatch.bind(store);
export const getState = store.getState.bind(store);

export default store;
