import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  Skeleton,
} from "@mui/material";
import { FrameworkViewToolbar } from "./framework-view-toolbar";
import { FrameworkViewHeader } from "./framework-view-header";
import { FrameworkViewRow } from "./framework-view-row";
import { FrameworkViewRowDetail } from "./framework-view-row-detail";
import { Message } from "../../components";

export function FrameworkView({
  title,
  applications,
  loading,
  noDataMessage,
  invalidPermissionsMessage,
}) {
  const theme = useTheme();

  const getProcessedApplicationData = useMemo(() => {
    if (loading || !applications) return;

    return applications;
  }, [applications, loading]);

  if (loading) {
    return <Skeleton variant="rect" width="100%" height={200} />;
  }

  if (!applications) {
    return (
      <Message
        borderColor={theme.palette.primary.main}
        title={invalidPermissionsMessage.title}
        message={invalidPermissionsMessage.message}
      />
    );
  }

  if (applications.length < 1) {
    return (
      <Message
        borderColor={theme.palette.primary.main}
        title={noDataMessage.title}
        message={noDataMessage.message}
      />
    );
  }

  return (
    <TableContainer component={Paper}>
      <FrameworkViewToolbar {...{ title }} />

      <Table arial-label="Compliance table">
        <FrameworkViewHeader />

        <TableBody>
          {getProcessedApplicationData.map((application) => (
            <FrameworkViewRow key={application.id} {...application}>
              <FrameworkViewRowDetail
                detailData={application.applicationDetailData}
              />
            </FrameworkViewRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FrameworkView.propTypes = {
  /**
   * Presents the component in a lodaing state (for when fetching data async)
   */
  loading: PropTypes.bool,
  /**
   * An optional title for the table
   */
  title: PropTypes.string,
  /**
   * The collection of applications to render to the complianceTable, should be an array of applications, an empty array (for no issues) of null (for invalid permissions)
   */
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      controlID: PropTypes.string.isRequired,
      controlTitle: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      applicationDetailData: PropTypes.shape({
        detail: PropTypes.string,
        controlMappings: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            gap: PropTypes.string.isRequired,
          })
        ),
        Frequency: PropTypes.string,
      }),
    })
  ),
  /**
   * Used to display a message to the user when they do not have required permissions to view the application data
   */
  invalidPermissionsMessage: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * Used to display a message to the user when there is no data to display for the application
   */
  noDataMessage: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
