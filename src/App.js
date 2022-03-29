import { Airview } from "./lib";
import { config } from "./config";
import { NavigationDemo } from "./navigation-demo";

export function App() {
  return (
    <Airview {...{ config }}>
      <NavigationDemo />
    </Airview>
  );
}
