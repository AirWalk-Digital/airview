export function complianceTableAcceptRiskDialogStyles() {
  return {
    border: {
      border: "1px solid #000",
    },
    limitedExemptionGridItem: {
      display: "flex",
      flexDirection: "column",
    },
    limitedExemptionLabel: {
      margin: 0,
    },
    limitedexemptionswitch: {
      marginTop: "-2px",
    },
    exemptionEnd: {
      margin: 0,
      width: "100%",

      "& .MuiInputBase-input": {
        paddingTop: "10.5px",
        paddingBottom: "10.5px",
        height: "1.1876em",
      },

      "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 12px) scale(1)",
      },
    },
    inputLabel: {
      display: "block",
      marginTop: "-5px",
      marginBottom: "6px",
      fontSize: 12,
    },
    selectedBtnGroupItem: {
      "&, &:hover": {
        backgroundColor: "primary.main",
        color: "common.white",
      },
      "&[disabled]": {
        backgroundColor: "action.disabledBackground",
        color: "action.disabled",
      },
    },
    submitActionContainer: {
      position: "relative",
    },
    submitActionProgressContainer: {
      position: "absolute",
      display: "inline-flex",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  };
}
