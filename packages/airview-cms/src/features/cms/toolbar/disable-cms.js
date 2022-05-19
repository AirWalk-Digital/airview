import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { disableCms, selectCmsBusyStatus } from "../cms.slice";

export function DisableCms() {
  const dispatch = useDispatch();
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <Button
      disabled={cmsBusy}
      variant="contained"
      disableElevation
      size="small"
      onClick={() => dispatch(disableCms())}
    >
      Disable CMS
    </Button>
  );
}
