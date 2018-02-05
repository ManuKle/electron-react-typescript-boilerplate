import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Store } from "redux";
import { History } from "history";
import Routes from "../routes";

interface Props {
  store: Store<any>;
  history: History;
}

export default class Root extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
