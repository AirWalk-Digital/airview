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
    const meta = matter(atob(content["_index.md"])).data;
    const collection = id.split("/")[0];

    entries[branch][id] = { sha: [nanoid()], collection, meta, content };
  };

  const dropEntry = (id, branch) => {
    if (!entries[branch][id]) return false;

    delete entries[branch][id];
  };

  const dropAllEntries = (branch) => {
    if (!entries[branch]) return false;
    entries[branch] = {};
  };
  const getBranches = () => Object.values(branches);

  const createBranch = (body) =>
    branches.push({ name: body.name, isProtected: false, sha: nanoid() });

  const reset = () => {
    entries = createSeedData().entries;
  };

  return {
    getEntries,
    getEntryContent,
    dropEntry,
    dropAllEntries,
    persistContent,
    getBranches,
    createBranch,
    reset,
  };
}
