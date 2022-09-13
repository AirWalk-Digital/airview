import React, { useState } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Collapse, Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function FrameworkViewRow({
  controlID,
  controlTitle,
  owner,
  type,
  children,
}) {
  const classes = frameworkViewRowStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "&.MuiTableRow-root": classes.tableBodyRowRoot }}>
        <TableCell>
          <Box component="span">{controlID}</Box>
        </TableCell>

        <TableCell>
          <Box component="span">{controlTitle}</Box>
        </TableCell>

        <TableCell>
          <Box component="span">{owner}</Box>
        </TableCell>

        <TableCell>
          <Box component="span">{type}</Box>
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

FrameworkViewRow.propTypes = {
  controlID: PropTypes.string.isRequired,
  controlTitle: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function frameworkViewRowStyles() {
  return {
    // Table body rows
    tableBodyRowRoot: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  };
}
