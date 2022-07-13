import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { getRisk } from "./get-risk";
import { complianceTableRowDetailStyles } from "./compliance-table-row-detail.styles";
import { ComplianceTableAcceptRiskDialog } from "./compliance-table-accept-risk-dialog";

function ComplianceTableRowDetail({
  detailData,
  onAcceptOfRisk,
  applicationId,
}) {
  const classes = complianceTableRowDetailStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOnClose = () => setDialogOpen(false);

  const actionableRisks = useMemo(() => {
    return detailData.instances.filter((instance) => instance.status === "none")
      .length;
  }, [detailData]);

  return (
    <React.Fragment>
      <Box sx={classes.additionalInfoContainer} aria-label="Additional data">
        <Box component="ul" sx={classes.instanceInfo}>
          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Resources:</span>
            <Box component="ul" sx={classes.instances}>
              {detailData.instances.map((instance) => (
                <Box
                  component="li"
                  key={instance.id}
                  sx={[
                    classes.instanceItem,
                    instance.status === "pending" && classes.pendingInstance,
                  ]}
                >
                  {instance.name}
                  {instance.status === "pending" && " (pending)"}
                </Box>
              ))}
            </Box>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Control:</span>
            <Box component="span" sx={classes.control}>
              {detailData.control.name}
              <Button
                size="small"
                variant="outlined"
                href={detailData.control.url}
                color="primary"
                endIcon={<OpenInNewIcon />}
              >
                View
              </Button>
            </Box>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Frameworks:</span>
            <span>
              {detailData.frameworks?.map((framework, index) => {
                return (
                  <Button
                    size="small"
                    variant="outlined"
                    href={framework.url}
                    color="primary"
                    endIcon={<OpenInNewIcon />}
                    key={index}
                  >
                    {framework.name}
                  </Button>
                );
              })}
            </span>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Assignment Group:</span>
            <span>{detailData.assignmentGroup}</span>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>Assignee:</span>
            <span>{detailData.assignee}</span>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>System Source:</span>
            <span>{detailData.systemSource}</span>
          </Box>

          <Box component="li" sx={classes.instanceInfoItem}>
            <span>System Stage:</span>
            <span>{detailData.systemStage}</span>
          </Box>
        </Box>

        <Box component="div" sx={classes.instanceActions}>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            color="primary"
            size="small"
            onClick={() => setDialogOpen(true)}
            disabled={!actionableRisks}
          >
            Accept Risk
          </Button>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            color="primary"
            size="small"
          >
            Create Problem
          </Button>
        </Box>
      </Box>
      <ComplianceTableAcceptRiskDialog
        open={dialogOpen}
        onClose={handleOnClose}
        onAccept={onAcceptOfRisk}
        exemptions={detailData.instances}
        applicationId={applicationId}
        impactLevel={getRisk}
      />
    </React.Fragment>
  );
}

ComplianceTableRowDetail.propTypes = {
  detailData: PropTypes.object.isRequired,
  onAcceptOfRisk: PropTypes.func.isRequired,
  applicationId: PropTypes.number.isRequired,
};

export { ComplianceTableRowDetail };
