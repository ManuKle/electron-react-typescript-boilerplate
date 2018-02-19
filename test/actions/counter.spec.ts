import { spy } from 'sinon';
import { actionCreators, actions} from '../../src/Renderer/actions/counter';

describe('actions', () => {
  it('should increment should create increment action', () => {
    expect(actionCreators.increment()).toMatchSnapshot();
  });

  it('should decrement should create decrement action', () => {
    expect(actionCreators.decrement()).toMatchSnapshot();
  });

  it('should incrementIfOdd should create increment action', () => {
    const fn = actionCreators.incrementIfOdd();
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    const getState = () => ({ counter: 1 });
    fn(dispatch, getState);
    expect(dispatch.calledWith({ type: actions.INCREMENT_COUNTER })).toBe(true);
  });

  it('should incrementIfOdd shouldnt create increment action if counter is even', () => {
    const fn = actionCreators.incrementIfOdd();
    const dispatch = spy();
    const getState = () => ({counter: { counter: 2 }});
    fn(dispatch, getState);
    expect(dispatch.called).toBe(false);
  });

  // There's no nice way to test this at the moment...
  it('should incrementAsync', done => {
    const fn = actionCreators.incrementAsync(1);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    setTimeout(() => {
      expect(dispatch.calledWith({ type: actions.INCREMENT_COUNTER })).toBe(true);
      done();
    }, 5);
  });
});
