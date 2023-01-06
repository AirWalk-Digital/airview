import fs from "fs";
import express, { Response, Request, NextFunction } from "express";
import { CmsBackend, S3Cache, GithubClient } from "airview-cms-api";
import { fileTypeFromBuffer } from "file-type";

const getCache = () => {
  const _cache: any = {};
  const get = (key: string) => {
    return _cache[key];
  };
  const set = (key: string, value: any) => (_cache[key] = value);
  return { get, set };
};
const cache = getCache();

// const bucket = process.env.AWS_S3_BUCKET;
// const region = process.env.AWS_S3_REGION;
// if (bucket === undefined) throw Error("No S3 Bucket defined");
// if (region === undefined) throw Error("No S3 Region defined");

const appId = process.env.GITHUB_APP_ID;
const installationId = process.env.GITHUB_INSTALLATION_ID;
const privateKeyPath: string = process.env.GITHUB_PRIVATE_KEY_FILE || "";
const repo = process.env.GITHUB_REPO_NAME;
const org = process.env.GITHUB_ORG_NAME;

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

const client = new GithubClient({
  applicationId: appId!,
  installationId: installationId!,
  privateKey: privateKey,
  repositoryName: repo!,
  organisation: org!,
});

// const cache = new S3Cache({
//   bucketRegion: region,
//   bucketName: bucket,
// });

const backend = new CmsBackend(client, cache);

const app = express();

app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 3000;

app.get(
  "/api/cms/content/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.path !== "string") {
        res.status(400).send();
        return;
      }
      const data = await backend.getTreeContent(req.params.sha, req.query.path);
      res.send(data);
    } catch (err) {
      res.status(404).send();
    }
  }
);

app.get(
  "/api/cms/external-content/:repo/:owner",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.path !== "string") {
        res.status(400).send();
        return;
      }
      const data = await backend.getExternalData(
        req.params.repo,
        req.params.owner,
        req.query.path
      );
      res.send(data);
    } catch (err) {
      res.status(404).send();
    }
  }
);

app.get(
  "/api/cms/external-media/:repo/:owner",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.path !== "string") {
        res.status(400).send();
        return;
      }
      const data = await backend.getExternalData(
        req.params.repo,
        req.params.owner,
        req.query.path
      );
      const buffer = Buffer.from(data.content, "base64");
      res.setHeader("content-type", "application/octet-stream");
      res.write(buffer, "binary");
      res.end(undefined, "binary");
    } catch (err) {
      res.status(404).send();
    }
  }
);

app.get(
  "/api/cms/media/:sha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query.path !== "string") {
        res.status(400).send();
        return;
      }
      const data = await backend.getTreeContent(req.params.sha, req.query.path);
      const buffer = Buffer.from(data.content, "base64");
      const contentType = await fileTypeFromBuffer(buffer);
      res.setHeader(
        "content-type",
        contentType?.mime || "application/octet-stream"
      );
      res.write(buffer, "binary");
      res.end(undefined, "binary");
    } catch (err) {
      res.status(404).send();
      next(err);
    }
  }
);

app.put("/api/cms/content/:collection/:entity", async (req, res, next) => {
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
  "/api/cms/content/:collection/:entity",
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
  "/api/cms/entries/:sha",
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
  "/api/cms/branches",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.getBranches();
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/api/cms/branches",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseSha = req.body.baseSha;
      const branchName = req.body.name;

      const result = await backend.createBranch(baseSha, branchName);
      if (!result.error) res.status(201).send(null);
      else if (result.error === "conflict") res.status(422).send(null);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/api/cms/pulls",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await backend.createPullRequest(req.body);
      if (data.value) res.status(200).send(data.value);
      else if (data.error === "conflict") res.status(422).send(null);
    } catch (err) {
      next(err);
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
