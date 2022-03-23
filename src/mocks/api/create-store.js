import { nanoid } from "nanoid";
import { seedData } from "./seed-data";
import matter from "gray-matter";

export function createStore() {
  let entries = seedData;

  const getEntries = () => {
    return entries.map((e) => {
      const { content, ...rest } = e;
      return { contentVersion: nanoid(), ...rest };
    });
  };

  const getEntryContent = (id, sha) => {
    const entry = entries.find((f) => f.id === id);

    if (!entry) return false;

    return entry.content;
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
