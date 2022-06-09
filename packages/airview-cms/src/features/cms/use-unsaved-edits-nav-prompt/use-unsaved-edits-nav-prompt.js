import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { useAirviewRouterHistory } from "../../airview-router";

export function useUnsavedEditsNavPrompt() {
  const haveEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const history = useAirviewRouterHistory();

  useLayoutEffect(() => {
    let unblock;

    if (haveEdits) {
      unblock = history.block((tx) => {
        if (
          window.confirm(
            "You have unsaved changes; if you continue to navigate, your changes will be lost. Continue?"
          )
        ) {
          unblock();
          tx.retry();
        }
      });
    }
  }, [history, haveEdits]);
}
