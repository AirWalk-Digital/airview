import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Typography,
  Skeleton,
  Link,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function getDownloadLabel(status) {
  let label;

  switch (status) {
    case "loading":
      label = "- please wait...";
      break;
    case "error":
      label = "- error, please try again";
      break;
    default:
      label = "";
  }

  return `Download as PDF ${label}`;
}

function DocumentActions({
  menuTitle,
  menuTitleElement = "h3",
  collapsible = true,
  initialCollapsed = false,
  loading = false,
  fetching = false,
  srcURL,
  sx,
  onDownloadPDFClick,
  downloadStatus,
  presentationHtmlOnClick,
  presentationHtmlDownloadStatus,
  presentationPdfLinkUrl,
  pageLinkUrl,
  ...rest
}) {
  const [collapsed, setCollapsed] = useState(
    collapsible ? initialCollapsed : false
  );

  const handleOnCopyLinkClick = async () => {
    await navigator.clipboard.writeText(pageLinkUrl);
    window.alert("Page link copied to clipboard");
  };

  return (
    <Box
      component="nav"
      sx={{
        ...(fetching && {
          opacity: 0.5,
          pointerEvents: "none",
        }),
        ...sx,
      }}
      {...rest}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <Typography
          component={menuTitleElement}
          variant="subtitle2"
          sx={{ display: "block", flex: "1 1 auto", fontSize: 16 }}
        >
          {loading ? <Skeleton width="90%" /> : menuTitle}
        </Typography>

        {collapsible && (
          <IconButton
            onClick={() => setCollapsed((prevState) => !prevState)}
            size="medium"
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            disabled={loading}
            sx={{
              marginLeft: 1,
              padding: 0,
              color: "primary.main",
            }}
          >
            {collapsed ? (
              <KeyboardArrowRightIcon fontSize="inherit" />
            ) : (
              <KeyboardArrowDownIcon fontSize="inherit" />
            )}
          </IconButton>
        )}
      </Box>

      <Collapse in={!collapsed}>
        <Box
          component="ul"
          sx={{
            margin: 0,
            marginTop: 2,
            padding: 0,
            listStyle: "none",
            "& > li": {
              fontSize: 14,
              marginBottom: 1,
              color: "text.secondary",
            },
          }}
        >
          <Box component="li">
            {loading ? (
              <Skeleton component="span" />
            ) : (
              <Link
                underline="hover"
                component="a"
                href={srcURL}
                target="_blank"
              >
                View Document Source
              </Link>
            )}
          </Box>
          <Box component="li">
            {loading ? (
              <Skeleton component="span" />
            ) : (
              <Link
                underline={downloadStatus !== "loading" ? "hover" : "none"}
                component="button"
                disabled={downloadStatus === "loading"}
                onClick={onDownloadPDFClick}
                sx={{
                  fontFamily: "default",
                  fontSize: "default",
                  ...(downloadStatus === "error"
                    ? { color: "error.main" }
                    : {}),
                  ...(downloadStatus === "loading" ? { cursor: "wait" } : {}),
                }}
              >
                {getDownloadLabel(downloadStatus)}
              </Link>
            )}
          </Box>
          <Box component="li">
            {loading ? (
              <Skeleton component="span" />
            ) : (
              <Link
                underline={downloadStatus !== "loading" ? "hover" : "none"}
                component="button"
                onClick={handleOnCopyLinkClick}
                sx={{
                  fontFamily: "default",
                  fontSize: "default",
                }}
              >
                Copy page link to clipboard
              </Link>
            )}
          </Box>

          {presentationHtmlOnClick && (
            <Box component="li">
              {loading ? (
                <Skeleton component="span" />
              ) : (
                <Link
                  underline={
                    presentationHtmlDownloadStatus !== "loading"
                      ? "hover"
                      : "none"
                  }
                  component="button"
                  onClick={presentationHtmlOnClick}
                  sx={{
                    fontFamily: "default",
                    fontSize: "default",
                  }}
                >
                  Open Presentation (HTML)
                </Link>
              )}
            </Box>
          )}
          {presentationPdfLinkUrl && (
            <Box component="li">
              {loading ? (
                <Skeleton component="span" />
              ) : (
                <Link
                  underline="hover"
                  component="a"
                  href={presentationPdfLinkUrl}
                  target="_blank"
                >
                  Open Presentation (PDF)
                </Link>
              )}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

DocumentActions.propTypes = {
  menuTitle: PropTypes.string.isRequired,
  menuTitleElement: PropTypes.string,
  collapsible: PropTypes.bool,
  initialCollapsed: PropTypes.bool,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  srcURL: PropTypes.string.isRequired,
  sx: PropTypes.object,
  downloadStatus: PropTypes.oneOf(["loading", "error"]),
  onDownloadPDFClick: PropTypes.func,
  presentationHtmlOnClick: PropTypes.func,
  pageLinkUrl: PropTypes.string.isRequired,
  presentationPdfLinkUrl: PropTypes.string,
  presentationHtmlDownloadStatus: PropTypes.oneOf(["loading", "error"]),
};

export { DocumentActions };
