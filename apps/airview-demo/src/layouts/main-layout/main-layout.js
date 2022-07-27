import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer } from "airview-ui";
import { Outlet } from "react-router-dom";
import { NavigationItems } from "./navigation-items";
import logo from "./logo.svg";

const Logo = styled("img")({
  display: "block",
  width: "auto",
  height: 30,
});

export function MainLayout() {
  const [navOpen, setNavOpen] = useState(true);
  const viewportOffset = useCMSViewportOffset();
  const topBarHeight = 64;

  return (
    <div>
      <TopBar
        onNavButtonClick={() => setNavOpen((prevState) => !prevState)}
        title="AirviewCMS Demo"
        position="fixed"
        top={viewportOffset}
        {...{ navOpen }}
      >
        <Logo src={logo} alt="Logo alt text" />
      </TopBar>
      <NavigationDrawer top={viewportOffset + topBarHeight} open={navOpen}>
        <NavigationItems />
      </NavigationDrawer>

      <Box
        sx={{
          marginTop: `${viewportOffset + topBarHeight}px`,
          paddingLeft: navOpen ? "300px" : 0,
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}
