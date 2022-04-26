import { rest } from "msw";
import { createStore } from "./create-store";

export function createHandlers(delay = 500, domain = "") {
  const ARTIFICIAL_DELAY_MS = delay;

  const {
    getEntries,
    getEntryContent,
    dropEntry,
    deleteBranch,
    persistContent,
    getBranches,
    createBranch,
    reset,
  } = createStore();

  const handlers = [
    rest.get(`${domain}/api/branches`, function (req, res, ctx) {
      const branches = getBranches();
      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
    }),

    rest.post(`${domain}/api/branches`, function (req, res, ctx) {
      const branches = createBranch(JSON.parse(req.body));
      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
    }),

    rest.get(`${domain}/api/entries/:branch`, function (req, res, ctx) {
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
      `${domain}/api/content/:collection/:entity/:branch`,
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
      `${domain}/api/content/:collection/:entity/:branch`,
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;

        persistContent(id, req.params.branch, JSON.parse(req.body));
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      }
    ),

    rest.delete(`${domain}/api/content/:branch`, function (req, res, ctx) {
      deleteBranch(req.params.branch);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS));
    }),

    rest.delete(
      `${domain}/api/content/:collection/:entity/:branch`,
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;
        dropEntry(id, req.params.branch);
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      }
    ),
  ];

  return { handlers, resetData: reset };
}
