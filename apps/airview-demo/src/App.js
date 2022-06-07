import React from "react";
import { AirviewCMS } from "airview-cms";
import { Routes, Route } from "react-router-dom";
import { config } from "./config";
import { MainLayout } from "./layouts";
import { EntryView, NotFoundView } from "./views";

function App() {
  return (
    <AirviewCMS config={config}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path=":collection/:entry" element={<EntryView />} />
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AirviewCMS>
  );
}

export default App;
