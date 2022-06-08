import express, { Response, Request, NextFunction } from "express";
import {
  CmsBackend,
  S3Cache,
  GithubClient,
  getTokenFromPrivateKeyCb,
} from "airview-cms-api";

import server from "./mock.js";

const port = process.env.PORT;

let tokenCallback;
let cache;

if (process.env.USE_MOCK === "true") {
  tokenCallback = async () => "none";
  class MockCache {
    get = async (key: any) => undefined;
    set = async (key: any, value: any) => {};
  }

  cache = new MockCache();
  server.listen();
} else {
  const privateKeyPath: string = process.env.PRIVATE_KEY_FILE || "";
  tokenCallback = getTokenFromPrivateKeyCb(privateKeyPath);

  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_S3_REGION;
  if (bucket === undefined) throw Error("No S3 Bucket defined");
  if (region === undefined) throw Error("No S3 Region defined");
  cache = new S3Cache(region, bucket);
}
const client = new GithubClient(tokenCallback);
const backend = new CmsBackend(client, cache);

const app = express();

app.use(express.json());

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
  "/api/content/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getContent(req.params.sha);
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.put("/api/content/:collection/:entity", async (req, res, next) => {
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

app.post(
  "/api/entries/",
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
        await backend.createEntity({
          branchName: req.query.branch,
          baseSha: req.query.baseSha,
          content: req.body.content,
          name: req.body.name,
          collection: req.body.collection,
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

app.delete(
  "/api/entries/:collection/:entity",
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
  "/api/collections/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getCollections(req.params.sha);
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  "/api/branches",
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
