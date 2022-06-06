const trees = {
  ccc: {
    sha: "ccc",
    tree: [
      {
        path: "applications",
        type: "tree",
        sha: "ddd",
      },
      {
        path: "other",
        type: "tree",
        sha: "xxx",
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

const createTree = (item) => {
  const branch = trees[item.base_sha];

  const collectionName = item.tree[0].path.split("/")[0];
  const entityName = item.tree[0].path.split("/")[1];

  const collection = branch.tree.find((f) => f.path === collectionName);
  const entities = trees[collection.sha].tree;
  const entity = entities.find((f) => f.path === entityName);

  const branchSha = "111";
  const collectionSha = "222";
  const entitySha = "333";

  let index = branch.tree.indexOf(collection);
  if (~index) {
    branch.tree.splice(index, 1);
  }
  branch.tree.push({ ...collection, sha: collectionSha });

  index = entities.indexOf(entity);
  if (~index) {
    entities.splice(index, 1);
  }
  entities.push({ ...entity, sha: entitySha });

  const content = {
    sha: entitySha,
    tree: item.tree.map((i) => ({
      ...i,
      path: i.path.replace(`${collectionName}/${entityName}/`, ""),
      type: "blob",
    })),
  };

  trees[branchSha] = branch;
  trees[collectionSha] = entities;
  trees[entitySha] = content;
};

createTree({
  base_sha: "ccc",
  tree: [
    {
      path: "applications/article_new/index.md",
      sha: "248dbae745ebcc38a69efd6613bfc2d3247faad6",
    },
  ],
});
