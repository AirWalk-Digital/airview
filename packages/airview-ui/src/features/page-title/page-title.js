import React from "react";
import PropTypes from "prop-types";
import { Typography, Skeleton } from "@mui/material";

export function PageTitle({
  title,
  loading = false,
  fetching = false,
  component,
  sx,
  ...rest
}) {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{ ...(fetching && { opacity: 0.5 }), ...sx }}
      {...{ component, ...rest }}
    >
      {loading ? <Skeleton /> : title}
    </Typography>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  component: PropTypes.string,
  sx: PropTypes.object,
};
