export function complianceTableToolbarStyles(theme) {
  return {
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },

    toolbarFilters: {
      marginLeft: "auto",
    },

    checkboxContainer: {
      minWidth: 30,
    },

    checkbox: {
      padding: 0,

      "$checkboxChecked&:hover, &:hover": {
        backgroundColor: "transparent",
      },
    },

    checkboxChecked: {},
  };
}
