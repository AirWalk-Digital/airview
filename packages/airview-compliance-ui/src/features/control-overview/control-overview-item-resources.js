import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  FilterListIcon,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
  SettingsIcon,
  CheckIcon,
  ClearIcon,
  InfoIcon,
} from "@mui/material";
import dayjs from "dayjs";

export function ControlOverviewItemResources({
  resourcesData,
  onManageResourceClick,
  onViewResourceEvidence,
}) {
  const classes = controlOverviewItemResourcesStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [lastSeenOrder, setLastSeenOrder] = useState("desc");

  const handleOnFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnFilterClose = () => {
    setAnchorEl(null);
  };

  const handleOnFilterChange = (selectedFilter) => {
    if (activeFilters.includes(selectedFilter)) {
      setActiveFilters(
        activeFilters.filter((filter) => filter !== selectedFilter)
      );
    } else {
      setActiveFilters([...activeFilters, selectedFilter]);
    }
  };

  const filters = useMemo(() => {
    return resourcesData
      .map((instance) => instance.environment)
      .reduce((uniqueFilters, filter) => {
        return uniqueFilters.includes(filter)
          ? uniqueFilters
          : [...uniqueFilters, filter];
      }, [])
      .sort();
  }, [resourcesData]);

  const getResourcesByFilterValues = (resources, filterValues) => {
    if (filterValues.length < 1) return resources;

    return resources.filter((instance) =>
      filterValues.includes(instance.environment)
    );
  };

  const getResourcesSortedByLastSeenDate = (resources, sortBy) => {
    return [
      ...resources.sort((a, b) => {
        if (sortBy === "asc") {
          return Date.parse(a.lastSeen) - Date.parse(b.lastSeen);
        }
        if (sortBy === "desc") {
          return Date.parse(b.lastSeen) - Date.parse(a.lastSeen);
        }

        return 0;
      }),
    ];
  };

  const processedResourcesData = useMemo(() => {
    return getResourcesByFilterValues(
      getResourcesSortedByLastSeenDate(resourcesData, lastSeenOrder),
      activeFilters
    );
  }, [resourcesData, lastSeenOrder, activeFilters]);

  const handleOnSortByLastSeenClick = () => {
    if (lastSeenOrder === "asc") {
      setLastSeenOrder("desc");
    } else {
      setLastSeenOrder("asc");
    }
  };

  const getStatusLabelClassName = (status) => {
    let className;

    switch (status) {
      case "Monitoring":
        className = "statusLabelMonitoring";
        break;
      case "Non-Compliant":
        className = "statusLabelNonCompliant";
        break;
      case "Exempt":
        className = "statusLabelExempt";
        break;
      default:
        className = "";
    }

    return className;
  };

  return (
    <Paper variant="outlined" sx={classes.container}>
      <TableContainer>
        <Toolbar variant="dense" sx={{ "&.MuiToolbar-root": classes.toolbar }}>
          <Typography variant="subtitle2" component="p">
            Resources
          </Typography>

          {filters && filters.length > 1 && (
            <Box marginLeft="auto">
              <Tooltip title="Filter" placement="bottom-end">
                <span>
                  <IconButton
                    aria-controls="filter-menu"
                    aria-haspopup="true"
                    onClick={handleOnFilterClick}
                    aria-label="Show filters"
                    size="small"
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
                onClose={handleOnFilterClose}
                anchorOrigin={{
                  vertical: 8,
                  horizontal: 28,
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
                {filters.map((filter) => {
                  return (
                    <MenuItem
                      onClick={() => handleOnFilterChange(filter)}
                      dense
                      key={filter}
                    >
                      <ListItemIcon
                        sx={{ "&.MuiListItemIcon-root": classes.filterItem }}
                      >
                        <Checkbox
                          checked={activeFilters.includes(filter)}
                          color="default"
                          disableRipple
                          tabIndex={-1}
                          size="small"
                          sx={{
                            "&.MuiCheckbox-root": classes.filterCheckbox,
                          }}
                          inputProps={{
                            "aria-labelledby": filter,
                            "aria-checked": activeFilters.includes(filter),
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        id={filter}
                        primary={filter}
                        primaryTypographyProps={{
                          "aria-label": `Filter by ${filter}`,
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>

        <Table size="small">
          <TableHead sx={classes.tableHead}>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Environment</TableCell>
              <TableCell sortDirection={lastSeenOrder}>
                {processedResourcesData.length > 1 ? (
                  <TableSortLabel
                    active={true}
                    direction={lastSeenOrder}
                    onClick={handleOnSortByLastSeenClick}
                    aria-label="Sort by last seen"
                  >
                    Last seen
                    <Box
                      component="span"
                      sx={classes.visuallyHidden}
                      aria-label="Sorting order"
                    >
                      {lastSeenOrder === "desc"
                        ? "Last seen sorted descending"
                        : "Last seen sorted ascending"}
                    </Box>
                  </TableSortLabel>
                ) : (
                  "Last seen"
                )}
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={classes.tableBody}>
            {processedResourcesData.map((resource) => {
              return (
                <TableRow key={resource.id}>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.reference}</TableCell>
                  <TableCell>{resource.environment}</TableCell>
                  <TableCell>
                    {dayjs(resource.lastSeen).format("MMM D YYYY h:mm A")}
                  </TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        ...classes.statusLabel,
                        ...classes[getStatusLabelClassName(resource.status)],
                      }}
                    >
                      {resource.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {resource.pending ? (
                      <CheckIcon color="primary" fontSize="small" />
                    ) : (
                      <ClearIcon color="primary" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {resource.status === "Exempt" && !resource.pending ? (
                      <Tooltip title={"Manage Exemption"}>
                        <span>
                          <IconButton
                            aria-label="Manage Exemption"
                            color="primary"
                            size="small"
                            onClick={() => onManageResourceClick(resource.id)}
                          >
                            <SettingsIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {resource?.evidence ? (
                      <Tooltip title={"View Evidence"}>
                        <span>
                          <IconButton
                            aria-label="View Evidence"
                            color="primary"
                            size="small"
                            onClick={() => onViewResourceEvidence(resource.id)}
                          >
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

ControlOverviewItemResources.propTypes = {
  resourcesData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      reference: PropTypes.string,
      environment: PropTypes.string,
      lastSeen: PropTypes.string,
      status: PropTypes.oneOf(["Monitoring", "Non-Compliant", "Exempt"]),
      pending: PropTypes.bool,
    })
  ),
  onManageResourceClick: PropTypes.func.isRequired,
  onViewResourceEvidence: PropTypes.func.isRequired,
};

function controlOverviewItemResourcesStyles() {
  return {
    container: {
      marginTop: 2,
    },
    toolbar: {
      paddingLeft: 2,
      paddingRight: 2,
      backgroundColor: "grey.50",
    },
    filterItem: { minWidth: 30 },
    filterCheckbox: {
      padding: 0,

      "$filterCheckboxChecked&:hover, &:hover": {
        backgroundColor: "transparent",
      },
    },
    filterCheckboxChecked: {},
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    tableHead: {
      backgroundColor: "grey.50",
    },
    tableBody: {
      "& > tr:last-of-type > td": {
        borderBottom: "none",
      },
    },
    statusLabel: {
      ..."typography.body2",
      textTransform: "capitalize",
      fontSize: 12,
      fontWeight: "bolc",
      border: `1px solid primary.main`,
      borderRadius: 1,
      padding: "2px 8px",
      whiteSpace: "nowrap",
    },

    statusLabelMonitoring: {
      backgroundColor: "success.main",
      borderColor: "success.dark",
      color: "common.white",
    },

    statusLabelNonCompliant: {
      backgroundColor: "error.main",
      borderColor: "error.dark",
      color: "common.white",
    },

    statusLabelExempt: {
      backgroundColor: "grey.300",
      borderColor: "grey.400",
      color: "grey.800",
    },
  };
}
