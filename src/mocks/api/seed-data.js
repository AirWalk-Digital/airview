import { nanoid } from "nanoid";
import matter from "gray-matter";

export const seedData = {
  "application/ms_teams": {
    contentVersion: nanoid(),
    collection: "application",
    meta: {
      title: "Microsoft Teams",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa(
          matter.stringify("I am body content for Microsoft Teams", {
            title: "Microsoft Teams",
          })
        ),
      },
    },
  },
  "application/ms_outlook": {
    contentVersion: nanoid(),
    collection: "application",
    meta: {
      title: "Microsoft Outlook",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa(
          matter.stringify("I am body content for Microsoft Outlook", {
            title: "Microsoft Outlook",
          })
        ),
      },
    },
  },
};
