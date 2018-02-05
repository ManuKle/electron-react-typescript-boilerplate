import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./containers/Root";
import prodStore from "./store/configureStore.prod";
import devStore from "./store/configureStore.dev";
import "./app.global.css";

const configureStore =
  process.env.NODE_ENV === "production"
    ? prodStore.configureStore
    : devStore.configureStore;

const history =
  process.env.NODE_ENV === "production" ? prodStore.history : devStore.history;

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root");
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
