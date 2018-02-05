import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Counter from "@com/Counter";
import { actionCreators } from "@act/counter";
import { RootState } from "@red/index";

function mapStateToProps(state: RootState) {
  return {
    counter: state.counter.counter
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter as any);
