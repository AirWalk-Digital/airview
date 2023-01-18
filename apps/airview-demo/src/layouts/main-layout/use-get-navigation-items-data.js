import { useMemo } from "react";
import { useGetCollectionEntries, useGetAllEntriesMeta } from "airview-cms";

export function useGetNavigationItemsData() {
  // const {
  //   data: applications,
  //   isUninitialized: applicationsIsUninitialized,
  //   isLoading: applicationsIsLoading,
  //   isFetching: applicationsIsFetching,
  //   isError: applicationsIsError,
  // } = useGetCollectionEntries("application");

  const {
    data: entries,
    isUninitialized: entriesIsUninitialized,
    isLoading: entriesIsLoading,
    isFetching: entriesIsFetching,
    isError: entriesIsError,
  } = useGetAllEntriesMeta();

  /*
  const navData = useMemo(
    () =>
      applications
        ?.sort((applicationA, applicationB) => {
          return applicationA.meta.title.toUpperCase() <
            applicationB.meta.title.toUpperCase()
            ? -1
            : 1;
        })
        .map((application) => {
          const knowledgeEntries = entries
            .filter(
              (entry) =>
                entry.meta?.parent === application.id &&
                entry?.collection === "knowledge"
            )
            ?.sort((entryA, entryB) =>
              entryA.meta.title.toUpperCase() < entryB.meta.title.toUpperCase()
                ? -1
                : 1
            );

          const releaseEntries = entries
            .filter(
              (entry) =>
                entry.meta?.parent === application.id &&
                entry?.collection === "release"
            )
            ?.sort((entryA, entryB) =>
              entryA.meta.title.toUpperCase() < entryB.meta.title.toUpperCase()
                ? -1
                : 1
            );

          return {
            application: application.meta.title,
            menuItems: [
              {
                groupTitle: "Application",
                links: [
                  {
                    label: "Overview",
                    url: `/${application.id}/${application.index}`,
                  },
                ],
              },
              ...(knowledgeEntries.length > 0
                ? [
                    {
                      groupTitle: "Knowledge",
                      links: [
                        ...knowledgeEntries.map((entry) => ({
                          label: entry.meta.title,
                          url: `/${entry.id}/${application.index}`,
                        })),
                      ],
                    },
                  ]
                : []),
              ...(releaseEntries.length > 0
                ? [
                    {
                      groupTitle: "Release",
                      links: [
                        ...releaseEntries.map((entry) => ({
                          label: entry.meta.title,
                          url: `/${entry.id}/${application.index}`,
                        })),
                      ],
                    },
                  ]
                : []),
            ],
          };
        }),
    [applications, entries]
  );
  */

  const getFilteredChildCollection = (
    entries,
    collection,
    parentCollection,
    parent
  ) => {
    const data = Object.keys(entries[collection] || {}).filter(
      (key) =>
        entries[collection][key].meta.parent === `${parentCollection}/${parent}`
    );
    if (data.length == 0) return [];

    const n = data.map((key) => ({
      label: entries[collection][key].meta.title,
      url: `${collection}/${key}/${entries[collection][key].index}`,
    }));
    return n;
  };

  const navData = useMemo(() => {
    if (entries) {
      return Object.keys(entries.application).map((m) => {
        const releaseLinks = getFilteredChildCollection(
          entries,
          "release",
          "application",
          m
        );
        const knowledgeLinks = getFilteredChildCollection(
          entries,
          "knowledge",
          "application",
          m
        );

        const navItem = {
          application: entries.application[m].meta.title,
          menuItems: [
            {
              groupTitle: "Application",
              links: [
                {
                  label: "Overview",
                  url: `/application/${m}/${entries.application[m].index}`,
                },
              ],
            },
          ],
        };

        if (releaseLinks.length > 0)
          navItem.menuItems.push({
            groupTitle: "Release",
            links: releaseLinks,
          });
        if (knowledgeLinks.length > 0)
          navItem.menuItems.push({
            groupTitle: "Knowledge",
            links: knowledgeLinks,
          });
        return navItem;
      });
    }
    return [];
  }, [entries]);

  return {
    isUninitialized: entriesIsUninitialized,
    isLoading: entriesIsLoading,
    isFetching: entriesIsFetching,
    isError: entriesIsError,
    data: navData,
  };
}
