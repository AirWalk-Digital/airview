import React from "react";
import { AirviewCMS } from "airview-cms";
import { AirviewUiThemeProvider } from "airview-ui";
import { Routes, Route } from "react-router-dom";
import { config } from "./config";
import { MainLayout } from "./layouts";
import { NotFoundView, DocumentView } from "./views";

function App() {
  const baseUrl = process.env.REACT_APP_CMS_API_BASE_URL;
  return (
    <AirviewCMS config={{ ...config, baseUrl }}>
      <AirviewUiThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path=":collection/:entry" element={<DocumentView />} />
          </Route>
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </AirviewUiThemeProvider>
    </AirviewCMS>
  );
}

export default App;
