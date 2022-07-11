export function complianceTableRowStyles() {
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
      padding: "4px",
      borderRadius: "100%",
      color: "#fff",
      display: "block",
    },

    controlStatusIconFontSmall: {
      fontSize: "16px",
    },

    controlStatusIconSeverity_high: {
      backgroundColor: "error.main",
    },

    controlStatusIconSeverity_medium: {
      backgroundColor: "warning.light",
    },

    controlStatusIconSeverity_low: {
      backgroundColor: "grey.500",
    },

    // Name / Environment information
    nameEnvBase: {
      display: "block",
      wordBreak: "break-word",
    },

    env: {
      color: "grey.600",
      fontSize: 12,
    },

    // Application tickets
    applicationTicketsContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: "-4px",
    },

    applicationTicketLabel: {
      fontWeight: "medium",
    },

    applicationTicketRoot: {
      margin: 0.5,
      borderRadius: 1,
      flex: "1 1 auto",
      maxWidth: 250,
    },

    applicationTicketType_incident: {
      backgroundColor: "error.main",
      color: "error.contrastText",
    },

    applicationTicketType_problem: {
      backgroundColor: "warning.light",
      color: "rgba(0, 0, 0, 0.87)",
    },

    applicationTicketType_risk: {
      backgroundColor: "grey.400",
      color: "rgba(0, 0, 0, 0.87)",
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
      color: "grey.600",
      fontSize: 12,
    },
  };
}
