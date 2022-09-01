import slugify from "slugify";
import matter from "gray-matter";
import { selectWorkingBranch } from "../cms.slice";
import { selectAllCollections } from "../config-slice";
import { airviewApi } from "../../store";
import {
  selectContentCreatorSelectedCollection,
  selectContentCreatorData,
} from "./content-creator.slice";

export function prepareEntryPayload() {
  return (_, getState) => {
    const state = getState();
    const workingBranch = selectWorkingBranch(state);
    const branchesResult = airviewApi.endpoints.getBranches.select()(state);
    const { data: branches } = branchesResult;

    const collections = selectAllCollections(state);
    const selectedEntryCollection =
      selectContentCreatorSelectedCollection(state);
    const entryMetaData = selectContentCreatorData(state);

    const entryId = `${selectedEntryCollection}/${slugifyString(
      entryMetaData.title
    )}_${Date.now().toString(36)}`;

    const { additionalFiles } = collections[selectedEntryCollection];

    const baseSha = branches.find(
      (branch) => branch.name === workingBranch
    ).sha;

    return {
      id: entryId,
      branch: workingBranch,
      data: {
        "_index.md": Buffer.from(
          matter.stringify("", entryMetaData),
          "utf8"
        ).toString("base64"),
        ...(additionalFiles &&
          Object.fromEntries(
            additionalFiles.map((file) => {
              return [file, btoa(matter.stringify("", {}))];
            })
          )),
      },
      baseSha,
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
