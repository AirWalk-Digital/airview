import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  ButtonBase,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function TopBar() {
  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "grey.100",
        borderBottom: 1,
        borderColor: "grey.300",
      }}
    >
      <Toolbar disableGutters>
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
            <ButtonBase
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 66,
                width: 64,
                marginRight: (theme) => theme.spacing(2),
                marginTop: "-2px",
                marginBottom: "-2px",
                border: 0,
                bgcolor: "primary.main",
                color: "common.white",
              }}
            >
              <MenuIcon />
            </ButtonBase>
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{ color: "primary.main", lineHeight: 1 }}
              >
                Airview CMS
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: "text.primary",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                Version: 0.10
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: "0 1 auto",
              marginRight: (theme) => theme.spacing(3),
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
    </AppBar>
  );
}
