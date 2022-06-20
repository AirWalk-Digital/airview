export function complianceTableRowStyles(theme) {
  return {
    // Table body rows
    tableBodyRowRoot: {
      "& > *": {
        borderBottom: "unset",
      },
    },

    // Control status Icon styles
    controlStatusIconRoot: {
      width: 26,
      height: 26,
      padding: 4,
      borderRadius: "100%",
      color: "#fff",
      display: "block",
    },

    controlStatusIconFontSmall: {
      fontSize: "16px",
    },

    controlStatusIconSeverity_high: {
      backgroundColor: theme.palette.error.main,
    },

    controlStatusIconSeverity_medium: {
      backgroundColor: theme.palette.warning.main,
    },

    controlStatusIconSeverity_low: {
      backgroundColor: theme.palette.grey["500"],
    },

    // Name / Environment information
    nameEnvBase: {
      display: "block",
      wordBreak: "break-word",
    },

    env: {
      color: theme.palette.grey["600"],
      fontSize: theme.typography.pxToRem(12),
    },

    // Application tickets
    applicationTicketsContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: "-4px",
    },

    applicationTicketLabel: {
      fontWeight: theme.typography.fontWeightMedium,
    },

    applicationTicketRoot: {
      margin: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius,
      flex: "1 1 auto",
      maxWidth: 250,
    },

    applicationTicketType_incident: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },

    applicationTicketType_problem: {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
    },

    applicationTicketType_risk: {
      backgroundColor: theme.palette.grey["400"],
      color: theme.palette.getContrastText(theme.palette.grey["400"]),
    },

    // Age information
    ageInfoBase: {
      display: "block",
    },

    age: {
      composes: "$ageInfoBase",
    },

    raisedDate: {
      composes: "$ageInfoBase",
      color: theme.palette.grey["600"],
      fontSize: theme.typography.pxToRem(12),
    },
  };
}
