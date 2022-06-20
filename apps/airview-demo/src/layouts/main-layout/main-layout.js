import React, { useState } from "react";
import { Box } from "@mui/material";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer } from "airview-ui";
import { Outlet } from "react-router-dom";
import { NavigationItems } from "./navigation-items";

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
      />
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
