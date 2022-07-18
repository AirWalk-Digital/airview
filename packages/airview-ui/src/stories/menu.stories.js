import React from "react";
import { Menu } from "../features";

export default {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      );
    },
  ],
};

const menuItems = [
  {
    groupTitle: "Menu Group Title One",
    links: [
      {
        label: "Menu Item One",
        url: "",
      },
      {
        label: "Menu Item Two",
        url: "",
      },
    ],
  },
  {
    groupTitle: "Menu Group Title Two",
    links: [
      {
        label: "Menu Item One",
        url: "",
      },
      {
        label: "Menu Item Two",
        url: "",
      },
    ],
  },
];

const Template = (args) => {
  return <Menu {...args} />;
};

Template.args = {
  menuTitle: "Navigation",
  loading: false,
  fetching: false,
  menuItems: [...menuItems],
  collapsible: true,
  initialCollapsed: false,
  menuTitleElement: "h3",
};

Template.argTypes = {
  linkComponent: {
    control: false,
  },
  currentRoute: {
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
