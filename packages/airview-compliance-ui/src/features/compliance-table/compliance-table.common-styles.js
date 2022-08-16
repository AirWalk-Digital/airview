export function complianceTableCommonStyles() {
  return {
    // Application name table cell styles
    applicationTableCell: {
      paddingLeft: 0,
    },

    // Hide elements for screen readers only
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: "1px",
    },
  };
}
