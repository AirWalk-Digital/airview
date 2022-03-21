import { nanoid } from "nanoid";

export const seedData = {
  microsoft_teams: {
    sha: nanoid(),
    files: [
      {
        name: "index.md",
        sha: nanoid(),
        frontmatter: {
          title: "Microsoft Teams",
          collection: "application",
        },
        body: "I am body content for Microsoft Teams",
      },
    ],
  },
  microsoft_outlook: {
    sha: nanoid(),
    files: [
      {
        name: "index.md",
        sha: nanoid(),
        frontmatter: {
          title: "Microsoft Outlook",
          collection: "application",
        },
        body: "I am body content for Microsoft Outlook",
      },
    ],
  },
};
