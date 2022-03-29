import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts";
import { EntryView } from "./views";

export function KitchenSinkDemo() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path=":collectionId/:entryId" element={<EntryView />} />
        <Route path="*" element={<span>Entry not found!</span>} />
      </Route>
    </Routes>
  );
}
