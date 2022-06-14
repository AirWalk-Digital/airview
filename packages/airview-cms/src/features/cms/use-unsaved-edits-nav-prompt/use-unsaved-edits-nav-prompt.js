import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDoesMetaEditorHaveEdits } from "../meta-editor";
import { useAirviewRouterHistory } from "../../airview-router";

export function useUnsavedEditsNavPrompt() {
  const haveEdits = useSelector(selectDoesMetaEditorHaveEdits);
  const history = useAirviewRouterHistory();

  useEffect(() => {
    let unblock;

    unblock = history.block((tx) => {
      if (haveEdits) {
        if (
          window.confirm(
            "You have unsaved changes; if you continue to navigate, your changes will be lost. Continue?"
          )
        ) {
          unblock();
          tx.retry();
        }
      } else {
        unblock();
        tx.retry();
      }
    });

    return () => {
      unblock();
      unblock = null;
    };
  }, [haveEdits, history]);
}
