import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCmsEnabledStatus } from "../cms.slice";
import { TOOL_BAR_HEIGHT } from "../toolbar";

export function useCMSViewportOffset() {
  const cmsEnabled = useSelector(selectCmsEnabledStatus);

  console.log(cmsEnabled);

  return useMemo(() => (cmsEnabled ? TOOL_BAR_HEIGHT : 0), [cmsEnabled]);
}
