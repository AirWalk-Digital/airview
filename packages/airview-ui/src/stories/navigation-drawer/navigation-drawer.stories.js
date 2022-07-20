import React from "react";
import { NavigationDrawer } from "../../features";
import Documentation from "./navigation-drawer.doc.md";

export default {
  title: "Components/Navigation Drawer",
  component: NavigationDrawer,
  parameters: {
    docs: {
      // Opt-out of inline rendering
      inlineStories: false,
      description: {
        component: Documentation,
      },
    },
  },
};

const Template = (args) => {
  return <NavigationDrawer {...args} />;
};

Template.args = {
  open: false,
  children: <span>Navigation Drawer Children</span>,
};

Template.argTypes = {
  top: {
    control: false,
  },
  children: {
    control: false,
  },
  drawerWidth: {
    control: false,
  },
};

export const Closed = Template.bind({});

Closed.args = {
  ...Template.args,
};

Closed.argTypes = {
  ...Template.argTypes,
};

export const Open = Template.bind({});

Open.args = {
  ...Template.args,
  open: true,
};

Open.argTypes = {
  ...Template.argTypes,
};
