import React from "react";
import { Provider } from "react-redux";
import { airviewStore } from "./airview-store";
import { Editor } from "../editor";

export function AirviewProvider() {
  return (
    <Provider store={airviewStore}>
      <Editor />
    </Provider>
  );
}
