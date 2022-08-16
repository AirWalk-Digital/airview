import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { enableCms, selectCmsBusyStatus } from "../cms.slice";

export function EnableCmsButton() {
  const dispatch = useDispatch();
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      variant="contained"
      disableElevation
      size="small"
      disabled={cmsBusy}
      onClick={() => dispatch(enableCms())}
      sx={{
        position: "fixed",
        zIndex: 1299,
        bottom: 32,
        right: 32,
      }}
    >
      Enable CMS
    </Button>
  );
}
