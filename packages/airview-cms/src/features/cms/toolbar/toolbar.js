import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { version } from "@package";
import { BranchSwitcher } from "./branch-switcher";
import { TOOL_BAR_HEIGHT } from "./constants";
import { SaveChanges } from "./save-changes";
import { CreateNewContent } from "./create-new-content";
import { DisableCms } from "./disable-cms";
import { CreateBranch } from "./create-branch";
import { CreatePullRequest } from "./create-pull-request";
import { ClearChanges } from "./clear-changes";
import { ToggleMetaEditor } from "./toggle-meta-editor";

export function ToolBar() {
  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: 0,
        borderBottom: 1,
        borderBottomColor: "grey.300",
        height: `${TOOL_BAR_HEIGHT}px`,

        "@media print": {
          display: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          borderBottom: 1,
          borderBottomColor: "grey.300",
          bgcolor: "grey.50",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  color: "primary.main",
                  lineHeight: 1,
                }}
              >
                Airview CMS
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: "text.primary",
                  display: "block",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  fontSize: 11,
                  fontWeight: "medium",
                }}
              >
                Version: {version}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: "0 1 auto",
              "& > .MuiButton-root": {
                marginLeft: (theme) => theme.spacing(2),
              },
            }}
          >
            <CreateNewContent />
            <DisableCms />
          </Box>
        </Box>
      </Toolbar>
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: "common.white",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: "0 1 auto",
          }}
        >
          <BranchSwitcher />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "flex-end",
            "& > .MuiButton-root": {
              marginLeft: 1,
            },
          }}
        >
          <CreateBranch />
          <CreatePullRequest />
          <ClearChanges />
          <SaveChanges />
          <Box
            sx={{
              marginLeft: 1,
              paddingLeft: 1,
              borderLeft: 1,
              borderColor: "grey.300",
            }}
          >
            <ToggleMetaEditor />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
