import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../Reducers';
import sagaTasks from '../Saga/Sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default function () {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(sagaTasks);
  return store;
}