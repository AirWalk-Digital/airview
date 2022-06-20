import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const Message = React.forwardRef(
  ({ borderColor = "#000", title, message, ...rest }, ref) => {
    const classes = useStyles({ borderColor });

    const { className, ...otherProps } = rest;

    return (
      <Paper
        className={clsx(classes.root, className)}
        variant="outlined"
        ref={ref}
        {...otherProps}
      >
        {title && (
          <Typography align="center" variant="subtitle1">
            {title}
          </Typography>
        )}

        {message && (
          <Typography align="center" variant="body2">
            {message}
          </Typography>
        )}
      </Paper>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  root: ({ borderColor }) => ({
    padding: theme.spacing(2),
    borderTop: `${theme.spacing(0.5)}px solid ${borderColor}`,
  }),
}));

Message.propTypes = {
  borderColor: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Message.displayName = "Message";

export { Message };
