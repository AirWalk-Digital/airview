export function complianceTableRowDetailStyles(theme) {
  return {
    // Instance row additional information container
    additionalInfoContainer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      display: "flex",
      justifyContent: "space-between",
    },

    instanceInfo: {
      listStyle: "none",
      padding: theme.spacing(2),
      margin: 0,
      flex: "1 1 74.5%",
    },

    instanceInfoItem: {
      padding: theme.spacing(1, 0),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      "&:not(:last-of-type)": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },

      "& > span:first-of-type": {
        fontWeight: theme.typography.fontWeightBold,
      },

      "& .MuiButton-root": {
        marginLeft: theme.spacing(1),
        fontSize: 12,

        "& .MuiSvgIcon-root": {
          fontSize: 14,
        },
      },
    },

    instances: {
      listStyle: "none",
      textAlign: "right",
      display: "flex",
      justifyContent: "flex-end",
      flexWrap: "wrap",
    },

    instanceItem: {
      paddingLeft: theme.spacing(1),
      wordBreak: "break-word",

      "&:not(:last-child):after": {
        content: "','",
      },

      "&:not(:first-child)": {
        marginLeft: 4,
      },
    },

    pendingInstance: {
      color: theme.palette.text.primary,
    },

    control: {
      textAlign: "right",
      wordBreak: "break-word",
    },

    // Instance actions
    instanceActions: {
      flex: "1 1 25.5%",
      padding: theme.spacing(3, 2),

      "& .MuiButton-root": {
        marginBottom: theme.spacing(1),
        fontSize: 12,
      },
    },

    // Loading skeleton
    loadingInstanceInfoRow: {
      margin: theme.spacing(1, 0),
    },

    instanceActionsLoading: {
      paddingTop: theme.spacing(2),
    },

    // Failed data loding feedback message
    loadingErrorFeedbackContainer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
    },
  };
}
