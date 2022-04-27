import { nanoid } from "nanoid";
import { createSeedData } from "./create-seed-data";
import matter from "gray-matter";

export function createStore() {
  let { branches, entries } = createSeedData();

  const getEntries = (branch) => {
    if (!entries?.[branch]) return false;

    const mappedEntries = Object.entries(entries[branch]).map(
      ([entryId, entryData]) => {
        const selectedEntryData = { ...entryData };
        delete selectedEntryData.content;
        return [entryId, { id: entryId, ...selectedEntryData }];
      }
    );

    return {
      ...Object.fromEntries(mappedEntries),
    };
  };

  const getEntryContent = (id, branch) => {
    return entries[branch][id]?.content ?? false;
  };

  const persistContent = (id, branch, content) => {
    const meta = matter(atob(content["_index"])).data;
    const collection = id.split("/")[0];

    entries[branch][id] = { sha: [nanoid()], collection, meta, content };
  };

  const dropEntry = (id, branch) => {
    if (!entries[branch][id]) return false;

    delete entries[branch][id];
  };

  const deleteBranch = (branch) => {
    if (!entries[branch] || !branches[branch]) return false;
    delete entries[branch];
    delete branches[branch];
  };
  const getBranches = () => Object.values(branches);

  const createBranch = (body) => {
    const branch = Object.values(branches).find(
      (branch) => branch.sha === body.sha
    );

    if (!branch || branches[body.name]) {
      return false;
    }

    (branches[body.name] = {
      name: body.name,
      sha: nanoid(),
      isProtected: false,
    }),
      (entries[body.name] = { ...entries[branch.name] });

    return true;
  };

  const resetStore = () => {
    entries = createSeedData().entries;
    branches = createSeedData().branches;
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
