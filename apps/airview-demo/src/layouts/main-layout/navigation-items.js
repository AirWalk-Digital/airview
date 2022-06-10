import React from "react";
import { Menu } from "airview-ui";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useGetNavigationItemsData } from "./use-get-navigation-items-data";

export function NavigationItems({ open }) {
  const { isLoading, isError, data } = useGetNavigationItemsData();
  const location = useLocation();

  if (isError) {
    console.log("error");
    return null;
  }

  return data?.map(({ application, menuItems }, index) => {
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
        //loading={isLoading}
      />
    );
  });
}
