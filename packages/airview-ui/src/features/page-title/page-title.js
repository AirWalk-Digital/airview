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
      sx={{
        fontSize: 36,
        fontWeight: "500",
        marginBottom: 4,
        ...(fetching && { opacity: 0.5 }),
        ...sx,
      }}
      {...{ component, ...rest }}
    >
      {loading ? <Skeleton /> : title}
    </Typography>
  );
}

PageTitle.propTypes = {
  /**
   * The title string
   */
  title: PropTypes.string.isRequired,
  /**
   * Set the component to render in a loading state
   */
  loading: PropTypes.bool,
  /**
   * Set the component to render in a fetching state
   */
  fetching: PropTypes.bool,
  /**
   * Set the HTML DOM tag for the title, defaults to H1
   */
  component: PropTypes.string,
  /**
   * Allows passthrough of SX styling props (see Material UI SX docs for more info)
   */
  sx: PropTypes.object,
};
