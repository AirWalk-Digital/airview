import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

export function ControlOverviewGroup({ groupTitle, id, onChange, children }) {
  const classes = useControlOverviewGroupStyles();

  const handleOnChange = (event, expanded) => {
    if (expanded) onChange(id);
  };

  return (
    <Accordion
      classes={{
        root: classes.overviewGroup,
        expanded: classes.overviewGroupExpanded,
      }}
      onChange={handleOnChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.overviewGroupSummary}
      >
        <Typography className={classes.overviewGroupTitle}>
          {groupTitle}
        </Typography>
      </AccordionSummary>

      <AccordionDetails className={classes.overviewGroupChildren}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

ControlOverviewGroup.propTypes = {
  groupTitle: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

const useControlOverviewGroupStyles = makeStyles((theme) => {
  return {
    overviewGroup: {
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$overviewGroupExpanded": {
        margin: "auto",
      },
      "&:not(:first-of-type) $overviewGroupSummary": {
        borderTop: "1px solid rgba(0, 0, 0, .125)",
      },
    },
    overviewGroupExpanded: {},
    overviewGroupSummary: {},
    overviewGroupTitle: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
    overviewGroupChildren: {
      display: "block",
      padding: theme.spacing(0, 0, 0, 0),
      borderTop: "1px solid rgba(0, 0, 0, .125)",
    },
  };
});
