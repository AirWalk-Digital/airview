import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { complianceTableCommonStyles } from "./compliance-table.common-styles";
import { complianceTableRowStyles } from "./compliance-table-row.styles";

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
  const classes = complianceTableRowStyles();
  const sharedClasses = complianceTableCommonStyles();
  const [open, setOpen] = useState(false);

  const IconComponent = useMemo(() => {
    return SecurityIcon;

    /*
      To do: it doesn't make sense to use this data as the drill down is based off of qualityModel, so these will always be the same per group 
    if (qualityModel === "security") return SecurityIcon;
    if (qualityModel === "operational") return PowerSettingsNewIcon;
    if (qualityModel === "task") return AssignmentTurnedInIcon;
    */
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "&.MuiTableRow-root": classes.tableBodyRowRoot }}>
        <TableCell aria-label="status">
          <Tooltip
            title={`Control type: ${qualityModel}. Severity: ${severity}`}
            placement="bottom-start"
          >
            <IconComponent
              fontSize="small"
              sx={{
                "&.MuiSvgIcon-root": {
                  ...classes.controlStatusIconRoot,
                  ...classes[`controlStatusIconSeverity_${severity}`],
                },
              }}
            />
          </Tooltip>

          <Box component="span" sx={sharedClasses.visuallyHidden}>
            {`Control type: ${qualityModel}. Severity: ${severity}`}
          </Box>
        </TableCell>

        <TableCell
          sx={{ "&.MuiTableCell-root": sharedClasses.applicationTableCell }}
        >
          <Box component="span" sx={classes.nameEnvBase} aria-label="name">
            {name}
          </Box>
          <Box
            component="span"
            sx={{ ...classes.env, ...classes.nameEnvBase }}
            aria-label="environment"
          >
            {environment}
          </Box>
        </TableCell>

        <TableCell aria-label="tickets">
          <Box component="div" sx={classes.applicationTicketsContainer}>
            {tickets?.map((ticket, index) => (
              <Chip
                key={index}
                size="small"
                label={ticket.reference}
                sx={{
                  "&.MuiChip-root": {
                    ...classes.applicationTicketRoot,
                    ...classes[`applicationTicketType_${ticket.type}`],
                  },
                  "&.MuiChip-label": classes.applicationTicketLabel,
                }}
                aria-label={`Ticket type: ${ticket.type}`}
              />
            ))}
          </Box>
        </TableCell>

        <TableCell>
          <Box component="span" sx={classes.age} aria-label="Time since raised">
            {timeSinceRaised}
          </Box>
          <Box sx={classes.raisedDate} aria-label="Raised date">
            ({raisedDate})
          </Box>
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
