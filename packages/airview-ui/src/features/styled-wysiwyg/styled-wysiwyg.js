import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { StyledWysiwygLoading } from "./styled-wysiwyg-loading";

export function StyledWysiwyg({
  children,
  sx,
  loading = false,
  fetching = false,
  ...rest
}) {
  if (loading) return <StyledWysiwygLoading />;

  return (
    <Box
      sx={{
        "&": {
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-word",

          "& h1": (theme) => ({
            ...theme.typography.h1,
            fontSize: 34,
          }),
          "& h2": (theme) => ({
            ...theme.typography.h2,
            fontSize: 28,
          }),
          "& h3": (theme) => ({
            ...theme.typography.h3,
            fontSize: 24,
          }),
          "& h4": (theme) => ({
            ...theme.typography.h4,
            fontSize: 22,
          }),
          "& h5": (theme) => ({
            ...theme.typography.h5,
            fontSize: 20,
          }),
          "& h6": (theme) => ({
            ...theme.typography.h6,
            fontSize: 18,
          }),
          "& h1, h2, h3, h4, h5, h6": {
            fontWeight: "fontWeightMedium",
            marginY: 2,
          },
          "& hr": {
            border: 0,
            height: 0,
            borderBottom: 1,
            borderColor: "divider",
            marginY: 4,
            display: "block",
          },
          "& img": {
            marginY: 2,
            display: "block",
          },
          "& a, a:visited": {
            color: "primary.main",
          },
          "& a:hover, a:focus": {
            textDecoration: "none",
          },
          "& code": {
            fontSize: "90%",
            fontFamily: "Consolas,'Liberation Mono',Courier,monospace",
            color: red[900],
            borderRadius: "4px",
            backgroundColor: "grey.100",
            padding: "3px 6px",
          },
          "& ul, & ol": {
            listStylePosition: "outside",
            padding: "0 0 0 36px",
          },
          "& blockquote": {
            paddingLeft: 2,
            borderLeft: 4,
            borderColor: "primary.main",
            marginX: 0,
            marginY: 2,

            "&:before": {
              content: "none",
            },

            "& cite": {
              display: "block",
              fontStyle: "normal",
              fontWeight: "fontWeightMedium",
              fontSize: 14,
            },
          },
          "& pre": {
            display: "block",
            width: "100%",
            whiteSpace: "pre",
            overflow: "auto",
            backgroundColor: "grey.900",
            borderRadius: 1,
            tabSize: 2,
            wordWrap: "initial",
            fontSize: 14,
            marginX: 0,
            marginY: 2,
            padding: 0,

            "& code": {
              overflowX: "auto",
              display: "block",
              padding: 2,
              backgroundColor: "transparent",
              border: 0,
              color: "grey.400",
              fontSize: "100%",
            },
          },
          "& table": (theme) => ({
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
            marginX: 0,
            marginY: 2,
            fontFamily: "default",
            fontWeight: "regular",

            // Scrollable table for smaller viewports
            [theme.breakpoints.down(800)]: {
              overflow: "hidden",
              overflowX: "scroll",
              display: "block",
              whiteSpace: "nowrap",
              height: "auto",
              overflowScrolling: "touch",
              WebkitOverflowScrolling: "touch",
            },

            "& th": {
              fontWeight: "medium",
            },

            "& td": {
              verticalAlign: "top",
            },

            "& tbody": {
              wordBreak: "break-word",
            },

            "& th, & td": {
              border: 1,
              borderColor: "grey.300",
              minWidth: 100,
            },

            "& thead th, & thead td, & tbody th, & tbody td, & tfoot th, & tfoot td":
              {
                padding: 1,
              },

            "& thead, & tbody tr:nth-of-type(even)": {
              backgroundColor: "grey.100",
            },

            "& p": {
              fontSize: "inherit",
            },

            "& th p": {
              fontWeight: "inherit",
            },
          }),
        },
        ...(fetching && { opacity: 0.5, pointerEvents: "none" }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

StyledWysiwyg.propTypes = {
  /**
   * HTML DOM nodes to render as children of the component
   */
  children: PropTypes.node,
  /**
   * Allows passthrough of SX styling props (see Material UI SX docs for more info)
   */
  sx: PropTypes.object,
  /**
   * Renders the component in a loading state
   */
  loading: PropTypes.bool,
  /**
   * Renders the component in a fetching state
   */
  fetching: PropTypes.bool,
};
