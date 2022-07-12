export function complianceTableRowDetailStyles() {
  return {
    // Instance row additional information container
    additionalInfoContainer: {
      borderTop: 1,
      borderTopColor: "divider",
      display: "flex",
      justifyContent: "space-between",
    },

    instanceInfo: {
      listStyle: "none",
      padding: 2,
      margin: 0,
      flex: "1 1 74.5%",
    },

    instanceInfoItem: {
      padding: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      "&:not(:last-of-type)": {
        borderBottom: 1,
        borderBottomColor: "divider",
      },

      "& > span:first-of-type": {
        fontWeight: "bold",
      },

      "& .MuiButton-root": {
        marginLeft: 1,
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
      paddingLeft: 1,
      wordBreak: "break-word",

      "&:not(:last-child):after": {
        content: "','",
      },

      "&:not(:first-of-type)": {
        marginLeft: 400,
      },
    },

    pendingInstance: {
      color: "text.primary",
    },

    control: {
      textAlign: "right",
      wordBreak: "break-word",
    },

    // // Instance actions
    instanceActions: {
      flex: "1 1 25.5%",
      paddingTop: 3,
      paddingRight: 2,

      "& .MuiButton-root": {
        marginBottom: 1,
        fontSize: 12,
      },
    },

    // Loading skeleton
    loadingInstanceInfoRow: {
      margin: 1,
    },

    instanceActionsLoading: {
      paddingTop: 2,
    },

    // Failed data loding feedback message
    loadingErrorFeedbackContainer: {
      borderTop: 1,
      borderTopColor: "divider",
      padding: 2,
    },
  };
}
