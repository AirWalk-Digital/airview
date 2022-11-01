import React from "react";
import { AirviewCMS, MDXProvider } from "airview-cms";
import { AirviewUiThemeProvider } from "airview-ui";
import { Routes, Route } from "react-router-dom";
import { config } from "./config";
import { MainLayout } from "./layouts";
import { NotFoundView, DocumentView, HomePageView } from "./views";
import { TestMDXComponent } from "./components";

const components = {
  TestMDXComponent,
};

function App() {
  return (
    <AirviewCMS config={config}>
      <AirviewUiThemeProvider>
        <MDXProvider components={components}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePageView />} />
              <Route path=":collection/:entry/*" element={<DocumentView />} />
            </Route>
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </MDXProvider>
      </AirviewUiThemeProvider>
    </AirviewCMS>
  );
}

export default App;
