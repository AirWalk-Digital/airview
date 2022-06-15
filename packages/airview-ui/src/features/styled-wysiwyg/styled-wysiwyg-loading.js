import React from "react";
import { Skeleton, Typography } from "@mui/material";

export function StyledWysiwygLoading() {
  return (
    <div>
      <div>
        {[...Array(5)].map((item, index) => (
          <Skeleton width="100%" key={index}>
            <Typography>.</Typography>
          </Skeleton>
        ))}
      </div>

      <div>
        {[...Array(7)].map((item, index) => (
          <Skeleton width="100%" key={index}>
            <Typography>.</Typography>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
