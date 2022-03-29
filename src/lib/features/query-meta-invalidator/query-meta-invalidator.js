import { useLayoutEffect } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "../use-history";

export function QueryMetaInvalidator({ children }) {
  const queryClient = useQueryClient();
  const otherHistory = useHistory();

  useLayoutEffect(() => {
    const unlisten = otherHistory.listen(() => {
      queryClient.invalidateQueries("entries_meta");
    });

    return () => unlisten();
  }, [queryClient, otherHistory]);

  return children;
}
