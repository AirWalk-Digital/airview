import { Provider } from "react-redux";
import { airviewStore } from "./airview-store";

export function AirviewProvider({ children }) {
  return <Provider store={airviewStore}>{children}</Provider>;
}
