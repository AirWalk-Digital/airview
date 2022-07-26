import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Switch,
  Typography,
  Box,
  MenuItem,
  FormLabel,
  FormControl,
  Select,
  ButtonGroup,
  WarningIcon,
  CircularProgress,
  InputLabel,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconChip } from "./icon-chip";

import { complianceTableAcceptRiskDialogStyles } from "./compliance-table-accept-risk-dialog.style";

export function ComplianceTableAcceptRiskDialog({
  open,
  onClose,
  onAccept,
  exemptions,
  applicationId,
  impactLevel,
}) {
  const theme = useTheme();
  const classes = complianceTableAcceptRiskDialogStyles();
  const probabilities = useMemo(
    () => ["Low", "Moderate", "High", "Absolute"],
    []
  );
  const impacts = useMemo(() => ["Low", "Medium", "High"], []);
  const impactLevelData = {
    1: {
      label: "Low",
      color: theme.palette.success.main,
    },
    2: {
      label: "Medium",
      color: theme.palette.warning.main,
    },
    3: {
      label: "High",
      color: theme.palette.error.main,
    },
  };
  const initialState = {
    summary: {
      value: "",
      valid: false,
    },
    mitigation: {
      value: "",
      valid: false,
    },
    probability: {
      value: probabilities[0],
      valid: true,
    },
    impact: {
      value: impacts[0],
      valid: true,
    },
    resources: {
      value: [],
      valid: false,
    },
    limitedExemption: {
      value: false,
    },
    exemptionEnd: {
      value: new Date(),
    },
    notes: {
      value: "",
    },
  };
  const [formData, setFormData] = useState({
    ...initialState,
  });
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = () => {
    let formValid = true;

    for (const [, value] of Object.entries(formData)) {
      if (value.valid !== undefined && value.valid === false) {
        formValid = false;
        break;
      }
    }

    return formValid;
  };

  const getImpactLevel = useMemo(
    () =>
      impactLevel(
        impacts.indexOf(formData.impact.value) + 1,
        probabilities.indexOf(formData.probability.value) + 1
      ),
    [
      formData.probability.value,
      formData.impact.value,
      probabilities,
      impacts,
      impactLevel,
    ]
  );

  const handleOnSubmit = async () => {
    try {
      setSubmitting(true);

      await onAccept({ ...formData, applicationId: { value: applicationId } });

      onClose();
    } catch {
      console.log("Something went wrong attempting to submit risk");
    }
  };

  const handleOnExit = () => {
    setFormData({ ...initialState });
    setSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
      maxWidth="md"
      fullWidth
      TransitionProps={{
        onExited: handleOnExit,
      }}
    >
      <DialogTitle>Accept Risks</DialogTitle>

      <DialogContent dividers={true}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Summary"
              variant="outlined"
              fullWidth
              size="small"
              required
              name="summary"
              InputLabelProps={{
                htmlFor: `summary-${applicationId}`,
              }}
              inputProps={{
                id: `summary-${applicationId}`,
              }}
              value={formData.summary.value}
              onChange={(event) => {
                const value = event.target.value;
                setFormData({
                  ...formData,
                  summary: {
                    value: value.trimStart(),
                    valid: value.trimStart().length > 0 ? true : false,
                  },
                });
              }}
              disabled={submitting}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mitigation"
              variant="outlined"
              fullWidth
              size="small"
              required
              name="mitigation"
              InputLabelProps={{
                htmlFor: `mitigation-${applicationId}`,
              }}
              inputProps={{
                id: `mitigation-${applicationId}`,
              }}
              value={formData.mitigation.value}
              onChange={(event) => {
                const value = event.target.value;
                setFormData({
                  ...formData,
                  mitigation: {
                    value: value.trimStart(),
                    valid: value.trimStart().length > 0 ? true : false,
                  },
                });
              }}
              disabled={submitting}
            />
          </Grid>

          <Grid item xs={12} sm="auto">
            <FormLabel
              required
              sx={classes.inputLabel}
              id={`probability-${applicationId}`}
            >
              Probability
            </FormLabel>

            <ButtonGroup
              color="primary"
              disableElevation
              disableRipple
              size="small"
              variant="outlined"
              name="probability"
              disabled={submitting}
              aria-labelledby={`probability-${applicationId}`}
            >
              {probabilities.map((probability) => (
                <Button
                  key={probability}
                  name={probability}
                  onClick={(event) => {
                    setFormData({
                      ...formData,
                      probability: { value: event.currentTarget.name },
                    });
                  }}
                  sx={[
                    formData.probability.value === probability &&
                      classes.selectedBtnGroupItem,
                  ]}
                  disableElevation
                  disableRipple
                  size="small"
                  aria-selected={formData.probability.value === probability}
                >
                  {probability}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm="auto">
            <FormLabel
              required
              sx={classes.inputLabel}
              id={`impact-${applicationId}`}
            >
              Impact
            </FormLabel>

            <ButtonGroup
              color="primary"
              disableElevation
              disableRipple
              size="small"
              name="impact"
              aria-labelledby={`impact-${applicationId}`}
              disabled={submitting}
            >
              {impacts.map((impact) => (
                <Button
                  key={impact}
                  name={impact}
                  onClick={(event) =>
                    setFormData({
                      ...formData,
                      impact: { value: event.currentTarget.name },
                    })
                  }
                  sx={[
                    formData.impact.value === impact &&
                      classes.selectedBtnGroupItem,
                  ]}
                  disableElevation
                  disableRipple
                  size="small"
                  aria-selected={formData.impact.value === impact}
                >
                  {impact}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm="auto">
            <FormLabel sx={classes.inputLabel}>Impact Level</FormLabel>
            <IconChip
              color={impactLevelData[getImpactLevel].color}
              icon={<WarningIcon />}
              label={impactLevelData[getImpactLevel].label}
              labelColor="#fff"
              aria-label="Impact Level"
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <FormControl fullWidth size="small" variant="outlined" required>
              <InputLabel id={`resources-${applicationId}`}>
                Resources
              </InputLabel>
              <Select
                labelId={`resources-${applicationId}`}
                label="Resources"
                multiple
                value={formData.resources.value}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    resources: {
                      value: event.target.value,
                      valid: event.target.value.length !== 0,
                    },
                  })
                }
                MenuProps={{
                  keepMounted: true,
                }}
                disabled={submitting}
              >
                {exemptions.map((exemption) => (
                  <MenuItem
                    key={exemption.name}
                    value={exemption.name}
                    disabled={exemption.status !== "none"}
                  >
                    {exemption.status === "pending"
                      ? `${exemption.name} (pending)`
                      : exemption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{ "&.MuiGrid-item": classes.limitedExemptionGridItem }}
          >
            <FormLabel
              sx={classes.inputLabel}
              htmlFor={`limited-exemption-${applicationId}`}
            >
              Limited Exemption?
            </FormLabel>
            <Switch
              sx={classes.limitedexemptionswitch}
              checked={formData.limitedExemption.value}
              onChange={(event) => {
                const value = event.target.checked;
                setFormData({
                  ...formData,
                  limitedExemption: {
                    value,
                  },
                  exemptionEnd: {
                    ...formData.exemptionEnd,
                    value: value ? formData.exemptionEnd.value : new Date(),
                    valid: true,
                  },
                });
              }}
              name="Limited exemption"
              color="primary"
              size="small"
              edge="start"
              id={`limited-exemption-${applicationId}`}
              disabled={submitting}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            {formData.limitedExemption.value && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Exemption End"
                  inputFormat="DD/MM/YYYY"
                  disablePast
                  value={formData.exemptionEnd.value}
                  onChange={(date) => {
                    let valid = true;

                    if (!date || !date.isValid() || date.isBefore(new Date())) {
                      valid = false;
                    }

                    setFormData({
                      ...formData,
                      exemptionEnd: {
                        value: date,
                        valid: valid,
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={classes.exemptionEnd}
                      required={formData.limitedExemption.value}
                      {...params}
                    />
                  )}
                  disabled={submitting}
                  PopperProps={{ placement: "auto" }}
                />
              </LocalizationProvider>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              size="small"
              name="notes"
              InputLabelProps={{
                htmlFor: `notes-${applicationId}`,
              }}
              inputProps={{
                id: `notes-${applicationId}`,
              }}
              value={formData.notes.value}
              onChange={(event) => {
                const value = event.target.value;
                setFormData({
                  ...formData,
                  notes: {
                    value: value.trimStart(),
                  },
                });
              }}
              disabled={submitting}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="textPrimary">
              * denotes a required field
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Box component="div" sx={classes.submitActionContainer}>
          <Button
            onClick={handleOnSubmit}
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={!isFormValid() || submitting}
          >
            {submitting ? "Submitting" : "Submit"}
          </Button>
          {submitting && (
            <Box component="div" sx={classes.submitActionProgressContainer}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>

        <Button
          sx={{ "&:not(first-of-type)": { marginLeft: "8px" } }}
          onClick={onClose}
          variant="contained"
          disableElevation
          disabled={submitting}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ComplianceTableAcceptRiskDialog.propTypes = {
  /**
   * If `true` reveals the dialog, if `false` hides the dialog
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback for when the dialog is requesting to close
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback for when a user accepts the dialog, excepts a promise resolution as a result of the callback. **Signature:** `function(formData: object) => Promise`
   */
  onAccept: PropTypes.func.isRequired,
  /**
   * Array of application exemptions to process
   */
  exemptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["none", "pending", "active"]),
    })
  ).isRequired,
  /**
   * Unique application ID
   */
  applicationId: PropTypes.number.isRequired,
  /**
   * Callback to calculate the impact level, should return a value from a given impact and probability. **Signature:** `function(impact: int, probability: int) => enum[1, 2, 3] : int`
   */
  impactLevel: PropTypes.func.isRequired,
};
