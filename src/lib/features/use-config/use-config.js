import { useMemo, useContext } from "react";
import { ConfigContext } from "../config-provider";

export function useConfig() {
  const theme = useContext(ConfigContext);

  return useMemo(() => {
    return { ...theme };
  }, [theme]);
}
