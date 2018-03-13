import { counterReducer } from '../../src/Renderer/reducers/counter';
import { actions } from '../../src/Renderer/actions/counter';

describe('reducers', () => {
  describe('counterReducer', () => {
    it('should handle initial state', () => {
      expect(counterReducer(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(counterReducer(1, { type: actions.INCREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(counterReducer(1, { type: actions.DECREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(counterReducer(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
