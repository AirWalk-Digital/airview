import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { enableCms } from "../cms.slice";

export function EnableCmsButton() {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      disableElevation
      size="small"
      onClick={() => dispatch(enableCms())}
      sx={{
        position: "fixed",
        zIndex: 10000,
        bottom: 32,
        right: 32,
      }}
    >
      Enable CMS
    </Button>
  );
}
