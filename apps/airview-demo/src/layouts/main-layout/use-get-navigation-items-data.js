import { useGetCollectionEntries, useGetAllEntriesMeta } from "airview-cms";

export function useGetNavigationItemsData() {
  const {
    data: applications,
    isLoading: applicationsIsLoading,
    isFetching: applicationsIsFetching,
    isError: applicationsIsError,
  } = useGetCollectionEntries("application");

  const {
    data: entries,
    isLoading: entriesIsLoading,
    isFetching: entriesIsFetching,
    isError: entriesIsError,
  } = useGetAllEntriesMeta();

  //console.log(applications);
  //console.log(entries);

  const navData = applications?.map((application) => {
    const knowledgeEntries = entries.filter(
      (entry) =>
        entry.meta?.parent === application.id &&
        entry?.collection === "knowledge"
    );

    const releaseEntries = entries.filter(
      (entry) =>
        entry.meta?.parent === application.id && entry?.collection === "release"
    );

    return {
      application: application.meta.title,
      menuItems: [
        {
          groupTitle: "Application",
          links: [
            {
              label: "Overview",
              url: `/${application.id}`,
            },
          ],
        },
        ...(knowledgeEntries.length > 0
          ? [
              {
                groupTitle: "Knowledge",
                links: [
                  {
                    label: "View all",
                    url: `/${application.id}/knowledge`,
                  },
                  ...knowledgeEntries.map((entry) => ({
                    label: entry.meta.title,
                    url: `/${entry.id}`,
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
                  {
                    label: "View all",
                    url: `/${application.id}/release`,
                  },
                  ...releaseEntries.map((entry) => ({
                    label: entry.meta.title,
                    url: `/${entry.id}`,
                  })),
                ],
              },
            ]
          : []),
      ],
    };
  });

  return {
    isLoading: applicationsIsLoading || entriesIsLoading,
    isFetching: applicationsIsFetching || entriesIsFetching,
    isError: applicationsIsError || entriesIsError,
    data: navData,
  };
}

/* toDo
- Sort links alphabetical order
- Switching branch with CMS enabled renders no nav items
- False unsaved changes
  - create new branch "test_branch"
  - create new knowledge doc "Test doc" as child of Microsoft Teams
  - navigate to Test Doc and edit title to "Test Document" and save changes
  - Disable CMS, you should see a unsaved changes message, clicking okay will 404
*/
