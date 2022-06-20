import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export function ControlOverviewHeader({ title }) {
  const classes = useControlOverviewHeaderStyles();

  return (
    <Toolbar className={classes.header} disableGutters>
      <Typography variant="h6" component="p">
        {title}
      </Typography>
    </Toolbar>
  );
}

ControlOverviewHeader.propTypes = {
  title: PropTypes.string,
};

const useControlOverviewHeaderStyles = makeStyles((theme) => {
  return {
    header: {
      padding: theme.spacing(1, 2),
    },
  };
});
