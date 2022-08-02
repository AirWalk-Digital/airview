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
import { isLinkInternal } from "../../util";

export function Menu({
  menuTitle,
  menuTitleElement = "h3",
  loading = false,
  fetching = false,
  menuItems,
  collapsible = true,
  initialCollapsed = true,
  linkComponent,
  currentRoute,
  sx,
  ...rest
}) {
  const [collapsed, setCollapsed] = useState(
    collapsible ? initialCollapsed : false
  );

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
  /**
   * Sets the title of the Menu
   */
  menuTitle: PropTypes.string.isRequired,
  /**
   * Sets the HTML tag of the Menu title
   */
  menuTitleElement: PropTypes.string,
  /**
   * Renders the Menu in a loading state
   */
  loading: PropTypes.bool,
  /**
   * Renders the Menu in a fetching state
   */
  fetching: PropTypes.bool,
  /**
   * Defines the data for the Menu navigation items
   */
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
  /**
   * Enables the Menu to collpase
   */
  collapsible: PropTypes.bool,
  /**
   * Sets the intial collapsed state, if collapsible Menu is enabled
   */
  initialCollapsed: PropTypes.bool,
  /**
   * Allows the passing of a Link Component (i.e React Router Link)
   */
  linkComponent: PropTypes.any,
  /**
   * Enables highlighting of the current route to the user
   */
  currentRoute: PropTypes.string,
  /**
   * Allows passthrough of SX styling props (see Material UI SX docs for more info)
   */
  sx: PropTypes.object,
};
