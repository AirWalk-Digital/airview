import React from "react";
import { TopBar } from "../features";

export default {
  title: "Components/Top Bar",
  component: TopBar,
  parameters: {
    docs: {
      // Opt-out of inline rendering
      inlineStories: false,
    },
  },
};

const Template = (args) => <TopBar {...args} />;

Template.args = {
  title: "Navigation Bar",
  navOpen: false,
};

Template.argTypes = {
  position: {
    control: false,
  },
  top: {
    control: false,
  },
  color: {
    control: false,
  },
};

export const NavClosed = Template.bind({});

NavClosed.args = {
  ...Template.args,
};

NavClosed.argTypes = {
  ...Template.argTypes,
};

export const NavOpen = Template.bind({});

NavOpen.args = {
  ...Template.args,
  navOpen: true,
};

NavOpen.argTypes = {
  ...Template.argTypes,
};
