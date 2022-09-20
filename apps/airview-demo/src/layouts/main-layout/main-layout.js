import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer } from "airview-ui";
import { Outlet } from "react-router-dom";
import { NavigationItems } from "./navigation-items";
import { Search } from "./search";
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div>
      <Search open={searchOpen} onRequestToClose={() => setSearchOpen(false)} />
      <TopBar
        onNavButtonClick={() => setNavOpen((prevState) => !prevState)}
        title="AirviewCMS Demo"
        position="fixed"
        top={viewportOffset}
        {...{ navOpen }}
      >
        <Logo src={logo} alt="Logo alt text" />
        <IconButton
          aria-label="search"
          size="large"
          edge="end"
          sx={{ color: "common.white", marginLeft: "auto" }}
          onClick={() => setSearchOpen(true)}
        >
          <SearchIcon />
        </IconButton>
      </TopBar>
      <NavigationDrawer top={viewportOffset + topBarHeight} open={navOpen}>
        <NavigationItems />
      </NavigationDrawer>

      <Box
        sx={{
          marginTop: `${viewportOffset + topBarHeight}px`,
          paddingLeft: navOpen ? "300px" : 0,
          "@media print": {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}
