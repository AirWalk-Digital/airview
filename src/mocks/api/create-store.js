import { nanoid } from "nanoid";
import { seedData } from "./seed-data";

export function createStore() {
  let entries = seedData;

  const getEntries = () => {
    return entries.map((e) => {
      const { content, ...rest } = e;
      return rest;
    });
  };

  const getEntryContent = (id, sha) => {
    const entry = entries.find((f) => f.id === id);

    if (!entry) return false;

    return entry.content;
  };

  const editEntry = (dirName, fileName, fileContents) => {
    return null;
    /*
    const entry = getEntry(dirName, fileName);

    if (!entry) return false;

    entries[dirName].sha = nanoid();

    const entryIndex = entries[dirName].files.findIndex(
      (file) => file.name === fileName
    );

    entries[dirName].files[entryIndex] = {
      ...entries[dirName].files[entryIndex],
      sha: nanoid(),
      ...fileContents,
    };
    */
  };

  const persistContent = (id, data) => {
    data.content.forEach((item) => (item.sha = nanoid()));
    data.id = id;
    data.meta = { title: data.entity };

    const index = entries.findIndex((f) => f.id == id);
    if (index === -1) {
      entries.push(data);
      return;
    }
    entries[index] = data;
  };

  const createEntry = (dirName, files) => {
    if (entries[dirName]) return false;

    entries[dirName] = {
      sha: nanoid(),
      files: files.map((file) => {
        return {
          sha: nanoid(),
          ...file,
        };
      }),
    };
  };

  const dropEntry = (id) => {
    if (!entries[id]) return false;

    delete entries[id];
  };

  const dropAllEntries = () => (entries = {});

  const reset = () => {
    entries = seedData;
  };

  return {
    getEntries,
    getEntryContent,
    editEntry,
    createEntry,
    dropEntry,
    dropAllEntries,
    persistContent,
    reset,
  };
}
