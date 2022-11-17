import React from "react";
import { DocumentActions } from "../../features";
//import Documentation from "./page-title.doc.md";

export default {
  title: "Components/Document Actions",
  component: DocumentActions,
  parameters: {
    layout: "centered",
    // docs: {
    //   description: {
    //     component: Documentation,
    //   },
    // },
  },
};

const Template = (args) => <DocumentActions {...args} />;

Template.args = {
  menuTitle: "Document Actions",
  menuTitleElement: "h3",
  collapsible: true,
  initialCollapsed: false,
  loading: false,
  fetching: false,
  srcURL: "/",
};

Template.argTypes = {
  linkComponent: {
    control: false,
  },
  sx: {
    control: false,
  },
};

export const Loading = Template.bind({});

Loading.args = {
  ...Template.args,
  loading: true,
};

Loading.argTypes = {
  ...Template.argTypes,
};

export const Fetching = Template.bind({});

Fetching.args = {
  ...Template.args,
  fetching: true,
};

Fetching.argTypes = {
  ...Template.argTypes,
};

export const Loaded = Template.bind({});

Loaded.args = {
  ...Template.args,
};

Loaded.argTypes = {
  ...Template.argTypes,
};

export const WithPDFDownloadLoading = Template.bind({});
WithPDFDownloadLoading.args = {
  ...Template.args,
  downloadStatus: "loading",
};

export const WithPDFDownloadError = Template.bind({});
WithPDFDownloadError.args = {
  ...Template.args,
  downloadStatus: "error",
};
