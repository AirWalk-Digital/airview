import { rest } from "msw";
import { nanoid } from "nanoid";
import { factory, primaryKey, nullable } from "@mswjs/data";
import initialData from "./intial_data.json";
import { createStore } from "./create-store";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500;

const {
  getEntries,
  getEntryContent,
  dropEntry,
  dropAllEntries,
  persistContent,
} = createStore();

const db = factory({
  entries: {
    id: primaryKey(String),
    name: String,
    sha: String,
    collection: String,
    parent: nullable(String),
    body: Array,
  },
});

function createEntryData(entryData) {
  const { id, name, collection, parent, body } = entryData;

  return {
    id: id ?? nanoid(),
    name,
    sha: nanoid(),
    collection,
    parent,
    body,
  };
}

function getAllEntriesMeta() {
  return getEntries();
  const entries = db.entries.getAll();

  return entries.map((entry) => {
    const { body, ...rest } = entry;

    return rest;
  });
}

initialData.entries.forEach((entry) => {
  db.entries.create(createEntryData(entry));
});

export const handlers = [
  rest.get("/api/entries", function (req, res, ctx) {
    const entiesMeta = getAllEntriesMeta();

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(entiesMeta));
  }),
  rest.get("/api/content/:collection/:entity/:sha", function (req, res, ctx) {
    const id = `${req.params.collection}/${req.params.entity}`;
    const content = getEntryContent(id, "");

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(content));
  }),
  rest.post("/api/entries", function (req, res, ctx) {
    db.entries.create(createEntryData(req.body));

    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
  }),
  rest.put("/api/content/:collection/:entity", function (req, res, ctx) {
    const id = `${req.params.collection}/${req.params.entity}`;
    persistContent(id, req.body);
    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
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

    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
  }),
  rest.delete("/api/content", function (req, res, ctx) {
    dropAllEntries();
    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
  }),
  rest.delete("/api/content/:collection/:entity", function (req, res, ctx) {
    const id = `${req.params.collection}/${req.params.entity}`;
    dropEntry(id);
    return res(ctx.delay(ARTIFICIAL_DELAY_MS));
  }),
];
