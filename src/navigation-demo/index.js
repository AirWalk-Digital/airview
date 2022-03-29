import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts";
import { EntryView } from "./views";

export function NavigationDemo() {
  return (
    <Routes>
      <Route path="/navigation-demo" element={<MainLayout />}>
        <Route path=":collectionId/:entryId" element={<EntryView />} />
        <Route path="*" element={<span>Entry not found!</span>} />
      </Route>
    </Routes>
  );
}
