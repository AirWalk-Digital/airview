import { rest } from "msw";
import { createStore } from "./create-store";
import matter from "gray-matter";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500;

const {
  getEntries,
  getEntryContent,
  dropEntry,
  dropAllEntries,
  persistContent,
  getBranches,
} = createStore();

const testMarkdown = {
  "index.md": {
    content: btoa(
      matter.stringify("I am body content for Apple Music", {
        title: "Apple Music",
      })
    ),
  },
};

console.log(testMarkdown);

console.log("entries", getEntries());
console.log("entryContent", getEntryContent("application/ms_outlook"));

console.log("updating content for entryId 'application/ms_teams'");
persistContent("application/ms_teams", testMarkdown);
console.log("entries", getEntries());
console.log(
  "entryContent",
  atob(getEntryContent("application/ms_teams")["index.md"].content)
);

console.log("dropping all entries");
dropAllEntries();
console.log("entries", getEntries());

export const handlers = [
  rest.get("/api/entries", function (req, res, ctx) {
    const entiesMeta = getEntries();
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.get(
    "/api/content/:collection/:entity/:branch",
    function (req, res, ctx) {
      const id = `${req.params.collection}/${req.params.entity}`;
      const content = getEntryContent(id, "");

      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(content));
    }
  ),
  rest.put(
    "/api/content/:collection/:entity/:branch",
    function (req, res, ctx) {
      const id = `${req.params.collection}/${req.params.entity}`;
      persistContent(id, req.body);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS));
    }
  ),
  rest.delete("/api/content", function (req, res, ctx) {
    dropAllEntries();
    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
  }),
  rest.delete(
    "/api/content/:collection/:entity/:branch",
    function (req, res, ctx) {
      const id = `${req.params.collection}/${req.params.entity}`;
      dropEntry(id);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS));
    }
  ),
  rest.get("/api/branches", function (req, res, ctx) {
    const branches = getBranches();
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
  }),
];
