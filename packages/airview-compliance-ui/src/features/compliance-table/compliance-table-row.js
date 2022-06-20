import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SecurityIcon from "@material-ui/icons/Security";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import { complianceTableCommonStyles } from "./compliance-table.common-styles";
import { complianceTableRowStyles } from "./compliance-table-row.styles";

const useComplianceTableCommonStyles = makeStyles(() =>
  complianceTableCommonStyles()
);

const useComplianceTableRowStyles = makeStyles((theme) =>
  complianceTableRowStyles(theme)
);

function ComplianceTableRow({
  environment,
  raisedDate,
  timeSinceRaised,
  qualityModel,
  severity,
  name,
  tickets,
  children,
}) {
  const classes = useComplianceTableRowStyles();
  const sharedClasses = useComplianceTableCommonStyles();
  const [open, setOpen] = useState(false);

  const IconComponent = useMemo(() => {
    return SecurityIcon;

    /*
      To do: it doesn't make sense to use this data as the drill down is based off of qualityModel, so these will always be the same per group 
    if (qualityModel === "security") return SecurityIcon;
    if (qualityModel === "operational") return PowerSettingsNewIcon;
    if (qualityModel === "task") return AssignmentTurnedInIcon;
    */
  }, [qualityModel]);

  return (
    <React.Fragment>
      <TableRow classes={{ root: classes.tableBodyRowRoot }}>
        <TableCell aria-label="status">
          <Tooltip
            title={`Control type: ${qualityModel}. Severity: ${severity}`}
            placement="bottom-start"
          >
            <IconComponent
              fontSize="small"
              classes={{
                root: clsx(
                  classes.controlStatusIconRoot,
                  classes[`controlStatusIconSeverity_${severity}`]
                ),
                fontSizeSmall: classes.controlStatusIconFontSmall,
              }}
            />
          </Tooltip>

          <span className={sharedClasses.visuallyHidden}>
            {`Control type: ${qualityModel}. Severity: ${severity}`}
          </span>
        </TableCell>

        <TableCell classes={{ root: sharedClasses.applicationTableCell }}>
          <span className={classes.nameEnvBase} aria-label="name">
            {name}
          </span>
          <span
            className={clsx(classes.nameEnvBase, classes.env)}
            aria-label="environment"
          >
            {environment}
          </span>
        </TableCell>

        <TableCell aria-label="tickets">
          <div className={classes.applicationTicketsContainer}>
            {tickets?.map((ticket, index) => (
              <Chip
                key={index}
                size="small"
                label={ticket.reference}
                classes={{
                  root: clsx(
                    classes.applicationTicketRoot,
                    classes[`applicationTicketType_${ticket.type}`]
                  ),
                  label: classes.applicationTicketLabel,
                }}
                aria-label={`Ticket type: ${ticket.type}`}
              />
            ))}
          </div>
        </TableCell>

        <TableCell>
          <span className={classes.age} aria-label="Time since raised">
            {timeSinceRaised}
          </span>
          <span className={classes.raisedDate} aria-label="Raised date">
            ({raisedDate})
          </span>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label={open ? "Collapse row" : "Expand row"}
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow aria-hidden={!open}>
        <TableCell padding="none" colSpan={5}>
          <Collapse in={open} timeout="auto">
            {children}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

ComplianceTableRow.propTypes = {
  environment: PropTypes.string.isRequired,
  raisedDate: PropTypes.string.isRequired,
  timeSinceRaised: PropTypes.string.isRequired,
  qualityModel: PropTypes.oneOf(["security", "operational", "task"]).isRequired,
  severity: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
  name: PropTypes.string.isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["incident", "problem", "risk"]),
    })
  ).isRequired,
  children: PropTypes.node,
};

export { ComplianceTableRow };
