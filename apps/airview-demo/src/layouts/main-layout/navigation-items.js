import React from "react";
import { Menu } from "airview-ui";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useGetNavigationItemsData } from "./use-get-navigation-items-data";

export function NavigationItems({ open }) {
  const navigationData = useGetNavigationItemsData();
  const location = useLocation();

  return navigationData.map(({ application, menuItems }, index) => {
    return (
      <Menu
        key={index}
        menuTitle={application}
        menuTitleElement="h3"
        menuItems={menuItems}
        sx={{
          marginBottom: 1,
        }}
        linkComponent={ReactRouterLink}
        currentRoute={location.pathname}
      />
    );
  });
}
