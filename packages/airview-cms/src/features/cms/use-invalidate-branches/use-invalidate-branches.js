import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { airviewApi } from "../../store";
import { useAirviewRouterHistory } from "../../airview-router";

export function useInvalidateBranches() {
  const history = useAirviewRouterHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(airviewApi.util.invalidateTags(["Branches"]));
    });

    return () => unlisten();
  }, [history, dispatch]);
}
