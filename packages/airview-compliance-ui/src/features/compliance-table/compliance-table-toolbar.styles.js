export function complianceTableToolbarStyles() {
  return {
    toolbar: {
      paddingLeft: 2,
      paddingRight: 1,
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
