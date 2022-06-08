import { MockedRequest, rest } from "msw";
import { randomUUID } from "crypto";
//@ts-ignore
import { setupServer } from "msw/lib/node/index.js";
import fs from "fs";

// interface InboundBlob {
//   content: string;
// }

function createTree(item: any) {
  // return;
  const branch = trees[item.base_tree];

  const collectionName = item.tree[0].path.split("/")[0];
  const entityName = item.tree[0].path.split("/")[1];

  const collection = branch.tree.find((f: any) => f.path === collectionName);
  const entities = trees[collection.sha].tree;
  const entity = entities.find((f: any) => f.path === entityName);

  const branchSha = randomUUID();
  const collectionSha = randomUUID();
  const entitySha = randomUUID();

  const newCollections = branch.tree.filter(
    (f: any) => f.path !== collectionName
  );
  newCollections.push({ ...collection, sha: collectionSha });
  // let index = branch.tree.indexOf(collection);
  // if (~index) {
  // branch.tree.splice(index, 1);
  // console.log(branch);
  // }
  // branch.tree.push({ ...collection, sha: collectionSha });

  const newEntities = entities.filter((f: any) => f.path !== entityName);
  newEntities.push({ ...entity, sha: entitySha });
  // index = entities.indexOf(entity);
  // if (~index) {
  // entities.splice(index, 1);
  // }
  // entities.push({ ...entity, sha: entitySha });

  const content = {
    sha: entitySha,
    tree: item.tree.map((i: any) => ({
      ...i,
      path: i.path.replace(`${collectionName}/${entityName}/`, ""),
      type: "blob",
    })),
  };

  trees[branchSha] = { sha: branchSha, tree: newCollections };
  trees[collectionSha] = { sha: collectionSha, tree: newEntities };
  trees[entitySha] = content;
  const thisBranch = branches.find((f) => f.name === "main");
  if (thisBranch) {
    thisBranch.commit.sha = branchSha;
    branches = branches.filter((f) => f.name !== "main");
    branches.push(thisBranch);
  }
  fs.writeFileSync("/tmp/branches.json", JSON.stringify(branches));
  fs.writeFileSync("/tmp/trees.json", JSON.stringify(trees));
  // const protected = thisBranch ? thisBranch.protected: false;
  // const newBranch = {name: "main", commit: {sha: branchSha}, protected}
}

let branches = [
  {
    name: "main",
    commit: {
      sha: "aaa",
    },
    protected: true,
  },
  {
    name: "dev",
    commit: {
      sha: "bbb",
    },
    protected: false,
  },
];

const trees: any = {
  ccc: {
    sha: "ccc",
    tree: [
      {
        path: "applications",
        type: "tree",
        sha: "ddd",
      },
    ],
  },
  ddd: {
    sha: "ddd",
    tree: [
      {
        path: "article_new",
        type: "tree",
        sha: "fff",
      },
    ],
  },
  fff: {
    sha: "fff",
    tree: [
      {
        path: "_index.md",
        type: "blob",
        sha: "ggg",
      },
    ],
  },
  ggg: {
    sha: "ggg",
    content:
      "LS0tCnRpdGxlOiBLQiBPbmUKcGFyZW50OiBhcHBsaWNhdGlvbi90ZXN0X2Fw\ncAotLS0KCg==\n",
  },
};

const server = setupServer(
  // NOT "/user", nothing to be relative to!
  rest.get(
    "https://api.github.com/repos/mock-org/mock-repo/branches",
    (req, res, ctx) => {
      return res(ctx.json(branches));
    }
  ),
  rest.get(
    "https://api.github.com/repos/mock-org/mock-repo/git/trees/:sha",
    (req, res, ctx) => {
      const sha = req.params.sha;
      if (sha instanceof Array) {
        throw Error;
      }
      const tree = trees[sha];
      return res(ctx.json(tree));
    }
  ),
  rest.get(
    "https://api.github.com/repos/mock-org/mock-repo/git/blobs/:sha",
    (req, res, ctx) => {
      const sha = req.params.sha;
      if (sha instanceof Array) {
        return res(ctx.json({}));
        throw Error;
      }
      const tree = trees[sha];
      return res(ctx.json(tree));
    }
  ),
  rest.post(
    "https://api.github.com/repos/mock-org/mock-repo/git/blobs",
    (req, res, ctx) => {
      try {
        const { content } = <any>req.body;

        const sha = randomUUID();
        trees[sha] = { sha, type: "blob", content: content };

        return res(ctx.status(201), ctx.json({ sha }));
      } catch {
        console.log("error");
        return res(ctx.status(500));
      }
    }
  ),
  rest.post(
    "https://api.github.com/repos/mock-org/mock-repo/git/trees",
    (req, res, ctx) => {
      // try {
      const body = <any>req.body;
      createTree(body);

      console.log(trees);
      return res(
        // ctx.set("Content-Type", "application/vnd.github.v3+json"),
        ctx.json({ sha: "dummy" })
      );
      // } catch {
      // console.log("error");
      // return res(ctx.status(500));
      // }
    }
  ),
  rest.post(
    "https://api.github.com/repos/mock-org/mock-repo/git/commits",
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ sha: "commitsha" }));
    }
  ),
  rest.get(
    "https://api.github.com/repos/mock-org/mock-repo/git/refs/heads/main",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),
  rest.patch(
    "https://api.github.com/repos/mock-org/mock-repo/git/refs/heads/main",
    (req, res, ctx) => {
      return res(ctx.status(201));
    }
  )

  // try {
);

// export function startMockServer() {
// console.log("start");
// server.listen();
// }

export default server;
