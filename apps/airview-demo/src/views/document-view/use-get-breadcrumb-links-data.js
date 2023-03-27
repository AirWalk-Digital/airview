import { useMemo } from "react";
import { useGetEntryMeta } from "airview-cms";

export function useGetBreadcrumbLinksData(entryData) {
  const entryParent = useGetEntryMeta(entryData?.parent);

  const breadcrumbLinks = useMemo(() => {
    const baseBreadcrumbData = [
      {
        label: "Home",
        url: "/",
      },
    ];

    if (!entryData?.parent || !entryParent?.data) return baseBreadcrumbData;

    return [
      ...baseBreadcrumbData,
      {
        label: entryParent.data.meta.title,
        url: `/${entryData.parent}`,
      },
    ];
  }, [entryParent, entryData]);

  return breadcrumbLinks;
}
