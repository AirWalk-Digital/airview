import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

export function FrameworkViewHeader() {
  const classes = frameworkViewHeaderStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>

        <TableCell sx={{ "&.MuiTableCell-root": classes.titleTableColumn }}>
          Title
        </TableCell>

        <TableCell>Owner</TableCell>

        <TableCell>Type</TableCell>

        <TableCell />
      </TableRow>
    </TableHead>
  );
}

function frameworkViewHeaderStyles() {
  return {
    titleTableColumn: {
      width: 350,
    },
  };
}
