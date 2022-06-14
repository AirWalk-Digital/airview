import React from "react";
import { Menu } from "airview-ui";
import { Link as ReactRouterLink } from "react-router-dom";

export function TableOfContents() {
  return (
    <Menu
      menuTitle="Table of Contents"
      menuTitleElement="h6"
      menuItems={[]}
      sx={{
        marginBottom: 1,
      }}
      linkComponent={ReactRouterLink}
      loading={false}
      fetching={false}
      initialCollapsed={false}
    />
  );
}
