import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { getRisk } from "./get-risk";
import { complianceTableRowDetailStyles } from "./compliance-table-row-detail.styles";
import { ComplianceTableAcceptRiskDialog } from "./compliance-table-accept-risk-dialog";

const useComplianceTableRowDetailStyles = makeStyles((theme) =>
  complianceTableRowDetailStyles(theme)
);

function ComplianceTableRowDetail({
  detailData,
  onAcceptOfRisk,
  applicationId,
}) {
  const classes = useComplianceTableRowDetailStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOnClose = () => setDialogOpen(false);

  const actionableRisks = useMemo(() => {
    return detailData.instances.filter((instance) => instance.status === "none")
      .length;
  }, [detailData]);

  return (
    <React.Fragment>
      <div
        className={classes.additionalInfoContainer}
        aria-label="Additional data"
      >
        <ul className={classes.instanceInfo}>
          <li className={classes.instanceInfoItem}>
            <span>Resources:</span>
            <ul className={classes.instances}>
              {detailData.instances.map((instance) => (
                <li
                  key={instance.id}
                  className={clsx(
                    classes.instanceItem,
                    instance.status === "pending"
                      ? classes.pendingInstance
                      : null
                  )}
                >
                  {instance.name}
                  {instance.status === "pending" && " (pending)"}
                </li>
              ))}
            </ul>
          </li>

          <li className={classes.instanceInfoItem}>
            <span>Control:</span>
            <span className={classes.control}>
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
            </span>
          </li>

          <li className={classes.instanceInfoItem}>
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
          </li>

          <li className={classes.instanceInfoItem}>
            <span>Assignment Group:</span>
            <span>{detailData.assignmentGroup}</span>
          </li>

          <li className={classes.instanceInfoItem}>
            <span>Assignee:</span>
            <span>{detailData.assignee}</span>
          </li>

          <li className={classes.instanceInfoItem}>
            <span>System Source:</span>
            <span>{detailData.systemSource}</span>
          </li>

          <li className={classes.instanceInfoItem}>
            <span>System Stage:</span>
            <span>{detailData.systemStage}</span>
          </li>
        </ul>

        <div className={classes.instanceActions}>
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
        </div>
      </div>
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
