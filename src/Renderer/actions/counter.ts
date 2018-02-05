import { RootState } from "@red/index";

export type counterActions = increment | decrement;

interface increment {
  type: string;
}

interface decrement {
  type: string;
}

const increment = () => ({
  type: "INCREMENT_COUNTER"
});

const decrement = () => ({
  type: "DECREMENT_COUNTER"
});

const incrementIfOdd = () => {
  return (
    dispatch: (action: counterActions) => void,
    getState: () => RootState
  ) => {
    const { counter } = getState().counter;

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
};

const incrementAsync = (delay: number = 1000) => {
  return (dispatch: (action: counterActions) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
};

export const actionCreators = {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
};
