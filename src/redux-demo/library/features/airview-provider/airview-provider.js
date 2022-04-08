import { Provider } from "react-redux";
import { history, AirviewRouter } from "../airview-router";
import { ConfigProvider } from "../airview-config";
import { airviewStore } from "../airview-store";
import { EditorUi } from "../editor-ui/editor-ui";

export function AirviewProvider({ config, children }) {
  return (
    <Provider store={airviewStore}>
      <AirviewRouter history={history}>
        <ConfigProvider {...{ config }}>
          {/*<EditorUi>{children}</EditorUi>*/}
          {children}
        </ConfigProvider>
      </AirviewRouter>
    </Provider>
  );
}
