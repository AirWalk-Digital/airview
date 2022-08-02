import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ProgressBar } from "../../features/progress-bar";

export default {
  title: "Features/ProgressBar",
  component: ProgressBar,
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
      const classes = makeStyles(() => ({
        "@global": {
          "#root": {
            flex: 1,
          },
        },
        root: {
          width: "100%",
          maxWidth: 1024,
          margin: "0 auto",
          flex: 1,
        },
      }))();

      return <div className={classes.root}>{story()}</div>;
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
