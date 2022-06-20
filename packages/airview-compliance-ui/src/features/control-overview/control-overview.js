import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { ControlOverviewHeader } from "./control-overview-header";
import { ControlOverviewGroup } from "./control-overview-group";
import { ControlOverviewItem } from "./control-overview-item";
import { Message } from "../message";
import { ControlOverviewItemDetail } from "./control-overview-item-detail";
import { ControlOverviewItemResources } from "./control-overview-item-resources";
import { ControlOverviewLoadingIndicator } from "./control-overview-loading-indicator";
import { ControlOverviewResourceManager } from "./control-overview-resource-manager";
import { ControlOverviewResourceEvidenceViewer } from "./control-overview-resource-evidence-viewer";

export function ControlOverview({
  loading,
  title,
  data,
  onRequestOfControlsData,
  onRequestOfResourcesData,
  onResourceExemptionDelete,
  onResourceExemptionSave,
}) {
  const theme = useTheme();

  const initialResourceManagerStatus = {
    open: false,
    controlId: null,
    resourceId: null,
  };

  const initialResourceEvidenceStatus = {
    open: false,
    controlId: null,
    resourceId: null,
  };

  const [exemptionManagerStatus, setExemptionManagerStatus] = useState({
    ...initialResourceManagerStatus,
  });

  const [resourceEvidenceStatus, setResourceEvidenceStatus] = useState({
    ...initialResourceEvidenceStatus,
  });

  const errorMessageFeedback = (
    <Message
      title="Error"
      message="There was an error attempting to load controls for this application"
      borderColor={theme.palette.error.main}
    />
  );

  const noIssuesMessageFeedback = (
    <Message
      title="No Controls"
      message="There are no controls to display for this application"
      borderColor={theme.palette.primary.main}
    />
  );

  const invalidPermissionsMessageFeedback = (
    <Message
      title="Permisions Notice"
      message="You do not have the required permissions to view controls for this application"
      borderColor={theme.palette.primary.main}
    />
  );

  const handleOnManageResourceClick = (controlId, resourceId) => {
    setExemptionManagerStatus({
      open: true,
      controlId,
      resourceId,
    });
  };

  const handleOnResourceManagerClose = () => {
    setExemptionManagerStatus({ ...initialResourceManagerStatus });
  };

  const resourceManagerData = useMemo(() => {
    if (!exemptionManagerStatus.open) return null;

    const resourcesData =
      data.resources[exemptionManagerStatus.controlId].filter(
        (resource) => resource.id === exemptionManagerStatus.resourceId
      )[0]?.exemptionData ?? null;

    if (resourcesData) {
      resourcesData.controlId = exemptionManagerStatus.controlId;
      resourcesData.resourceId = exemptionManagerStatus.resourceId;
    }

    return resourcesData;
  }, [data, exemptionManagerStatus]);

  const handleOnViewResourceEvidenceClick = (controlId, resourceId) => {
    setResourceEvidenceStatus({
      open: true,
      controlId,
      resourceId,
    });
  };

  const handleOnViewResourceEvidenceClose = () => {
    setResourceEvidenceStatus({ ...initialResourceEvidenceStatus });
  };

  const resourceEvidenceData = useMemo(() => {
    if (!resourceEvidenceStatus.open) return null;

    return (
      data.resources[resourceEvidenceStatus.controlId].filter(
        (resource) => resource.id === resourceEvidenceStatus.resourceId
      )[0].evidence ?? null
    );
  }, [data, resourceEvidenceStatus]);

  if (loading) {
    return <Skeleton variant="rect" width="100%" height={200} />;
  }

  if (!data || data.groups === "loading") {
    return <ControlOverviewLoadingIndicator padding />;
  }

  if (!data.groups) {
    return invalidPermissionsMessageFeedback;
  }

  if (data.groups === "error") return errorMessageFeedback;

  if (Array.isArray(data.groups)) {
    if (data.groups.length < 1) return noIssuesMessageFeedback;

    return (
      <React.Fragment>
        <Paper elevation={1}>
          <ControlOverviewHeader title={title} />

          {data.groups.map((group) => {
            return (
              <ControlOverviewGroup
                groupTitle={group.title}
                id={group.id}
                onChange={onRequestOfControlsData}
                key={group.id}
              >
                {(() => {
                  if (
                    !data.controls ||
                    !data.controls[group.id] ||
                    data.controls[group.id] === "loading"
                  ) {
                    return <ControlOverviewLoadingIndicator padding />;
                  }

                  if (data.controls[group.id] === "error") {
                    return (
                      <Box padding={2}>
                        <Message
                          title="Error"
                          message="There was an error attempting to fetch controls for this group"
                          borderColor={theme.palette.error.main}
                        />
                      </Box>
                    );
                  }

                  if (Array.isArray(data.controls[group.id])) {
                    if (data.controls[group.id].length < 1) {
                      return (
                        <Box padding={2}>
                          <Message
                            title="No Controls"
                            message="There are no controls to display for this group"
                            borderColor={theme.palette.primary.main}
                          />
                        </Box>
                      );
                    }

                    return data.controls[group.id]?.map((control) => {
                      return (
                        <ControlOverviewItem
                          id={control.id}
                          name={control.name}
                          severity={control.severity}
                          applied={control.applied}
                          exempt={control.exempt}
                          onChange={onRequestOfResourcesData}
                          key={control.id}
                        >
                          <ControlOverviewItemDetail
                            control={control.control}
                            frameworks={control.frameworks}
                            controlAction={control.controlAction}
                            lifecycle={control.lifecycle}
                          />

                          {(() => {
                            if (
                              !data.resources ||
                              !data.resources[control.id] ||
                              data.resources[control.id] === "loading"
                            ) {
                              return <ControlOverviewLoadingIndicator />;
                            }

                            if (data.resources[control.id] === "error") {
                              return (
                                <Box paddingTop={1}>
                                  <Message
                                    title="Error"
                                    message="There was an error attempting to fetch resources for this control"
                                    borderColor={theme.palette.error.main}
                                  />
                                </Box>
                              );
                            }

                            if (Array.isArray(data.resources[control.id])) {
                              if (data.resources[control.id].length < 1) {
                                return (
                                  <Box paddingTop={1}>
                                    <Message
                                      title="No Resources"
                                      message="There are no resources to display for this control"
                                      borderColor={theme.palette.primary.main}
                                    />
                                  </Box>
                                );
                              }

                              return (
                                <ControlOverviewItemResources
                                  controlId={control.id}
                                  resourcesData={data.resources[control.id]}
                                  onManageResourceClick={(resourceId) => {
                                    handleOnManageResourceClick(
                                      control.id,
                                      resourceId
                                    );
                                  }}
                                  onViewResourceEvidence={(resourceId) => {
                                    handleOnViewResourceEvidenceClick(
                                      control.id,
                                      resourceId
                                    );
                                  }}
                                />
                              );
                            }
                          })()}
                        </ControlOverviewItem>
                      );
                    });
                  }
                })()}
              </ControlOverviewGroup>
            );
          })}
        </Paper>

        <ControlOverviewResourceManager
          open={exemptionManagerStatus.open}
          onClose={handleOnResourceManagerClose}
          resourceData={resourceManagerData}
          {...{ onResourceExemptionDelete, onResourceExemptionSave }}
        />

        <ControlOverviewResourceEvidenceViewer
          open={resourceEvidenceStatus.open}
          onClose={handleOnViewResourceEvidenceClose}
          resourceEvidenceData={resourceEvidenceData}
        />
      </React.Fragment>
    );
  }
}

ControlOverview.propTypes = {
  /**
   * Sets the component to render in a loading state
   */
  loading: PropTypes.bool,
  /**
   * Sets the title for the component
   */
  title: PropTypes.string,
  /**
   * Sets the required data to render the component UI
   */
  data: PropTypes.shape({
    groups: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        })
      ),
      PropTypes.oneOf(["error", "loading"]),
    ]),

    controls: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            severity: PropTypes.oneOf(["Low", "Medium", "High"]),
            applied: PropTypes.number,
            exempt: PropTypes.number,
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
            qualityModel: PropTypes.string,
            lifecycle: PropTypes.string,
          })
        ),
        PropTypes.oneOf(["error", "loading"]),
      ])
    ),

    resources: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string,
            reference: PropTypes.string,
            environment: PropTypes.string,
            lastSeen: PropTypes.string,
            status: PropTypes.oneOf(["Monitoring", "Non-Compliant", "Exempt"]),
            pending: PropTypes.bool,
            exemptionData: PropTypes.shape({
              ticket: PropTypes.string.isRequired,
              expires: PropTypes.string.isRequired,
              resources: PropTypes.arrayOf(PropTypes.string).isRequired,
            }),
          })
        ),
        PropTypes.oneOf(["error", "loading"]),
      ])
    ),
  }),
  /**
   * Callback for when a user expands a control group and a request is made to fetch the controls for that group. **Signature:** `function(groupId: int) => void`
   */
  onRequestOfControlsData: PropTypes.func,
  /**
   * Callback for when a user expands a control within a given group and a request is made to fetch the resource data for that control. **Signature:** `function(controlId: int) => void`
   */
  onRequestOfResourcesData: PropTypes.func,
  /**
   * Callback for when a user requests to delete a specific resource exemption. **Signature:** `function({controlId: Int, resourceId: Int}): Promise`
   */
  onResourceExemptionDelete: PropTypes.func,
  /**
   * Callback for when a user requests to change the date of a specific resource exemption. **Signature:** `function({controlId: Int, resourceId: Int, revisedExpiryDate: ISO Date String}): Promise`
   */
  onResourceExemptionSave: PropTypes.func,
};
