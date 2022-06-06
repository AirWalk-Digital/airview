const trees = {
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

const createTree = (baseSha) => {
  // const ret = {};
  const tree = trees[baseSha];
  console.log(tree);
  return;
  // ret[baseSha] = tree;
  // const parent = createTree(tree.sha);
  // if (parent) ret[parent.sha] = parent;
  // return ret;
};

console.log(createTree("fff"));
