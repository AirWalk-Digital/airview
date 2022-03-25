import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

function prepare() {
  if (
    (process.env.REACT_APP_USE_API === "true" &&
      process.env.NODE_ENV !== "test") ||
    process.env.NODE_ENV === "production"
  ) {
    return Promise.resolve();
  }

  const { worker } = require("./mocks/api/browser");
  return worker.start();
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
