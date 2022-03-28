import { useMemo } from "react";
import { config } from "../config";

export function useConfig() {
  return useMemo(() => {
    return { ...config };
  }, []);
}
