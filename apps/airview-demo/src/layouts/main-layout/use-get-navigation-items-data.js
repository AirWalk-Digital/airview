import { useMemo } from "react";
import { useGetCollectionEntries, useGetAllEntriesMeta } from "airview-cms";

export function useGetNavigationItemsData() {
  const {
    data: applications,
    isUninitialized: applicationsIsUninitialized,
    isLoading: applicationsIsLoading,
    isFetching: applicationsIsFetching,
    isError: applicationsIsError,
  } = useGetCollectionEntries("application");

  const {
    data: entries,
    isUninitialized: entriesIsUninitialized,
    isLoading: entriesIsLoading,
    isFetching: entriesIsFetching,
    isError: entriesIsError,
  } = useGetAllEntriesMeta();

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
                    url: `/${application.id}/_index.md`,
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
                          url: `/${entry.id}/_index.md`,
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
                          url: `/${entry.id}/_index.md`,
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

  return {
    isUninitialized: applicationsIsUninitialized || entriesIsUninitialized,
    isLoading: applicationsIsLoading || entriesIsLoading,
    isFetching: applicationsIsFetching || entriesIsFetching,
    isError: applicationsIsError || entriesIsError,
    data: navData,
  };
}
