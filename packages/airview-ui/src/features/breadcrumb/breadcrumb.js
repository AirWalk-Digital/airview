import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Typography, Skeleton, Link } from "@mui/material";
import { isLinkInternal } from "../../util";

export function Breadcrumb({
  links,
  currentRoute,
  loading,
  fetching,
  linkComponent,
  sx,
}) {
  return (
    <Breadcrumbs
      maxItems={5}
      aria-label="Breadcrumb"
      aria-live="polite"
      aria-busy={loading}
      sx={{
        ...(fetching && {
          opacity: 0.5,
          pointerEvents: "none",
        }),
        ...sx,
      }}
    >
      {loading
        ? [...Array(5)].map((item, index) => (
            <Skeleton key={index} sx={{ width: 110 }} />
          ))
        : links?.map((link) => (
            <Link
              underline="hover"
              to={link.url}
              target={isLinkInternal(link.url) ? "_self" : "_blank"}
              key={link.url}
              component={linkComponent}
            >
              {link.label}
            </Link>
          ))}
      {!loading && <Typography>{currentRoute}</Typography>}
    </Breadcrumbs>
  );
}

Breadcrumb.propTypes = {
  /**
   * Presents the breadcrumbs in a loading state
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Renders the breadcrumbs in a fetching state
   */
  fetching: PropTypes.bool.isRequired,
  /**
   * Sets the available interactive link items
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Allows the passing of a Link Component (i.e React Router Link)
   */
  linkComponent: PropTypes.any,
  /**
   * Sets the current route (the current page)
   */
  currentRoute: PropTypes.string.isRequired,
  /**
   * Allows passthrough of SX styling props (see Material UI SX docs for more info)
   */
  sx: PropTypes.object,
};
