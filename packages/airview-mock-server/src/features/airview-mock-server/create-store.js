import { nanoid } from "nanoid";
import { createSeedData } from "./create-seed-data";
import matter from "gray-matter";

export function createStore() {
  let { branches, entries } = createSeedData();

  const getBranches = () => Object.values(branches);

  const createBranch = (baseSha, name) => {
    const baseBranch = Object.values(branches).find(
      (branch) => branch.sha === baseSha
    );

    if (!baseBranch || branches[name]) {
      return false;
    }

    const branchSha = nanoid();

    branches[name] = {
      name: name,
      sha: branchSha,
      isProtected: false,
    };

    entries[name] = { ...entries[baseBranch.name] };

    return true;
  };

  const deleteBranch = (branchSha) => {
    const branchData = getBranches().find((branch) => branch.sha === branchSha);

    if (!branchData) return;

    delete branches[branchData.name];
    delete entries[branchData.name];
  };

  const getEntries = (branchSha) => {
    const branch = getBranches().find((branch) => branch.sha === branchSha);

    if (!branch) return false;

    return Object.entries(entries[branch.name]).map(([entryId, entryData]) => {
      const selectedEntryData = { ...entryData };
      delete selectedEntryData.content;
      return { id: entryId, ...selectedEntryData };
    });
  };

  const getEntryContent = (entrySha) => {
    let entry;

    const groupedEntries = Object.values(entries);

    for (let i = 0; i < groupedEntries.length; i++) {
      entry = Object.values(groupedEntries[i]).find(
        (entry) => entry.sha === entrySha
      );

      if (entry) break;
    }

    if (!entry) return false;

    return entry.content;
  };

  const persistContent = (entryId, branchName, content) => {
    if (!branches[branchName]) return false;

    const newBranchSha = nanoid();

    branches[branchName].sha = newBranchSha;

    const meta = matter(atob(content["_index.md"])).data;
    const collection = entryId.split("/")[0];

    entries[branchName][entryId] = {
      sha: nanoid(),
      collection,
      meta,
      content,
    };

    return true;
  };

  const dropEntry = (entryId, branch) => {
    if (!branches[branch]) return;

    if (!entries[branch][entryId]) return;

    delete entries[branch][entryId];

    branches[branch].sha = nanoid();
  };

  const resetStore = () => {
    const newData = createSeedData();
    entries = newData.entries;
    branches = newData.branches;
  };

  return {
    getEntries,
    getEntryContent,
    dropEntry,
    deleteBranch,
    persistContent,
    getBranches,
    createBranch,
    resetStore,
  };
}
