import React, { useMemo } from "react";
import { useGetSiblingEntriesMeta } from "airview-cms";
import { Menu } from "airview-ui";
import { useGetEntryId } from "./use-get-entry-id";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export function RelatedContent() {
  const location = useLocation();
  const entryId = useGetEntryId();
  const { data, isLoading, isFetching } = useGetSiblingEntriesMeta(entryId);

  const menuData = useMemo(() => {
    if (!data) return [];

    return [
      {
        links: data.map((item) => ({
          label: item.meta.title,
          url: `/${item.id}`,
        })),
      },
    ];
  }, [data]);

  return (
    <Menu
      menuTitle="Related Content"
      menuTitleElement="h6"
      menuItems={menuData}
      sx={{
        marginBottom: 1,
      }}
      linkComponent={ReactRouterLink}
      currentRoute={location.pathname}
      loading={isLoading}
      fetching={isFetching}
      initialCollapsed={false}
    />
  );
}
