import { nanoid } from "nanoid";

export const seedData = {
  "application/ms_teams": {
    collection: "application",
    meta: {
      title: "Microsoft Teams",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa("I am body content for Microsoft Teams"),
      },
    },
  },
  "application/ms_outlook": {
    collection: "application",
    meta: {
      title: "Microsoft Outlook",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa("I am body content for Microsoft Outlook"),
      },
    },
  },
};
