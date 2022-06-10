import React, { useState } from "react";
import { Box } from "@mui/material";
import { useCMSViewportOffset } from "airview-cms";
import { TopBar, NavigationDrawer, Menu } from "airview-ui";
import { Outlet, Link as ReactRouterLink, useLocation } from "react-router-dom";

const msTeamsMenuItems = [
  {
    groupTitle: "Application",
    links: [
      {
        label: "Overview",
        url: "/application/ms_teams",
      },
    ],
  },
  {
    groupTitle: "Knowledge",
    links: [
      {
        label: "View all",
        url: "/application/ms_teams/knowledge",
      },
      {
        label: "Place Call on Hold",
        url: "/knowledge/place_call_on_hold",
      },
      {
        label: "Composing a new message",
        url: "/knowledge/composing_a_new_message",
      },
    ],
  },
  {
    groupTitle: "Release",
    links: [
      {
        label: "View all",
        url: "/application/ms_teams/release",
      },
      {
        label: "Security Patch",
        url: "/release/security_patch",
      },
    ],
  },
];

const msOutlookMenuItems = [
  {
    groupTitle: "Application",
    links: [
      {
        label: "Overview",
        url: "/application/ms_outlook",
      },
    ],
  },
  {
    groupTitle: "Knowledge",
    links: [
      {
        label: "View all",
        url: "/application/ms_outlook/knowledge",
      },
      {
        label: "Setup your mailbox",
        url: "/knowledge/setup_your_mailbox",
      },
      {
        label: "Schedule the delivery of an email",
        url: "/knowledge/schedule_send_an_email",
      },
    ],
  },
];

export function MainLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const viewportOffset = useCMSViewportOffset();
  const topBarHeight = 64;

  const location = useLocation();

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
        <Menu
          menuTitle="Microsoft Teams"
          menuTitleElement="h3"
          menuItems={msTeamsMenuItems}
          sx={{
            marginBottom: 1,
          }}
          linkComponent={ReactRouterLink}
          currentRoute={location.pathname}
        />
        <Menu
          menuTitle="Microsoft Outlook"
          menuTitleElement="h3"
          menuItems={msOutlookMenuItems}
          sx={{
            marginBottom: 1,
          }}
          linkComponent={ReactRouterLink}
          currentRoute={location.pathname}
        />
      </NavigationDrawer>
      <Box sx={{ marginTop: `${viewportOffset + topBarHeight}px` }}>
        <Outlet />
      </Box>
    </div>
  );
}
