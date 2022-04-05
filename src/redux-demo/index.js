import { Routes, Route } from "react-router-dom";
import { AirviewProvider } from "./library";
import { config } from "./config";
import { MainLayout, EntryView } from "./demo";
import "./styles.css";

export function ReduxDemo() {
  return (
    <AirviewProvider config={config}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path=":collection/:entry" element={<EntryView />} />
          <Route path="*" element={<span>Entry not found!</span>} />
        </Route>
      </Routes>
    </AirviewProvider>
  );
}
