import React from "react";
import {
  ControlOverview,
  useControlOverviewController,
} from "../../features/control-overview";
import docs from "./control-overview.docs.md";
import { groups, controls, resources } from "./data";
import { Box } from "@mui/material";

export default {
  title: "Features/Control Overview",
  component: ControlOverview,
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
  parameters: {
    docs: {
      description: {
        component: docs,
      },
    },
    layout: "padded",
  },
};

export const WithControls = () => {
  const [state, setControlsData, setResourcesData] =
    useControlOverviewController(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(groups);
        }, [500]);
      });
    }, 1);

  const handleOnRequestOfControlsData = (id) => {
    setControlsData(id, () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (id === 3) resolve("error");

          resolve(controls[id]);
        }, [500]);
      });
    });
  };

  const handleOnRequestOfResourcesData = (id) => {
    setResourcesData(id, () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (id === 3) resolve("error");

          resolve(resources[id]);
        }, [500]);
      });
    });
  };

  const handleOnResourceExemptionDelete = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, [1000]);
    });
  };

  const handleOnResourceExemptionSave = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, [1000]);
    });
  };

  return (
    <ControlOverview
      title="Control Overview"
      data={state}
      onRequestOfControlsData={handleOnRequestOfControlsData}
      onRequestOfResourcesData={handleOnRequestOfResourcesData}
      onResourceExemptionDelete={handleOnResourceExemptionDelete}
      onResourceExemptionSave={handleOnResourceExemptionSave}
    />
  );
};

export const WithNoControls = () => {
  const data = {
    groups: [],
    controls: undefined,
    resources: undefined,
  };

  return (
    <ControlOverview
      title="Control Overview"
      data={data}
      onRequestOfControlsData={() => {}}
      onRequestOfResourcesData={() => {}}
    />
  );
};

export const WithError = () => {
  const data = {
    groups: "error",
    controls: undefined,
    resources: undefined,
  };

  return (
    <ControlOverview
      title="Control Overview"
      data={data}
      onRequestOfControlsData={() => {}}
      onRequestOfResourcesData={() => {}}
    />
  );
};

export const WithoutRequiredPermissions = () => {
  const data = {
    groups: null,
    controls: undefined,
    resources: undefined,
  };

  return (
    <ControlOverview
      title="Control Overview"
      data={data}
      onRequestOfControlsData={() => {}}
      onRequestOfResourcesData={() => {}}
    />
  );
};

export const Loading = () => {
  const data = {
    groups: undefined,
    controls: undefined,
    resources: undefined,
  };

  return (
    <ControlOverview
      title="Control Overview"
      data={data}
      loading={true}
      onRequestOfControlsData={() => {}}
      onRequestOfResourcesData={() => {}}
    />
  );
};
