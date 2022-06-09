import { PUT_ENTRY_FIXED_CACHE_KEY } from "../content-creator";
import { usePutEntryMutation } from "../../store";
import { useEffect } from "react";

export function useHandleOnContentCreation(callback) {
  const [, { data, isSuccess, reset }] = usePutEntryMutation({
    fixedCacheKey: PUT_ENTRY_FIXED_CACHE_KEY,
  });

  useEffect(() => {
    if (data && isSuccess && callback && typeof callback === "function") {
      callback(data);
      reset();
    }
  }, [data, isSuccess, reset, callback]);
}
