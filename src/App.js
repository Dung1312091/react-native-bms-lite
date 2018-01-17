import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import allReducers from "./reducers";
import rootSaga from "./sagas/index";
import RouterComponent from "./Routers";

const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers =
// process.env.NODE_ENV !== 'production' &&
// typeof window === 'object' &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
//       // Prevent recomputing reducers for `replaceReducer`
//     shouldHotReload: true,
//   })
//   : compose;
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
