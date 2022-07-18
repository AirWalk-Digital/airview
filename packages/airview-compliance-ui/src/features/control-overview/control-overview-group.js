import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

export function ControlOverviewGroup({ groupTitle, id, onChange, children }) {
  const classes = controlOverviewGroupStyles();

  const handleOnChange = (event, expanded) => {
    if (expanded) onChange(id);
  };

  return (
    <Accordion
      sx={{
        "&.MuiAccordion-root": classes.overviewGroup,
      }}
      onChange={handleOnChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={classes.overviewGroupSummary}
      >
        <Typography sx={classes.overviewGroupTitle}>{groupTitle}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={classes.overviewGroupChildren}>
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

function controlOverviewGroupStyles() {
  return {
    overviewGroup: {
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
    overviewGroupExpanded: {},
    overviewGroupSummary: {},
    overviewGroupTitle: {
      fontSize: 16,
      fontWeight: "medium",
    },
    overviewGroupChildren: {
      display: "block",
      padding: 0,
      borderTop: "1px solid rgba(0, 0, 0, .125)",
    },
  };
}
