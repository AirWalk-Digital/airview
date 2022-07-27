import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Toolbar,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  Box,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import ListItemIcon from "@mui/material/ListItemIcon";
import { complianceTableToolbarStyles } from "./compliance-table-toolbar.styles";

function ComplianceTableToolbar({
  title,
  filters,
  activeFilters,
  onFilterChange,
  testid,
}) {
  const classes = complianceTableToolbarStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!title && (!filters || filters.length < 2)) return null;

  return (
    <Toolbar
      sx={{ "&.MuiToolbar-gutters": classes.toolbar }}
      data-testid={testid}
    >
      {title && (
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      )}

      {filters && filters.length > 1 && (
        <Box component="div" sx={classes.toolbarFilters}>
          <Tooltip title="Filter" placement="bottom-end">
            <span>
              <IconButton
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
                aria-label="Show filters"
              >
                <FilterListIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 12,
              horizontal: 36,
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              "aria-hidden": Boolean(!anchorEl),
              "aria-label": "Filters",
            }}
          >
            {filters.map((filter) => (
              <MenuItem
                onClick={() => onFilterChange(filter)}
                dense
                key={filter}
              >
                <ListItemIcon
                  sx={{ "&.MuiListItemIcon-root": classes.checkboxContainer }}
                >
                  <Checkbox
                    checked={activeFilters.includes(filter)}
                    color="default"
                    disableRipple
                    tabIndex={-1}
                    size="small"
                    sx={{
                      "&.MuiCheckbox-root": classes.checkbox,
                      "&.Mui-checked": classes.checkboxChecked,
                    }}
                    inputProps={{
                      "aria-labelledby": filter,
                      "aria-checked": activeFilters.includes(filter),
                    }}
                  />
                </ListItemIcon>

                <ListItemText id={filter} primary={filter} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </Toolbar>
  );
}

ComplianceTableToolbar.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.string),
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func,
  testid: PropTypes.string,
};

export { ComplianceTableToolbar };
