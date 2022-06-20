import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setupWorker } from "msw";
import { AirviewMockServer } from "airview-mock-server";

global.Buffer = global.Buffer || require("buffer").Buffer;

function prepare() {
  if (process.env.REACT_APP_USE_MOCK === "true") {
    const { handlers } = new AirviewMockServer(500);
    const worker = setupWorker(...handlers);
    worker.start();
  }

  return Promise.resolve();
}

prepare().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
