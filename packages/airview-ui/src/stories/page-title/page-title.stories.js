import React from "react";
import { PageTitle } from "../../features";
import Documentation from "./page-title.doc.md";

export default {
  title: "Components/Page Title",
  component: PageTitle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

const Template = (args) => <PageTitle {...args} sx={{ minWidth: 550 }} />;

Template.args = {
  title: "Lorem ipsum dolor sit amet consectetur",
  loading: false,
  fetching: false,
  component: "h1",
};

Template.argTypes = {
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
