import { nanoid } from "nanoid";

export const seedData = [
  {
    id: "application/ms_teams",
    collection: "application",
    meta: {
      title: "Microsoft Teams",
    },
    content: [
      {
        name: "index.md",
        sha: nanoid(),
        content: btoa("I am body content for Microsoft Teams"),
      },
    ],
  },
  {
    id: "application/ms_outlook",
    collection: "application",
    meta: {
      title: "Microsoft Outlook",
    },
    content: [
      {
        name: "index.md",
        sha: nanoid(),
        content: btoa("I am body content for Microsoft Outlook"),
      },
    ],
  },
];
