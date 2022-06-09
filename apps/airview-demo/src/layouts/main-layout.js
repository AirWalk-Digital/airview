import React from "react";
import { Box } from "@mui/material";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer } from "airview-ui";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const viewportOffset = useCMSViewportOffset();

  return (
    <div>
      <TopBar
        onMenuButtonClick={() => {}}
        title="AirviewCMS Demo"
        position="fixed"
        top={viewportOffset}
      />
      {/* <NavigationDrawer /> */}
      <Box sx={{ marginTop: `${viewportOffset + 64}px` }}>
        <Outlet />
      </Box>
    </div>
  );
}
