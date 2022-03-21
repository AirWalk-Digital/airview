import { nanoid } from "nanoid";

export const seedData = [
  {
    id: "application/ms_teams",
    collection: "application",
    entity: "ms_teams",
    meta: {
      title: "Microsoft Teams",
    },
    content: [
      {
        name: "index.md",
        sha: nanoid(),
        body: "I am body content for Microsoft Teams",
      },
    ],
  },
  {
    id: "application/ms_outlook",
    collection: "application",
    entity: "ms_outlook",
    meta: {
      title: "Microsoft Outlook",
    },
    content: [
      {
        name: "index.md",
        sha: nanoid(),
        body: "I am body content for Microsoft Outlook",
      },
    ],
  },
];
