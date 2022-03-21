import { nanoid } from "nanoid";
import { seedData } from "./seed-data";

export function createStore() {
  let entries = {};

  const init = () => (entries = { ...seedData });

  const getEntries = () => {
    return Object.entries(entries).map(([entryId, entryData]) => {
      return {
        dir: entryId,
        sha: entryData.sha,
        files: entryData.files.map((file) => {
          return {
            name: file.name,
            sha: file.sha,
            frontmatter: file.frontmatter,
          };
        }),
      };
    });
  };

  const getEntry = (dirName, fileName) => {
    const entry = entries[dirName];

    if (!entry) return false;

    return (
      entry.files.filter((file) => file.name === fileName)[0]?.body ?? false
    );
  };

  const editEntry = (dirName, fileName, fileContents) => {
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

  const dropEntry = (dirName) => {
    if (!entries[dirName]) return false;

    delete entries[dirName];
  };

  const dropAllEntries = () => (entries = {});

  const reset = () => init();

  init();

  return {
    init,
    getEntries,
    getEntry,
    editEntry,
    createEntry,
    dropEntry,
    dropAllEntries,
    reset,
  };
}
