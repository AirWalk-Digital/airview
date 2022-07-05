import React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";

import { complianceTableCommonStyles } from "./compliance-table.common-styles";
import { complianceTableHeadStyles } from "./compliance-table-head.styles";

function ComplianceTableHead({ ageOrder, sortable, onSortClick }) {
  const classes = complianceTableHeadStyles();
  const sharedClasses = complianceTableCommonStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>

        <TableCell
          sx={{ "&.MuiTableCell-root": sharedClasses.applicationTableCell }}
        >
          Name
        </TableCell>

        <TableCell sx={{ "&.MuiTableCell-root": classes.ticketsTableColumn }}>
          Ticket/s
        </TableCell>

        <TableCell
          sx={{ "&.MuiTableCell-root": classes.ageTableColumn }}
          sortDirection={ageOrder}
        >
          {sortable ? (
            <TableSortLabel
              active={true}
              direction={ageOrder}
              onClick={onSortClick}
              aria-label="Sort by age"
            >
              Age
              <Box
                component="span"
                sx={sharedClasses.visuallyHidden}
                aria-label="Sorting order"
              >
                {ageOrder === "desc"
                  ? "Age sorted descending"
                  : "Age sorted ascending"}
              </Box>
            </TableSortLabel>
          ) : (
            "Age"
          )}
        </TableCell>

        <TableCell />
      </TableRow>
    </TableHead>
  );
}

ComplianceTableHead.propTypes = {
  ageOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  sortable: PropTypes.bool.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

export { ComplianceTableHead };
