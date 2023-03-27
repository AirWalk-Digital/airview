import React from "react";
import { Menu } from "airview-ui";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useGetNavigationItemsData } from "./use-get-navigation-items-data";

const loadingData = [
  {
    application: "",
    menuItems: [{ groupTitle: "", links: [] }],
  },
];

export function NavigationItems({ open }) {
  const {
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    data = loadingData,
  } = useGetNavigationItemsData();
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
        loading={isLoading || isUninitialized}
        fetching={isFetching}
        initialCollapsed={false}
      />
    );
  });
}
