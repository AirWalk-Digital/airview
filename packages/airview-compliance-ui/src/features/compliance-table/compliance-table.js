import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Skeleton from "@mui/lab/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { ComplianceTableToolbar } from "./compliance-table-toolbar";
import { ComplianceTableHead } from "./compliance-table-head";
import { ComplianceTableRow } from "./compliance-table-row";
import { ComplianceTableRowDetail } from "./compliance-table-row-detail";
import { Message } from "../../components";

function ComplianceTable({
  title,
  applications,
  onAcceptOfRisk,
  loading,
  noDataMessage,
  invalidPermissionsMessage,
}) {
  const theme = useTheme();

  const [ageOrder, setAgeOrder] = useState("desc");
  const [activeFilters, setActiveFilters] = useState([]);

  const getFiltersDerrivedFromApplicationData = (applications) => {
    if (!applications) return;

    const derrivedFilters = applications
      .map((application) => application.environment)
      .reduce((uniqueFilters, filter) => {
        return uniqueFilters.includes(filter)
          ? uniqueFilters
          : [...uniqueFilters, filter];
      }, [])
      .sort();

    return derrivedFilters;
  };

  const getApplicationsSortedByAge = (applications, sortBy) => {
    return [
      ...applications.sort((a, b) => {
        if (sortBy === "asc") {
          return Date.parse(b.raisedDateTime) - Date.parse(a.raisedDateTime);
        }
        if (sortBy === "desc") {
          return Date.parse(a.raisedDateTime) - Date.parse(b.raisedDateTime);
        }

        return 0;
      }),
    ];
  };

  const getApplicationsByFilterValues = (applications, filterValues) => {
    if (filterValues.length < 1) return applications;

    return applications.filter((application) =>
      filterValues.includes(application.environment)
    );
  };

  const handleOnSortByAgeClick = () => {
    if (ageOrder === "asc") {
      setAgeOrder("desc");
    } else {
      setAgeOrder("asc");
    }
  };

  const handleOnFilterChange = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((id) => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  const getTicketTimeData = (raisedDateTime) => {
    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "1 minute",
        mm: "%d minutes",
        h: "1 hour",
        hh: "%d hours",
        d: "1 day",
        dd: "%d days",
        M: "1 month",
        MM: "%d months",
        y: "1 year",
        yy: "%d years",
      },
    });

    const raisedDate = dayjs(raisedDateTime);
    const timeSinceRaised = raisedDate.from(dayjs(), true);

    return {
      raisedDate: raisedDate.format("MMM D YYYY - HH:mm"),
      timeSinceRaised,
    };
  };

  const getProcessedApplicationData = useMemo(() => {
    if (loading || !applications) return;

    return getApplicationsByFilterValues(
      getApplicationsSortedByAge(applications, ageOrder),
      activeFilters
    );
  }, [applications, activeFilters, ageOrder, loading]);

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

  const filters = getFiltersDerrivedFromApplicationData(applications);

  return (
    <TableContainer component={Paper}>
      <ComplianceTableToolbar
        activeFilters={activeFilters}
        onFilterChange={handleOnFilterChange}
        {...{ title, filters }}
      />
      <Table arial-label="Compliance table">
        <ComplianceTableHead
          onSortClick={handleOnSortByAgeClick}
          sortable={getProcessedApplicationData.length > 1}
          ageOrder={ageOrder}
        />

        <TableBody>
          {getProcessedApplicationData.map((application) => (
            <ComplianceTableRow
              key={application.id}
              {...application}
              {...getTicketTimeData(application.raisedDateTime)}
            >
              <ComplianceTableRowDetail
                detailData={application.applicationDetailData}
                applicationId={application.id}
                onAcceptOfRisk={onAcceptOfRisk}
              />
            </ComplianceTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ComplianceTable.propTypes = {
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
      qualityModel: PropTypes.oneOf([
        "log_excellence",
        "security",
        "reliability",
        "performance_efficiency",
        "cost_optimisation",
        "portability",
        "usability_and_compatibility",
      ]).isRequired,
      severity: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
      name: PropTypes.string.isRequired,
      tickets: PropTypes.arrayOf(
        PropTypes.shape({
          reference: PropTypes.string.isRequired,
          type: PropTypes.oneOf(["incident", "problem", "risk"]),
        })
      ).isRequired,
      raisedDateTime: (props, propName, componentName) => {
        if (isNaN(Date.parse(props[propName]))) {
          return new Error(
            "Invalid prop `" +
              propName +
              "` supplied to" +
              " `" +
              componentName +
              "`. Should be valid Date Time string."
          );
        }
      },
      environment: PropTypes.string.isRequired,
      applicationDetailData: PropTypes.shape({
        instances: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.oneOf(["none", "pending"]).isRequired,
          })
        ),
        control: PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
        frameworks: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
        environment: PropTypes.string,
        assignmentGroup: PropTypes.string,
        assignee: PropTypes.string,
        systemSource: PropTypes.string,
        systemStage: PropTypes.string,
      }),
    })
  ),
  /**
   * Callback for when a user accepts the risk dialog, excepts a promise resolution as a result of the callback. **Signature:** `function(formData: object) => Promise`
   */
  onAcceptOfRisk: PropTypes.func,
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

export { ComplianceTable };
