import { rest } from "msw";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { factory, oneOf, primaryKey, nullable } from "@mswjs/data";
import initialData from "./intial_data.json";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500;

const SLUGIFY_CONFIG = {
  lower: true,
  replacement: "_",
};

const db = factory({
  collections: {
    id: primaryKey(String),
    name: String,
  },
  entries: {
    id: primaryKey(String),
    name: String,
    sha: String,
    collection: oneOf("collections"),
    parent: nullable(oneOf("entries")),
    body: nullable(String),
  },
});

function createCollectionData(collection) {
  return {
    id: slugify(collection, SLUGIFY_CONFIG),
    name: collection,
  };
}

function createEntryData(entryData) {
  const { id, name, collection, parent, body } = entryData;

  return {
    id: id ?? nanoid(),
    name,
    sha: nanoid(),
    collection: db.collections.findFirst({
      where: {
        id: {
          equals: slugify(collection, SLUGIFY_CONFIG),
        },
      },
    }),
    ...(parent
      ? {
          parent: db.entries.findFirst({
            where: {
              id: {
                equals: parent,
              },
            },
          }),
        }
      : { parent: null }),
    body,
  };
}

function getAllEntriesMeta() {
  const entries = db.entries.getAll();

  return entries.map((entry) => {
    const { id, name, sha, collection, parent } = entry;

    return {
      id,
      name,
      sha,
      collection: collection.id,
      parent: parent?.id,
    };
  });
}

initialData.collections.forEach((collection) => {
  db.collections.create(createCollectionData(collection));
});

initialData.entries.forEach((entry) => {
  db.entries.create(createEntryData(entry));
});

export const handlers = [
  rest.get("/api/entries", function (req, res, ctx) {
    const entiesMeta = getAllEntriesMeta();

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.get("/api/entries/:sha", function (req, res, ctx) {
    const entry = db.entries.findFirst({
      where: {
        sha: {
          equals: req.params.sha,
        },
      },
    });

    const entryBody = entry.body;

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entryBody));
  }),
  rest.post("/api/entries", function (req, res, ctx) {
    db.entries.create(createEntryData(req.body));

    const entiesMeta = getAllEntriesMeta();

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.post("/api/entries/:entryId", function (req, res, ctx) {
    const entry = createEntryData(req.body);

    db.entries.update({
      where: {
        id: {
          equals: req.params.entryId,
        },
      },
      data: entry,
      sha: nanoid(),
      strict: true,
    });

    const entiesMeta = getAllEntriesMeta();

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.delete("/api/entries/:entryId", function (req, res, ctx) {
    db.entries.delete({
      where: {
        id: {
          equals: req.params.entryId,
        },
      },
      strict: true,
    });

    const entiesMeta = getAllEntriesMeta();

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
];
