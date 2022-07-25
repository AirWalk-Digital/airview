import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";

export function ControlOverviewItemDetail({
  control,
  frameworks,
  controlAction,
  lifecycle,
}) {
  const classes = controlOverviewItemDetailStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Box component="div">
          <Box component="div" sx={classes.itemDetail}>
            <Box component="div" sx={classes.itemDetailLeftContent}>
              <Typography sx={classes.itemDetailTitle}>Control:</Typography>
            </Box>

            <Box component="div" sx={classes.itemDetailRightContent}>
              <Typography variant="body2">{control.name}</Typography>

              <Button
                size="small"
                variant="outlined"
                href={control.url}
                color="primary"
                endIcon={<OpenInNewIcon />}
                sx={classes.itemDetailAction}
              >
                View
              </Button>
            </Box>
          </Box>

          <Box component="div" sx={classes.itemDetail}>
            <Box component="div" sx={classes.itemDetailLeftContent}>
              <Typography sx={classes.itemDetailTitle}>Frameworks:</Typography>
            </Box>

            <Box component="div" sx={classes.itemDetailRightContent}>
              {frameworks.map((framework) => (
                <Button
                  size="small"
                  variant="outlined"
                  href={framework.url}
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  sx={classes.itemDetailAction}
                  key={framework.name}
                >
                  {framework.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box component="div" sx={classes.itemDetail}>
            <Box component="div" sx={classes.itemDetailLeftContent}>
              <Typography sx={classes.itemDetailTitle}>
                Control Action:
              </Typography>
            </Box>

            <Box component="div" sx={classes.itemDetailRightContent}>
              <Typography variant="body2">{controlAction}</Typography>
            </Box>
          </Box>

          <Box component="div" sx={classes.itemDetail}>
            <Box component="div" sx={classes.itemDetailLeftContent}>
              <Typography sx={classes.itemDetailTitle}>Lifecycle:</Typography>
            </Box>

            <Box component="div" sx={classes.itemDetailRightContent}>
              <Typography variant="body2">{lifecycle}</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3} sx={classes.actions}>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          color="primary"
          size="small"
          onClick={() => {}}
          disabled={false}
        >
          Create Exemption
        </Button>
      </Grid>
    </Grid>
  );
}

ControlOverviewItemDetail.propTypes = {
  control: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  frameworks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  controlAction: PropTypes.string,
  lifecycle: PropTypes.string,
};

function controlOverviewItemDetailStyles() {
  return {
    itemDetail: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 1,
      paddingBottom: 1,
      paddingRight: 0,
      paddingLeft: 0,

      "&:first-of-type": {
        paddingTop: 0,
      },

      "&:not(:last-of-type)": {
        borderBottom: 1,
        borderBottomColor: "divider",
      },
    },

    itemDetailLeftContent: {
      flex: "0 0 auto",
      paddingRight: 1,
    },

    itemDetailRightContent: {
      flex: "1 1 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      paddingLeft: 1,

      "& > *:not(:last-child)": {
        marginRight: 1,
      },
    },

    itemDetailTitle: {
      fontSize: 14,
      fontWeight: "bold",
    },

    itemDetailAction: {
      fontSize: 12,

      "& .MuiSvgIcon-root": {
        fontSize: 14,
      },
    },
  };
}
