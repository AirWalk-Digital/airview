import { rest } from "msw";
import { createStore } from "./create-store";

export function AirviewMockServer(delay = 500, domain = "") {
  const ARTIFICIAL_DELAY_MS = delay;

  const {
    getEntries,
    getEntryContent,
    dropEntry,
    deleteBranch,
    persistContent,
    getBranches,
    createBranch,
    resetStore,
    getExternalContent,
  } = createStore();

  this.handlers = [
    rest.get(`${domain}/api/branches`, function (req, res, ctx) {
      const branches = getBranches();
      return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(branches));
    }),

    rest.post(`${domain}/api/branches`, function (req, res, ctx) {
      const { baseSha, name } = req.body;

      const branches = createBranch(baseSha, name);

      if (branches) {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      } else {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.status(422));
      }
    }),

    rest.delete(`${domain}/api/content/:branchSha`, function (req, res, ctx) {
      const { branchSha } = req.params;

      deleteBranch(branchSha);
      return res(ctx.delay(ARTIFICIAL_DELAY_MS));
    }),

    rest.get(`${domain}/api/entries/:branchSha`, function (req, res, ctx) {
      const { branchSha } = req.params;

      const entriesMeta = getEntries(branchSha);

      if (entriesMeta) {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entriesMeta));
      } else {
        return res(
          ctx.status(404),
          ctx.delay(ARTIFICIAL_DELAY_MS),
          ctx.json({
            message: `Branch Sha '${branchSha}' not found`,
          })
        );
      }
    }),

    rest.get(`${domain}/api/content/:sha`, function (req, res, ctx) {
      const path = req.url.searchParams.get("path");
      const content = getEntryContent(req.params.sha, path);

      if (content) {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json({ content }));
      } else {
        return res(
          ctx.status(404),
          ctx.json({
            message: `Entry '${req.params.sha}' not found`,
          })
        );
      }
    }),

    rest.get(
      `${domain}/api/external-content/:repo/:owner`,
      function (req, res, ctx) {
        const path = req.url.searchParams.get("path");
        const content = getExternalContent(
          req.params.repo,
          req.params.owner,
          path
        );

        if (content) {
          return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json({ content }));
        } else {
          return res(
            ctx.status(404),
            ctx.json({
              message: `External Content '${req.params.repo}' not found`,
            })
          );
        }
      }
    ),

    rest.get(`${domain}/api/media/:sha`, function (req, res, ctx) {
      const path = req.url.searchParams.get("path");
      const content = getEntryContent(req.params.sha, path);

      if (content) {
        const buffer = Buffer.from(content, "base64");
        return res(
          ctx.delay(ARTIFICIAL_DELAY_MS),
          ctx.set("Content-Length", buffer.byteLength.toString()),
          ctx.body(buffer)
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json({
            message: `Entry '${req.params.sha}' not found`,
          })
        );
      }
    }),

    // branchSha, branchName, entrySha (branchSha as q param)
    rest.put(
      `${domain}/api/content/:collection/:entity`,
      function (req, res, ctx) {
        const id = `${req.params.collection}/${req.params.entity}`;
        const branchName = req.url.searchParams.get("branch");

        if (persistContent(id, branchName, req.body)) {
          return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.json({
              id: id,
              collection: req.params.collection,
              entry: req.params.entity,
            })
          );
        } else {
          return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.status(422));
        }
      }
    ),

    rest.delete(
      `${domain}/api/content/:collection/:entity/:branch`,
      function (req, res, ctx) {
        const entryId = `${req.params.collection}/${req.params.entity}`;
        dropEntry(entryId, req.params.branch);
        return res(ctx.delay(ARTIFICIAL_DELAY_MS));
      }
    ),

    rest.post(`${domain}/api/pulls`, function (req, res, ctx) {
      const { baseBranch, headBranch } = req.body;

      if (baseBranch !== headBranch) {
        return res(
          ctx.delay(ARTIFICIAL_DELAY_MS),
          ctx.json({ url: "http://github.com" })
        );
      } else {
        return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.status(422));
      }
    }),
  ];

  this.resetData = resetStore;
}
