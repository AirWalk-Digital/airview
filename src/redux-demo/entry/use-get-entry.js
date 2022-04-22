import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import matter from "gray-matter";

function AirviewFetchError(code, message) {
  this.name = "Fetch Error";
  this.code = code;
  this.message = message;
}

export function useGetEntry(collection, entry) {
  const branchesState = useSelector((state) => state.branchesSlice);
  const [state, setState] = useState({
    status: "idle",
    error: null,
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          status: "loading",
        }));

        const branchesResponse = await fetch("/api/branches", {
          cache: "no-cache",
          signal: controller.signal,
        });

        const branchesData = await branchesResponse.json();

        if (!branchesResponse.ok) {
          throw new Error(branchesData.message);
        }

        const branchSha = branchesData.filter(
          (branch) => branch.name === branchesState.workingBranch
        )[0]?.sha;

        const allEntriesMetaResponse = await fetch(
          branchSha
            ? `/api/entries/${branchesState.workingBranch}?${branchSha}`
            : `/api/entries/${branchesState.workingBranch}`,
          { cache: "force-cache", signal: controller.signal }
        );

        const allEntriesMetaData = await allEntriesMetaResponse.json();

        if (!allEntriesMetaResponse.ok) {
          throw new AirviewFetchError(
            allEntriesMetaResponse.status,
            allEntriesMetaData.message
          );
        }

        const entrySha = allEntriesMetaData[`${collection}/${entry}`]?.sha;

        const entryResponse = await fetch(
          entrySha
            ? `/api/content/${collection}/${entry}/${
                branchesState.workingBranch
              }?${entrySha.join("&")}`
            : `/api/content/${collection}/${entry}/${branchesState.workingBranch}`,
          { cache: "force-cache", signal: controller.signal }
        );

        const entryResponseData = await entryResponse.json();

        if (!entryResponse.ok) {
          throw new AirviewFetchError(
            entryResponse.status,
            entryResponseData.message
          );
        }

        setState((prevState) => ({
          ...prevState,
          status: "fulfilled",
          data: normalizeEntryData(entryResponseData),
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          status: "error",
          error,
          data: null,
        }));
      }
    })();

    return () => controller.abort();
  }, [collection, entry, branchesState.workingBranch]);

  return state;
}

function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}
