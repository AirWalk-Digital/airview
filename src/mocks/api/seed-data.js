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
  "knowledge/place_call_on_hold": {
    contentVersion: nanoid(),
    collection: "knowledge",
    meta: {
      title: "Place Call on Hold",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa(
          matter.stringify("I am body content for Place Call on Hold", {
            title: "Place Call on Hold",
          })
        ),
      },
    },
  },
  "knowledge/composing_a_new_message": {
    contentVersion: nanoid(),
    collection: "knowledge",
    meta: {
      title: "Composing a new message",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa(
          matter.stringify("I am body content for Composing a new message", {
            title: "Composing a new message",
          })
        ),
      },
    },
  },
  "release/security_patch": {
    contentVersion: nanoid(),
    collection: "release",
    meta: {
      title: "Security Patch",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        sha: nanoid(),
        content: btoa(
          matter.stringify("I am body content for Security Patch", {
            title: "Security Patch",
          })
        ),
      },
    },
  },
};
