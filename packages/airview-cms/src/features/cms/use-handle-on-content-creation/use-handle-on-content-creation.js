import { PUT_ENTRY_FIXED_CACHE_KEY } from "../content-creator";
import { usePutEntryMutation } from "../../store";

export function useHandleOnContentCreation(callback) {
  const [, { data, isSuccess }] = usePutEntryMutation({
    fixedCacheKey: PUT_ENTRY_FIXED_CACHE_KEY,
  });

  if (data && isSuccess) {
    callback(data);
  }
}
