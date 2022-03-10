import { rest } from "msw";
import slugify from "slugify";
import { factory, oneOf, primaryKey, nullable } from "@mswjs/data";
import initialData from "./intial_data.json";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 0;

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
    collection: oneOf("collections"),
    parent: nullable(oneOf("entries")),
    body: String,
  },
});

function createCollection(collection) {
  return {
    id: slugify(collection, SLUGIFY_CONFIG),
    name: collection,
  };
}

function createEntry(entryData) {
  const { name, collection, parent, body } = entryData;

  return {
    id: slugify(name, SLUGIFY_CONFIG),
    name,
    collection: db.collections.findFirst({
      where: {
        id: {
          equals: slugify(collection, SLUGIFY_CONFIG),
        },
      },
    }),
    ...(parent && {
      parent: db.entries.findFirst({
        where: {
          id: {
            equals: slugify(parent, SLUGIFY_CONFIG),
          },
        },
      }),
    }),
    body,
  };
}

initialData.collections.forEach((collection) => {
  db.collections.create(createCollection(collection));
});

initialData.entries.forEach((entry) => {
  db.entries.create(createEntry(entry));
});

export const handlers = [
  rest.get("/api/entries/meta", function (req, res, ctx) {
    const entries = db.entries.getAll();

    const entiesMeta = entries.map((entry) => {
      const { id, name, collection, parent } = entry;

      return {
        id,
        name,
        collection: collection.id,
        parent: parent?.id,
      };
    });

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.get("/api/entries/:entryId/body", function (req, res, ctx) {
    const entry = db.entries.findFirst({
      where: {
        id: {
          equals: req.params.entryId,
        },
      },
    });

    const entryBody = entry.body;

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entryBody));
  }),
];
