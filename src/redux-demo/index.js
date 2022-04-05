import { AirviewProvider } from "./library";
import { MainView } from "./views/main-view";
import { config } from "./config";
import "./styles.css";

export function ReduxDemo() {
  return (
    <AirviewProvider config={config}>
      <MainView />
    </AirviewProvider>
  );
}
