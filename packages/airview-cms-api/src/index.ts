import express, { Response, Request, NextFunction } from "express"; //
import { CmsBackend } from "./backend.js";
import { S3Cache } from "./s3cache.js";
import { GithubClient } from "./githubClient.js";

const bucket = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_S3_REGION;
if (bucket === undefined) throw Error("No S3 Bucket defined");

if (region === undefined) throw Error("No S3 Region defined");

const client = new GithubClient();
const cache = new S3Cache(region, bucket);
const backend = new CmsBackend(client, cache);

const app = express();

app.use(express.json());

const port = 3000;

app.get(
  "/search/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.query !== "string") {
        res.status(400).send();
        return;
      }
      const data = await backend.searchContent(req.params.sha, req.query.query);
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  "/content/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getContent(req.params.sha);
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.put("/content/:collection/:entity", async (req, res, next) => {
  try {
    if (typeof req.query.branch !== "string") {
      res.status(400).send();
      return;
    }
    if (typeof req.query.baseSha !== "string") {
      res.status(400).send();
      return;
    }

    if (req.query.branch && req.query.baseSha) {
      await backend.setContent({
        id: `${req.params.collection}/${req.params.entity}`,
        branchName: req.query.branch,
        baseSha: req.query.baseSha,
        content: req.body,
        author: { name: "User", email: "user@noreply.com" },
      });
      res.status(201).send();
    }
    res.status(400).send();
  } catch (err) {
    next(err);
  }
});

app.delete(
  "/content/:collection/:entity",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.branch !== "string") {
        res.status(400).send();
        return;
      }
      if (typeof req.query.baseSha !== "string") {
        res.status(400).send();
        return;
      }

      if (req.query.branch && req.query.baseSha) {
        await backend.deleteEntity({
          id: `${req.params.collection}/${req.params.entity}`,
          branchName: req.query.branch,
          baseSha: req.query.baseSha,
          author: { name: "User", email: "user@noreply.com" },
        });
        res.status(201).send();
      }
      res.status(400).send();
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  "/entries/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getEntries(req.params.sha);
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  "/branches",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getBranches();
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
