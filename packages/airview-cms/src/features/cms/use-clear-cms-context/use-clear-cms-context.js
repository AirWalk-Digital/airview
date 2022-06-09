import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCmsContext } from "../cms.slice";
import { useAirviewRouterHistory } from "../../airview-router";

export function useClearCmsContext() {
  const history = useAirviewRouterHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(clearCmsContext());
    });

    return () => unlisten();
  }, [history, dispatch]);
}
