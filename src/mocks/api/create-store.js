import { nanoid } from "nanoid";
import { seedData } from "./seed-data";
import matter from "gray-matter";

export function createStore() {
  let entries = seedData;
  let branches = [
    { name: "main", sha: "abc", isProtected: true },
    { name: "one", sha: "cde", isProtected: false },
    { name: "two", sha: "efg", isProtected: false },
  ];

  const getEntries = (branch) => {
    const mappedEntries = Object.entries(entries[branch]).map(
      ([entryId, entryData]) => {
        const { content, ...otherEntryData } = entryData;
        return [entryId, { id: entryId, ...otherEntryData }];
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
  const getBranches = () => branches;

  const createBranch = (body) =>
    branches.push({ name: body.name, isProtected: false, sha: nanoid() });

  const reset = () => {
    entries = seedData;
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
