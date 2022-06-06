import { rest } from "msw";
//@ts-ignore
import { setupServer } from "msw/lib/node/index.js";

const branches = [
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

const createTree = (baseSha: string): Record<string, any> => {
  const ret: Record<string, any> = {};
  const tree = trees[baseSha];
  ret[baseSha] = tree;
  const parent = createTree(tree.sha);
  if (parent) ret[parent.sha] = parent;
  return ret;
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
  )
);

export function startMockServer() {
  server.listen();
}
