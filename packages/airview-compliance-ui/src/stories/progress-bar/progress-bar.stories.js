import React from "react";
import { ProgressBar } from "../../features/progress-bar";
import { Box } from "@mui/material";

export default {
  title: "Features/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    ariaLabel: {
      control: false,
    },
    classNames: {
      control: false,
    },
    color: {
      control: {
        type: "color",
      },
    },
    value: {
      control: {
        type: "number",
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
  decorators: [
    (story) => {
      const classes = {
        root: {
          width: "100%",
          maxWidth: 1024,
          margin: "0 auto",
          flex: 1,
        },
      };

      return <Box sx={classes.root}>{story()}</Box>;
    },
  ],
};

function Template(args) {
  return <ProgressBar {...args} />;
}

export const Default = {
  ...Template,
  args: {
    ...Template.args,
    value: 33,
  },
};

export const WithoutLabel = {
  ...Template,
  args: {
    ...Template.args,
    value: 33,
    showLabel: false,
  },
};

export const Determinate = {
  ...Template,
  args: {
    ...Template.args,
    value: 33,
    variant: "determinate",
  },
};

export const Indeterminate = {
  ...Template,
  args: {
    ...Template.args,
    variant: "indeterminate",
    showLabel: false,
  },
};
