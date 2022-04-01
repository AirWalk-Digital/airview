import { Provider } from "react-redux";
import { store } from "./features/store";
import { Setup } from "./features/setup";
import { MainView } from "./views/main-view";

export function ReduxDemo() {
  return (
    <Provider store={store}>
      <Setup>
        <MainView />
      </Setup>
    </Provider>
  );
}
