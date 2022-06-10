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
import { isLinkInternal } from "@util";

export function Menu({
  menuTitle,
  menuTitleElement = "h3",
  loading = false,
  menuItems,
  collapsible = true,
  initialCollapsed = true,
  linkComponent,
  currentRoute,
  ...rest
}) {
  const [collapsed, setCollapsed] = useState(
    collapsible ? initialCollapsed : false
  );

  return (
    <Box component="nav" {...rest}>
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
        {menuItems?.map(({ groupTitle, links }, index) => (
          <Box aria-hidden={collapsed} key={index}>
            {groupTitle && (
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  display: "block",
                  marginTop: 2,
                  marginBottom: -1,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                {loading ? <Skeleton width="90%" /> : groupTitle}
              </Typography>
            )}
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
              {loading
                ? [...Array(6)].map((item, index) => (
                    <Skeleton key={index} component="li" />
                  ))
                : links?.map(({ label, url }, index) => {
                    return (
                      <Box component="li" key={index}>
                        <Link
                          underline="hover"
                          component={linkComponent}
                          to={url}
                          target={isLinkInternal(url) ? "_self" : "_blank"}
                          sx={{
                            ...(url === currentRoute && { fontWeight: "bold" }),
                          }}
                        >
                          {label}
                        </Link>
                      </Box>
                    );
                  })}
            </Box>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
}

Menu.propTypes = {
  menuTitle: PropTypes.string.isRequired,
  menuTitleElement: PropTypes.string,
  loading: PropTypes.bool,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      groupTitle: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  collapsible: PropTypes.bool,
  initialCollapsed: PropTypes.bool,
  linkComponent: PropTypes.any,
  currentRoute: PropTypes.string.isRequired,
};
