import express, { Response, Request, NextFunction } from "express";
import {
  CmsBackend,
  S3Cache,
  GithubClient,
  CmsCache,
  getTokenFromPrivateKeyCb,
} from "airview-cms-api";
// import { startMockServer } from "./mock.js";
// import { setupServer } from "msw/lib/node/index.js";
import fetch from "node-fetch";

import server from "./mock.js";

// import { rest } from "msw";

const useMock = true;

class MockCache {
  get = async (key: any) => undefined;
  set = async (key: any, value: any) => {};
}

// const tokenCallback = async () => "none";
// const cache = new MockCache();

// const client = new GithubClient(tokenCallback);
// const backend = new CmsBackend(client, cache);

// const server = setupServer(
//   rest.post(
//     "http://api.github.com/repos/mock-org/mock-repo/git/trees",
//     (req, res, ctx) => {
//       // try {
//       console.log(req);
//       console.log("begin");
//       // const body = <any>req.body;
//       // createTree(body);
//       return res(
//         // ctx.set("Content-Type", "application/vnd.github.v3+json"),
//         ctx.json({ sha: "dummy" })
//       );
//       // } catch {
//       // console.log("error");
//       // return res(ctx.status(500));
//       // }
//     }
//   )
// );

// server.listen();

// const useMock = true;

// class MockCache implements CmsCache {
//   get = async (key: string) => undefined;
//   set = async (key: string, value: any) => {};
// }

let tokenCallback;
let cache;
console.log(process.env.USE_MOCK);
if (process.env.USE_MOCK === "true") {
  console.log("mocked");
  tokenCallback = async () => "none";
  cache = new MockCache();
  server.listen();
} else {
  const privateKeyPath: string = process.env.PRIVATE_KEY_FILE || "";
  tokenCallback = getTokenFromPrivateKeyCb(privateKeyPath);

  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_S3_REGION;
  if (bucket === undefined) throw Error("No S3 Bucket defined");
  if (region === undefined) throw Error("No S3 Region defined");
  // cache = new S3Cache(region, bucket);
  cache = new MockCache();
}
const client = new GithubClient(tokenCallback);
const backend = new CmsBackend(client, cache);

const app = express();

app.use(express.json());

const port = 3000;

app.post("/test", async (req: Request, res: Response, next: NextFunction) => {
  const resp = await fetch(
    "https://api.github.com/repos/mock-org/mock-repo/git/test",
    { method: "POST" }
  );
  res.status(200).send();
});
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

app.post(
  "/entries/",
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
  "/entries/:collection/:entity",
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
  "/collections/:sha",
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
