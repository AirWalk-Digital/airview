import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";

export function ControlOverviewItem({
  id,
  name,
  severity,
  applied,
  exempt,
  children,
  onChange,
}) {
  const classes = useControlOverviewItemStyles({
    severity: severity.toLowerCase(),
  });

  const handleOnChange = (event, expanded) => {
    if (expanded) onChange(id);
  };

  return (
    <Accordion
      classes={{
        root: classes.overviewItem,
        expanded: classes.overviewItemExpanded,
      }}
      onChange={handleOnChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.overviewItemSummary}
      >
        <Box display="flex" flexGrow={1} justifyContent="space-between">
          <Box paddingRight={1} display="flex" alignItems="center">
            <Tooltip
              title={`Severity: ${severity.toLowerCase()}`}
              placement="bottom-start"
            >
              <ErrorIcon fontSize="small" className={classes.severityStatus} />
            </Tooltip>

            <Typography variant="body2">{name}</Typography>
          </Box>

          <Box paddingLeft={1} display="flex" alignItems="center">
            <Tooltip title={`Applied`} placement="bottom-end">
              <span className={classes.infoLabel}>
                <Typography variant="body2">{applied}</Typography>
              </span>
            </Tooltip>

            <Tooltip title={`Exempt`} placement="bottom-end">
              <span className={classes.infoLabel}>
                <Typography variant="body2">{exempt}</Typography>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails className={classes.overviewItemDetail}>
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

const useControlOverviewItemStyles = makeStyles((theme) => {
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
      "&$overviewItemExpanded": {
        margin: "auto",
      },
      "&:not(:first-of-type) $overviewItemSummary": {
        borderTop: "1px solid rgba(0, 0, 0, .125)",
      },
    },
    overviewItemExpanded: {},
    overviewItemSummary: {
      "$overviewItemExpanded &": {
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
      },
    },
    overviewItemDetail: {
      display: "block",
      paddingTop: theme.spacing(2),
    },
    severityStatus: (props) => {
      const getBackgroundColor = (severity) => {
        let backgroundColor;

        switch (severity) {
          case "low":
            backgroundColor = theme.palette.success.main;
            break;
          case "medium":
            backgroundColor = theme.palette.warning.main;
            break;
          case "high":
            backgroundColor = theme.palette.error.main;
            break;
          default:
            backgroundColor = theme.palette.grey["500"];
        }

        return backgroundColor;
      };

      return {
        width: 26,
        height: 26,
        padding: 4,
        borderRadius: "100%",
        color: "#fff",
        display: "inline-block",
        backgroundColor: getBackgroundColor(props.severity),
        fontSize: "16px",
        marginRight: theme.spacing(2),
      };
    },
    infoLabel: {
      display: "inline-block",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0, 1),
      color: theme.palette.text.primary,

      "&:not(:last-of-type)": {
        marginRight: theme.spacing(1),
      },
    },
  };
});
