import { RootActions } from "@act/index";

export interface counterState {
  counter: number;
}

const initialState = {
  counter: 0
};

export const counterReducer = (
  state: counterState = initialState,
  action: RootActions
) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return {
        ...state,
        counter: state.counter + 1
      };
    case "DECREMENT_COUNTER":
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};
