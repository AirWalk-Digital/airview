import React, { useMemo } from "react";
import { useGetSiblingEntriesMeta, useGetRelated } from "airview-cms";
import { Menu } from "airview-ui";
import { useGetEntryId } from "./use-get-entry-id";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export function RelatedContent() {
  const location = useLocation();
  const entryId = useGetEntryId();
  const { data, isLoading, isFetching } = useGetRelated(entryId);
  console.log(data);

  const testEnding = (str) => {
    const endings = [".mdx", ".md", ".ppt.pdf", ".ppt.html"];
    return endings.some((ending) => str.endsWith(ending));
  };
  const menuData = useMemo(() => {
    if (!data) return [];

    return [
      {
        links: Object.keys(data)
          .filter((f) => testEnding(f))
          .map((key) => ({
            label: key,
            url:
              key.endsWith(".md") || key.endsWith(".mdx")
                ? key
                : `/api/cms/media/${data[key].sha}`,

            target:
              key.endsWith(".md") || key.endsWith(".mdx") ? "_self" : "_blank",
            rel:
              key.endsWith(".md") || key.endsWith(".mdx")
                ? undefined
                : "noopener noreferrer",
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
