import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

export function ControlOverviewItemDetail({
  control,
  frameworks,
  controlAction,
  lifecycle,
}) {
  const classes = useControlOverviewItemDetailStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <div className={classes.itemDetails}>
          <div className={classes.itemDetail}>
            <div className={classes.itemDetailLeftContent}>
              <Typography className={classes.itemDetailTitle}>
                Control:
              </Typography>
            </div>

            <div className={classes.itemDetailRightContent}>
              <Typography variant="body2">{control.name}</Typography>

              <Button
                size="small"
                variant="outlined"
                href={control.url}
                color="primary"
                endIcon={<OpenInNewIcon />}
                className={classes.itemDetailAction}
              >
                View
              </Button>
            </div>
          </div>

          <div className={classes.itemDetail}>
            <div className={classes.itemDetailLeftContent}>
              <Typography className={classes.itemDetailTitle}>
                Frameworks:
              </Typography>
            </div>

            <div className={classes.itemDetailRightContent}>
              {frameworks.map((framework) => (
                <Button
                  size="small"
                  variant="outlined"
                  href={framework.url}
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  className={classes.itemDetailAction}
                  key={framework.name}
                >
                  {framework.name}
                </Button>
              ))}
            </div>
          </div>

          <div className={classes.itemDetail}>
            <div className={classes.itemDetailLeftContent}>
              <Typography className={classes.itemDetailTitle}>
                Control Action:
              </Typography>
            </div>

            <div className={classes.itemDetailRightContent}>
              <Typography variant="body2">{controlAction}</Typography>
            </div>
          </div>

          <div className={classes.itemDetail}>
            <div className={classes.itemDetailLeftContent}>
              <Typography className={classes.itemDetailTitle}>
                Lifecycle:
              </Typography>
            </div>

            <div className={classes.itemDetailRightContent}>
              <Typography variant="body2">{lifecycle}</Typography>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={3} className={classes.actions}>
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

const useControlOverviewItemDetailStyles = makeStyles((theme) => {
  return {
    itemDetail: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1, 0),

      "&:first-of-type": {
        paddingTop: 0,
      },

      "&:not(:last-of-type)": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },

    itemDetailLeftContent: {
      flex: "0 0 auto",
      paddingRight: theme.spacing(1),
    },

    itemDetailRightContent: {
      flex: "1 1 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      paddingLeft: theme.spacing(1),

      "& > *:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },

    itemDetailTitle: {
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightBold,
    },

    itemDetailAction: {
      fontSize: theme.typography.pxToRem(12),

      "& .MuiSvgIcon-root": {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  };
});
