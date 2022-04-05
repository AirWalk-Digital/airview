import { useSelector } from "react-redux";
import { useGetBranchesQuery, useGetAllEntriesMetaQuery } from "../api";

const every = require("lodash/every");

export function useGetAllEntriesMeta(select) {
  const workingBranch = useSelector(
    (state) => state.branchManager.workingBranch
  );

  const { data: branchQueryData } = useGetBranchesQuery();

  const branchSha = branchQueryData?.filter(
    (branch) => branch.name === workingBranch
  )[0].sha;

  return useGetAllEntriesMetaQuery(
    { branch: workingBranch, branchSha },
    {
      skip: !every([workingBranch, branchQueryData, branchSha]),
      ...(select && { selectFromResult: select }),
    }
  );
}

export function useGetEntryMeta(entryId) {
  return useGetAllEntriesMeta(({ data, ...rest }) => ({
    data: data?.[entryId],
    ...rest,
  }));
}

export function useGetEntriesMetaByCollection(collection) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    if (!data) return { data, ...rest };

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) => entryData?.collection === collection
    );

    return { data: Object.fromEntries(filteredEntries), ...rest };
  });
}

export function useGetChildEntriesMeta(parentEntryId) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    if (!parentEntryId) return { data: undefined, ...rest };

    if (!data) return { data, ...rest };

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) => entryData.meta?.parent === parentEntryId
    );

    return { data: Object.fromEntries(filteredEntries), ...rest };
  });
}

export function useGetSiblingEntriesMeta(id) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    if (!id) return { data: undefined, ...rest };

    if (!data) return { data, ...rest };

    const {
      meta: { parent },
      collection,
    } = data[id];

    if (!parent || !collection) return {};

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) =>
        entryData.meta?.parent === parent &&
        entryData.collection === collection &&
        entryId !== id
    );

    return { data: Object.fromEntries(filteredEntries), ...rest };
  });
}
