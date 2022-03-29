import { AirviewProvider } from "./lib";
import { config } from "./config";
import { KitchenSinkDemo } from "./kitchen-sink-demo";

export function App() {
  return (
    <AirviewProvider {...{ config }}>
      <KitchenSinkDemo />
    </AirviewProvider>
  );
}
