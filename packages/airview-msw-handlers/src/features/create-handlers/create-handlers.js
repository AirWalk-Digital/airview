import { rest } from "msw";
import { createStore } from "./create-store";

export function createHandlers(delay = 500) {
  const ARTIFICIAL_DELAY_MS = delay;

  const {
    getEntries,
    getEntryContent,
    dropEntry,
    dropAllEntries,
    persistContent,
    getBranches,
    createBranch,
  } = createStore();

  return [
    rest.get("/api/entries/:branch", function (req, res, ctx) {
      const branch = req.params.branch;

      const entiesMeta = getEntries(branch);

      if (entiesMeta) {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
      } else {
        return res(
          ctx.status(404),
          ctx.json({
            message: `Branch '${branch}' not found`,
          })
        );
      }
    }),
    rest.get(
      "/api/content/:collection/:entity/:branch",
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;
        const content = getEntryContent(id, req.params.branch);

        if (content) {
          return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(content));
        } else {
          return res(
            ctx.status(404),
            ctx.json({
              message: `Entry '${id}' not found`,
            })
          );
        }
      }
    ),
    rest.put(
      "/api/content/:collection/:entity/:branch",
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;
        persistContent(id, req.params.branch, req.body);
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      }
    ),
    rest.delete("/api/content/:branch", function (req, res, ctx) {
      dropAllEntries(req.params.branch);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS));
    }),
    rest.delete(
      "/api/content/:collection/:entity/:branch",
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;
        dropEntry(id, req.params.branch);
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      }
    ),
    rest.get("/api/branches", function (req, res, ctx) {
      const branches = getBranches();
      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
    }),
    rest.post("/api/branches", function (req, res, ctx) {
      const branches = createBranch(req.body);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
    }),
  ];
}
