import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WorkingOverlay } from "./working-overlay";

export function ControlOverviewResourceManager({
  open,
  onClose,
  resourceData,
  onResourceExemptionDelete,
  onResourceExemptionSave,
}) {
  const classes = controlOverviewResoueceManagerStyles();

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
        <Typography variant="h6" component="h3" sx={classes.sectionHeader}>
          Ticket:
        </Typography>
        <Typography variant="body2">{resourceData.ticket}</Typography>

        <Divider sx={classes.sectionDivider} />

        <Typography variant="h6" component="h3" sx={classes.sectionHeader}>
          Expires:
        </Typography>

        <Typography variant="body2">
          To save this resource exemption, enter a new date greater than the
          current expiry date.
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            disablePast
            value={revisedExpiryDate}
            onChange={(date) => setRevisedExpiryDate(date)}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                margin="normal"
                size="small"
                {...params}
              />
            )}
            disabled={working}
            PopperProps={{ placement: "auto" }}
          />
        </LocalizationProvider>

        <Divider sx={classes.sectionDivider} />

        <Typography variant="h6" component="h3" sx={classes.sectionHeader}>
          Resources:
        </Typography>

        <Box component="ul" sx={classes.resourcesList}>
          {resourceData.resources.map((resource) => (
            <Typography component="li" variant="body2" key={resource}>
              {resource}
            </Typography>
          ))}
        </Box>
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

function controlOverviewResoueceManagerStyles() {
  return {
    sectionHeader: {
      fontSize: 15,
      fontWeight: 600,
    },
    sectionDivider: {
      marginTop: 2,
      marginBottom: 2,
    },
    resourcesList: {
      margin: 0,
      padding: "0 0 0 18px",
    },
  };
}

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
