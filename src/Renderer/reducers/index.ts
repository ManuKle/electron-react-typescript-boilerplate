import { combineReducers } from "redux";
import { routerReducer, RouterState } from "react-router-redux";
import { counterReducer, counterState } from "@red/counter";

export interface RootState {
  counter: counterState;
  router: RouterState;
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  router: routerReducer
});
