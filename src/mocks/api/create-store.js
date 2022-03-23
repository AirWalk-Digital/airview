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
      contentVersion: nanoid(),
      ...Object.fromEntries(mappedEntries),
    };
  };

  const getEntryContent = (id, sha) => {
    return entries[id]?.content ?? false;
  };

  const persistContent = (id, content) => {
    const meta = matter(atob(content["index.md"].content)).data;
    const collection = id.split("/")[0];
    const entry = { contentVersion: nanoid(), id, collection, meta, content };

    const index = entries.findIndex((f) => f.id === id);
    if (index === -1) {
      entries.push(entry);
      return;
    }
    entries[index] = entry;
  };

  const dropEntry = (id) => {
    const index = entries.findIndex((f) => f.id === id);
    if (index >= 0) {
      entries.pop(index);
      return true;
    }
    return false;
  };

  const dropAllEntries = () => (entries = []);

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
