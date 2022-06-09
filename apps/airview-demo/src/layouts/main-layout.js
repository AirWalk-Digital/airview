import React, { useState } from "react";
import { Box } from "@mui/material";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer } from "airview-ui";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const viewportOffset = useCMSViewportOffset();
  const topBarHeight = 64;

  return (
    <div>
      <TopBar
        onMenuButtonClick={() => setNavOpen((prevState) => !prevState)}
        title="AirviewCMS Demo"
        position="fixed"
        top={viewportOffset}
      />
      <NavigationDrawer top={viewportOffset + topBarHeight} open={navOpen} />
      <Box sx={{ marginTop: `${viewportOffset + topBarHeight}px` }}>
        <Outlet />
      </Box>
    </div>
  );
}
