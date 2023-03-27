import React from "react";
import { FrameworkView } from "../../features/framework-view";
import { applicationsData } from "./framework-view-data";
import { Box } from "@mui/material";

export default {
  title: "Features/Framework View",
  component: FrameworkView,
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
  return <FrameworkView {...args} />;
}

Template.args = {
  title: "Audit & Assurance",
  noDataMessage: {
    title: "No Controls",
    message: "There are no controls to display for this application",
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

export const LoadedWithSingleControl = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: [applicationsData[0]],
  },
};

export const LoadedWithMultipleControls = {
  ...Template,
  args: {
    ...Template.args,
    loading: false,
    applications: applicationsData,
  },
};

export const LoadedWithNoControls = {
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
