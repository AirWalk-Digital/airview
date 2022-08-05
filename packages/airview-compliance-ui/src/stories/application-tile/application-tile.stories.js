import React from "react";
import { userEvent, within } from "@storybook/testing-library";
import WarningIcon from "@mui/icons-material/Warning";
import { Typography, Box } from "@mui/material";
import {
  ApplicationTile,
  ApplicationTileHeader,
  ApplicationTileTitle,
  ApplicationTileDivider,
  ApplicationTileContent,
  ApplicationTileContentRow,
  ApplicationTileCallToActionButton,
  ApplicationTileChip,
} from "../../features/application-tile";
import { ProgressBar } from "../../features/progress-bar";
import docs from "./application-tile.docs.md";

export default {
  title: "Features/Application Tile",
  component: ApplicationTile,
  subcomponents: {
    ApplicationTileHeader,
    ApplicationTileTitle,
    ApplicationTileContent,
    ApplicationTileContentRow,
    ApplicationTileCallToActionButton,
    ApplicationTileChip,
  },
  parameters: {
    docs: {
      description: {
        component: docs,
      },
    },
    controls: false,
    layout: "padded",
  },
  decorators: [
    (story) => {
      const classes = {
        root: {
          width: "100%",
          maxWidth: 360,
          margin: "0 auto",
          flex: "1 1 auto",
        },
      };

      return <Box sx={classes.root}>{story()}</Box>;
    },
  ],
};

export const WithNoData = () => {
  return (
    <ApplicationTile>
      <ApplicationTileHeader
        leftContent={
          <ApplicationTileTitle>Application One</ApplicationTileTitle>
        }
        rightContent={
          <ApplicationTileCallToActionButton href="/" label="View" />
        }
      />
      <ApplicationTileContent>
        <ApplicationTileContentRow>
          <Typography align="center" variant="body2">
            You do not have the required permissions to view this data
          </Typography>
        </ApplicationTileContentRow>
      </ApplicationTileContent>
    </ApplicationTile>
  );
};

export const WithDataNotCollapsible = () => {
  return (
    <ApplicationTile>
      <ApplicationTileHeader
        leftContent={
          <ApplicationTileTitle>Application One</ApplicationTileTitle>
        }
        rightContent={
          <ApplicationTileCallToActionButton href="/" label="View" />
        }
      />

      <ApplicationTileContent>
        <ApplicationTileContentRow>
          <ApplicationTileTitle>Production</ApplicationTileTitle>

          <ApplicationTileContentRow inlineContent>
            <ApplicationTileChip
              tooltipLabel="Low Impact Resources"
              icon={<WarningIcon />}
              label="2"
              dense
              color="success.main"
            />

            <ApplicationTileChip
              tooltipLabel="Medium Impact Resources"
              icon={<WarningIcon />}
              label="2"
              dense
              color="warning.main"
            />

            <ApplicationTileChip
              tooltipLabel="High Impact Resources"
              icon={<WarningIcon />}
              label="2"
              dense
              color="error.main"
            />

            <ApplicationTileChip
              tooltipLabel="Exempt Resources"
              icon={<WarningIcon />}
              label="2"
              dense
              color="grey.800"
            />
          </ApplicationTileContentRow>

          <ProgressBar value={80} color="#2e7d32" />
        </ApplicationTileContentRow>
      </ApplicationTileContent>
    </ApplicationTile>
  );
};

export const WithDataCollapsed = () => {
  return (
    <ApplicationTile>
      <ApplicationTileHeader
        leftContent={
          <ApplicationTileTitle>Application One</ApplicationTileTitle>
        }
        rightContent={
          <ApplicationTileCallToActionButton href="/" label="View" />
        }
      />

      <ApplicationTileContent>
        <ApplicationTileContentRow>
          <ApplicationTileTitle size="small" level="h3">
            Production
          </ApplicationTileTitle>

          <ProgressBar value={80} color="#2e7d32" />

          <ApplicationTileTitle size="small" level="h3">
            UAT
          </ApplicationTileTitle>

          <ProgressBar value={40} color="#1976d2" />

          <ApplicationTileTitle size="small" level="h3">
            Development
          </ApplicationTileTitle>

          <ProgressBar value={65} color="#d32f2f" />
        </ApplicationTileContentRow>
      </ApplicationTileContent>

      <ApplicationTileDivider />

      <ApplicationTileContent collapsible initialCollapsed={true}>
        <ApplicationTile gutter>
          <ApplicationTileHeader
            dense
            leftContent={
              <ApplicationTileTitle level="h4">Production</ApplicationTileTitle>
            }
          />

          <ApplicationTileContent>
            <ApplicationTileContentRow inlineContent>
              <ApplicationTileChip
                tooltipLabel="Low Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="success.main"
              />

              <ApplicationTileChip
                tooltipLabel="Medium Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="warning.main"
              />

              <ApplicationTileChip
                tooltipLabel="High Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="error.main"
              />

              <ApplicationTileChip
                tooltipLabel="Exempt Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="grey.800"
              />
            </ApplicationTileContentRow>
          </ApplicationTileContent>
        </ApplicationTile>

        <ApplicationTile gutter>
          <ApplicationTileHeader
            dense
            leftContent={
              <ApplicationTileTitle level="h4">UAT</ApplicationTileTitle>
            }
          />

          <ApplicationTileContent>
            <ApplicationTileContentRow inlineContent>
              <ApplicationTileChip
                tooltipLabel="Low Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="success.main"
              />

              <ApplicationTileChip
                tooltipLabel="Medium Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="warning.main"
              />

              <ApplicationTileChip
                tooltipLabel="High Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="error.main"
              />

              <ApplicationTileChip
                tooltipLabel="Exempt Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="grey.800"
              />
            </ApplicationTileContentRow>
          </ApplicationTileContent>
        </ApplicationTile>

        <ApplicationTile>
          <ApplicationTileHeader
            dense
            leftContent={
              <ApplicationTileTitle level="h4">
                Development
              </ApplicationTileTitle>
            }
          />

          <ApplicationTileContent>
            <ApplicationTileContentRow inlineContent>
              <ApplicationTileChip
                tooltipLabel="Low Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="success.main"
              />

              <ApplicationTileChip
                tooltipLabel="Medium Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="warning.main"
              />

              <ApplicationTileChip
                tooltipLabel="High Impact Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="error.main"
              />

              <ApplicationTileChip
                tooltipLabel="Exempt Resources"
                icon={<WarningIcon />}
                label="2"
                dense
                color="grey.800"
              />
            </ApplicationTileContentRow>
          </ApplicationTileContent>
        </ApplicationTile>
      </ApplicationTileContent>
    </ApplicationTile>
  );
};

export const WithDataExpanded = WithDataCollapsed.bind({});

WithDataExpanded.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByRole("button", { name: /expand content/i })
  );
};
