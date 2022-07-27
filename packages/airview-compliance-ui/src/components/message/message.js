import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const Message = React.forwardRef(
  ({ borderColor = "#000", title, message, ...rest }, ref) => {
    return (
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
          borderTop: (theme) => `${theme.spacing(0.5)}px solid ${borderColor}`,
        }}
        ref={ref}
        {...rest}
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

Message.propTypes = {
  borderColor: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Message.displayName = "Message";

export { Message };
