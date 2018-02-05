import { createStore, applyMiddleware, compose, Reducer } from "redux";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware, routerActions } from "react-router-redux";
import { createLogger } from "redux-logger";
import { rootReducer, RootState } from "@red/index";

interface DebugWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (args: any) => any;
}

const history = createHashHistory();

const configureStore = (initialState?: RootState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: "info",
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== "test") {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window as DebugWindow)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as DebugWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose;

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(
    rootReducer as Reducer<any>,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    );
  }

  return store;
};

export default { configureStore, history };
