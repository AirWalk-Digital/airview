import React from "react";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { version } from "@package";
import { BranchSwitcher } from "./branch-switcher";
import { enableBranchCreatorModal } from "../branch-creator";

export function ToolBar() {
  const dispatch = useDispatch();

  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: 0,
        borderBottom: 1,
        borderColor: "grey.300",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "grey.300",
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
            <Button variant="contained" disableElevation size="small">
              Create New
            </Button>
            <Button variant="contained" disableElevation size="small">
              Exit
            </Button>
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
              marginLeft: (theme) => theme.spacing(1),
            },
          }}
        >
          <Button variant="text" size="small">
            Show Meta
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => dispatch(enableBranchCreatorModal())}
          >
            Create Branch
          </Button>
          <Button variant="text" size="small">
            Create Pull Request
          </Button>
          <Button variant="text" size="small" color="error">
            Clear Changes
          </Button>
          <Button variant="text" size="small">
            Save Changes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
