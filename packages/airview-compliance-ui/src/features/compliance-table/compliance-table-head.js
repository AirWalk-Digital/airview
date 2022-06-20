import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { complianceTableCommonStyles } from "./compliance-table.common-styles";
import { complianceTableHeadStyles } from "./compliance-table-head.styles";

const useSharedComplianceTableStyles = makeStyles(() =>
  complianceTableCommonStyles()
);

const useComplianceTableHeadStyles = makeStyles((theme) =>
  complianceTableHeadStyles(theme)
);

function ComplianceTableHead({ ageOrder, sortable, onSortClick }) {
  const classes = useComplianceTableHeadStyles();
  const sharedClasses = useSharedComplianceTableStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>

        <TableCell classes={{ root: sharedClasses.applicationTableCell }}>
          Name
        </TableCell>

        <TableCell classes={{ root: classes.ticketsTableColumn }}>
          Ticket/s
        </TableCell>

        <TableCell
          classes={{ root: classes.ageTableColumn }}
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
              <span
                className={sharedClasses.visuallyHidden}
                aria-label="Sorting order"
              >
                {ageOrder === "desc"
                  ? "Age sorted descending"
                  : "Age sorted ascending"}
              </span>
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
