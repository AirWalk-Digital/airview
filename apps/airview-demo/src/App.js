import React from "react";
import { AirviewCMS } from "airview-cms";
import { Routes, Route, Link } from "react-router-dom";
import { config } from "./config";
import { MainLayout } from "./layouts";
import { DemoView } from "./views";

function App() {
  return (
    <AirviewCMS config={config}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path=":collection/:entry" element={<DemoView />} />
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AirviewCMS>
  );
}

export default App;

function NotFoundView() {
  return (
    <div>
      <h1>404: Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
