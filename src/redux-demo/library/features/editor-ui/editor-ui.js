import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useAirviewRouterHistory } from "../airview-router";
import { EditorToolbar } from "./editor-toolbar";
import { MetaEditor } from "./meta-editor";

const isEqual = require("lodash/isEqual");

export function EditorUi({ children }) {
  const history = useAirviewRouterHistory();

  const { originalData, editsData } = useSelector(
    (store) => store.editorContext
  );

  const haveEdits = !isEqual(originalData, editsData);

  useLayoutEffect(() => {
    let unblock;

    if (haveEdits) {
      unblock = history.block((tx) => {
        if (
          window.confirm(
            "You have unsaved changes; press cancel to keep these changes or ok to dismiss the changes?"
          )
        ) {
          unblock();
          tx.retry();
        }
      });
    }

    return () => unblock && unblock();
  }, [history, haveEdits]);

  useLayoutEffect(() => {
    const unlisten = history.listen(() => {
      console.log("will invalidate branch query");
    });

    return () => unlisten();
  }, [history]);

  return (
    <div
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 16 }}
    >
      <EditorToolbar />

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 16, flex: "1 1 50%" }}>{children}</div>
        <div style={{ flex: "1 1 50%", paddingTop: 20 }}>
          <MetaEditor />
        </div>
      </div>
    </div>
  );
}
