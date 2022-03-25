import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

function prepare() {
  if (process.env.REACT_APP_USE_API === "true") {
    return Promise.resolve();
  }
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/api/browser");
    return worker.start();
  }
  return Promise.resolve();
}
prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
