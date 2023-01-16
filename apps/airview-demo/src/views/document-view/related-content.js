import React, { useMemo } from "react";
import { useGetRelated } from "airview-cms";
import { Menu } from "airview-ui";
import { useGetEntryId } from "./use-get-entry-id";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export function RelatedContent() {
  const location = useLocation();
  const entryId = useGetEntryId();
  const { data, isLoading, isFetching } = useGetRelated(entryId);

  const menuData = useMemo(() => {
    if (!data) return {};

    const keys = Object.keys(data).filter(
      (f) => (f.endsWith("md") || f.endsWith("mdx")) && f !== entryId.path
    );

    if (keys.length === 0) return {};

    return {
      links: keys.map((key) => ({
        label: data[key].meta.title || key,
        url: key,
        target: "_self",
      })),
    };
  }, [data, entryId]);

  return (
    menuData.links && (
      <Menu
        menuTitle="Related Content"
        menuTitleElement="h6"
        menuItems={[menuData]}
        sx={{
          marginBottom: 1,
        }}
        linkComponent={ReactRouterLink}
        currentRoute={location.pathname}
        loading={isLoading}
        fetching={isFetching}
        initialCollapsed={false}
      />
    )
  );
}
