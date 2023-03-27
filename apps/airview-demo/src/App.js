import React from "react";
import { AirviewCMS } from "airview-cms";
import { AirviewUiThemeProvider } from "airview-ui";
import { Routes, Route } from "react-router-dom";
import { config } from "./config";
import { MainLayout } from "./layouts";
import { NotFoundView, DocumentView, HomePageView } from "./views";

function App() {
  return (
    <AirviewCMS config={config}>
      <AirviewUiThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePageView />} />
            <Route path=":collection/:entry/*" element={<DocumentView />} />
          </Route>
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </AirviewUiThemeProvider>
    </AirviewCMS>
  );
}

export default App;
