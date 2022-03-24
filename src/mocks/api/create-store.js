import { nanoid } from "nanoid";
import { seedData } from "./seed-data";
import matter from "gray-matter";

export function createStore() {
  let entries = seedData;

  const getEntries = () => {
    const mappedEntries = Object.entries(entries).map(
      ([entryId, entryData]) => {
        const { content, ...otherEntryData } = entryData;
        return [entryId, otherEntryData];
      }
    );

    return {
      ...Object.fromEntries(mappedEntries),
    };
  };

  const getEntryContent = (id) => {
    return entries[id]?.content ?? false;
  };

  const persistContent = (id, content) => {
    const meta = matter(atob(content["index.md"].content)).data;
    const collection = id.split("/")[0];

    entries[id] = { contentVersion: nanoid(), collection, meta, content };
  };

  const dropEntry = (id) => {
    if (!entries[id]) return false;

    delete entries[id];
  };

  const dropAllEntries = () => (entries = {});

  const getBranches = () => [
    { name: "main", sha: nanoid(), isProtected: false },
  ];

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
    reset,
  };
}
