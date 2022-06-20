import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";
import DayjsUtils from "@date-io/dayjs";
import dayjs from "dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { WorkingOverlay } from "./working-overlay";

export function ControlOverviewResourceManager({
  open,
  onClose,
  resourceData,
  onResourceExemptionDelete,
  onResourceExemptionSave,
}) {
  const classes = useStyles();

  const [revisedExpiryDate, setRevisedExpiryDate] = useState(
    resourceData?.expires
  );

  const [working, setWorking] = useState(false);

  useEffect(() => {
    setRevisedExpiryDate(resourceData?.expires);
  }, [resourceData?.expires]);

  useEffect(() => {
    if (!open) {
      setWorking(false);
    }
  }, [open]);

  const handleOnResourceExemptionDelete = async () => {
    setWorking(true);

    const { controlId, resourceId } = resourceData;

    await onResourceExemptionDelete({ controlId, resourceId });

    onClose();
  };

  const handleOnResourceExemptionSave = async () => {
    setWorking(true);

    const { controlId, resourceId } = resourceData;

    await onResourceExemptionSave({
      controlId,
      resourceId,
      revisedExpiryDate: revisedExpiryDate.toISOString(),
    });

    onClose();
  };

  if (!resourceData) return null;

  return (
    <Dialog
      aria-labelledby="control-overview-resource-manager-title"
      open={open}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
    >
      <WorkingOverlay open={working} />

      <DialogTitle id="control-overview-resource-manager-title">
        Manage Resource Exemption
      </DialogTitle>

      <DialogContent dividers>
        <Typography
          variant="h6"
          component="h3"
          className={classes.sectionHeader}
        >
          Ticket:
        </Typography>
        <Typography variant="body2">{resourceData.ticket}</Typography>

        <Divider className={classes.sectionDivider} />

        <Typography
          variant="h6"
          component="h3"
          className={classes.sectionHeader}
        >
          Expires:
        </Typography>

        <Typography variant="body2">
          To save this resource exemption, enter a new date greater than the
          current expiry date.
        </Typography>

        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <KeyboardDatePicker
            name="reviewDate"
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="DD/MM/YYYY"
            margin="normal"
            size="small"
            fullWidth
            disablePast
            invalidDateMessage="Invalid date, please format as DD/MM/YYYY"
            minDateMessage="Date should not be a past date"
            value={revisedExpiryDate}
            onChange={(date) => setRevisedExpiryDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
              size: "small",
              edge: "end",
            }}
            required
            disabled={working}
          />
        </MuiPickersUtilsProvider>

        <Divider className={classes.sectionDivider} />

        <Typography
          variant="h6"
          component="h3"
          className={classes.sectionHeader}
        >
          Resources:
        </Typography>

        <ul className={classes.resourcesList}>
          {resourceData.resources.map((resource) => (
            <Typography component="li" variant="body2" key={resource}>
              {resource}
            </Typography>
          ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          disableElevation
          disabled={working}
        >
          Cancel
        </Button>
        <Button
          onClick={handleOnResourceExemptionDelete}
          color="primary"
          variant="contained"
          disableElevation
          disabled={working}
        >
          {working ? "Working..." : "Delete"}
        </Button>
        <Button
          onClick={handleOnResourceExemptionSave}
          color="primary"
          variant="contained"
          disableElevation
          disabled={
            !dayjs(revisedExpiryDate).isAfter(dayjs(resourceData.expires)) ||
            working
          }
        >
          {working ? "Working..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    fontSize: theme.typography.pxToRem(15),
  },
  sectionDivider: {
    margin: theme.spacing(2, 0),
  },
  resourcesList: {
    margin: 0,
    padding: "0 0 0 18px",
  },
}));

ControlOverviewResourceManager.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resourceData: PropTypes.shape({
    ticket: PropTypes.string.isRequired,
    expires: PropTypes.string.isRequired,
    resources: PropTypes.arrayOf(PropTypes.string).isRequired,
    controlId: PropTypes.number.isRequired,
    resourceId: PropTypes.number.isRequired,
  }),
  onResourceExemptionDelete: PropTypes.func.isRequired,
  onResourceExemptionSave: PropTypes.func.isRequired,
};
