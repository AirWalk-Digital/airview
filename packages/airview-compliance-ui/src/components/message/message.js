import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

function Message({ borderColor = "#000", title, message, sx, ...rest }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
        borderTop: 4,
        borderTopColor: borderColor,
        ...sx,
      }}
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

Message.propTypes = {
  borderColor: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  sx: PropTypes.object,
};

export { Message };
