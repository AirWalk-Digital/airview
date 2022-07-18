import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";

export function ControlOverviewItem({
  id,
  name,
  severity,
  applied,
  exempt,
  children,
  onChange,
}) {
  const classes = controlOverviewItemStyles(severity.toLowerCase());

  const handleOnChange = (event, expanded) => {
    if (expanded) onChange(id);
  };

  return (
    <Accordion
      sx={{
        "&.MuiAccordion-root": classes.overviewItem,
      }}
      onChange={handleOnChange}
    >
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper": {
            padding: "12px",
            marginRight: "-12px",
          },
          "&.Mui-expanded": { borderBottom: "1px solid rgba(0, 0, 0, .125)" },
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box display="flex" flexGrow={1} justifyContent="space-between">
          <Box paddingRight={1} display="flex" alignItems="center">
            <Tooltip
              title={`Severity: ${severity.toLowerCase()}`}
              placement="bottom-start"
            >
              <ErrorIcon fontSize="small" sx={classes.severityStatus} />
            </Tooltip>

            <Typography variant="body2">{name}</Typography>
          </Box>

          <Box paddingLeft={1} display="flex" alignItems="center">
            <Tooltip title={`Applied`} placement="bottom-end">
              <Box component="span" sx={classes.infoLabel}>
                <Typography variant="body2">{applied}</Typography>
              </Box>
            </Tooltip>

            <Tooltip title={`Exempt`} placement="bottom-end">
              <Box component="span" sx={classes.infoLabel}>
                <Typography variant="body2">{exempt}</Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={classes.overviewItemDetail}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

ControlOverviewItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  severity: PropTypes.oneOf(["Low", "Medium", "High"]),
  applied: PropTypes.number,
  exempt: PropTypes.number,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

function controlOverviewItemStyles(severity) {
  return {
    overviewItem: {
      width: "100%",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&.Mui-expanded": {
        margin: "auto",
      },
      "&:not(:first-of-type)": {
        borderTop: "1px solid rgba(0, 0, 0, .125)",
      },
    },
    overviewItemExpanded: { margin: "auto" },
    overviewItemSummary: {
      "$overviewItemExpanded &": {
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
      },
    },
    overviewItemDetail: {
      display: "block",
      paddingTop: 2,
    },
    severityStatus: () => {
      const getBackgroundColor = (severity) => {
        let backgroundColor;

        switch (severity) {
          case "low":
            backgroundColor = "success.main";
            break;
          case "medium":
            backgroundColor = "warning.main";
            break;
          case "high":
            backgroundColor = "error.main";
            break;
          default:
            backgroundColor = "grey.500";
        }

        return backgroundColor;
      };

      return {
        width: 26,
        height: 26,
        padding: "4px",
        borderRadius: "100%",
        color: "#fff",
        display: "inline-block",
        backgroundColor: getBackgroundColor(severity),
        fontSize: "16px",
        marginRight: 2,
      };
    },

    infoLabel: {
      display: "inline-block",
      border: 1,
      borderRadius: 1,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 1,
      paddingLeft: 1,
      color: "text.primary",

      "&:not(:last-of-type)": {
        marginRight: 1,
      },
    },
  };
}
