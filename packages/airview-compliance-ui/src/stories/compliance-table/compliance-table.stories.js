import React from "react";
import { ComplianceTable } from "../../features/compliance-table";
import { applicationsData } from "./applications-data";
import { Box } from "@mui/material";

export default {
  title: "Features/Compliance Table",
  component: ComplianceTable,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (story) => {
      return (
        <Box sx={{ width: "100%", maxWidth: 1024, margin: "0 auto" }}>
          {story()}
        </Box>
      );
    },
  ],
};

function Template(args) {
  return <ComplianceTable {...args} />;
}

Template.args = {
  title: "Compliance Table",
  noDataMessage: {
    title: "No issues",
    message: "There are no issues to display for this application",
  },
  invalidPermissionsMessage: {
    title: "Notice",
    message:
      "You do not have the required permissions to view the data for this application",
  },
};

export const Loading = {
  ...Template,
  args: {
    ...Template.args,
    loading: true,
    applications: [],
  },
};

export const LoadedWithSingleIssue = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: [applicationsData[0]],
  },
};

export const LoadedWithMultipleIssues = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: applicationsData,
  },
};

export const LoadedWithNoIssues = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: [],
  },
};

export const WithoutRequiredPermissions = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: null,
  },
};

/*

WithIssues
WithoutIssues
WithoutRequiredPermissions
*/
