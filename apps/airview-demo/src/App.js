import React from "react";
import { AirviewCMS } from "airview-cms";
import { config } from "./config";
import { DemoView } from "./views";

function App() {
  return (
    <AirviewCMS config={config}>
      <DemoView />
    </AirviewCMS>
  );
}

export default App;
