import slugify from "slugify";
import matter from "gray-matter";
import { selectWorkingBranch } from "../cms.slice";
//import { selectAllCollections } from "../config-slice";
import {
  selectContentCreatorSelectedCollection,
  selectContentCreatorData,
} from "./content-creator.slice";

export function prepareEntryPayload() {
  return (_, getState) => {
    const state = getState();
    const workingBranch = selectWorkingBranch(state);
    //const collections = selectAllCollections(state);
    const selectedEntryCollection =
      selectContentCreatorSelectedCollection(state);
    const entryMetaData = selectContentCreatorData(state);

    const entryId = `${selectedEntryCollection}/${slugifyString(
      entryMetaData.title
    )}`;

    return {
      id: entryId,
      branch: workingBranch,
      data: {
        _index: btoa(matter.stringify("", entryMetaData)),
      },
    };
  };
}

function slugifyString(value) {
  return slugify(value, {
    lower: true,
    replacement: "_",
    strict: true,
  });
}
