import React from "react";
import { IconChip } from "../../features/icon-chip";
import WarningIcon from "@mui/icons-material/Warning";

export default {
  title: "Features/IconChip",
  component: IconChip,
  argTypes: {
    icon: {
      control: false,
    },
    color: {
      control: {
        type: "color",
      },
    },
    labelColor: {
      control: {
        type: "color",
      },
    },
  },
};

function Template(args) {
  return <IconChip {...args} />;
}

Template.args = {
  icon: <WarningIcon />,
  label: "Chip Label",
  color: "#000",
  labelColor: "#fff",
  dense: false,
};

export const Default = {
  ...Template,
};

export const Dense = {
  ...Template,
  args: {
    ...Template.args,
    dense: true,
  },
};
