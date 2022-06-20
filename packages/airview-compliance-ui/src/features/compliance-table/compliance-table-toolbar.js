import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { complianceTableToolbarStyles } from "./compliance-table-toolbar.styles";

const useComplianceTableToolbarStyles = makeStyles((theme) =>
  complianceTableToolbarStyles(theme)
);

function ComplianceTableToolbar({
  title,
  filters,
  activeFilters,
  onFilterChange,
  testid,
}) {
  const classes = useComplianceTableToolbarStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!title && (!filters || filters.length < 2)) return null;

  return (
    <Toolbar classes={{ gutters: classes.toolbar }} data-testid={testid}>
      {title && (
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      )}

      {filters && filters.length > 1 && (
        <div className={classes.toolbarFilters}>
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
            getContentAnchorEl={null}
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
                <ListItemIcon classes={{ root: classes.checkboxContainer }}>
                  <Checkbox
                    checked={activeFilters.includes(filter)}
                    color="default"
                    disableRipple
                    tabIndex={-1}
                    size="small"
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkboxChecked,
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
        </div>
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
