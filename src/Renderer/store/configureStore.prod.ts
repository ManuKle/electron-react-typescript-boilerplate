import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { rootReducer, RootState } from "@red/index";

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: RootState) {
  return createStore(rootReducer as Reducer<any>, initialState, enhancer);
}

export default { configureStore, history };
