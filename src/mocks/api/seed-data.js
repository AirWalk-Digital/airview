import { nanoid } from "nanoid";
import matter from "gray-matter";

// Change to factory and return new object when called
export const seedData = {
  "application/ms_teams": {
    sha: nanoid(),
    collection: "application",
    meta: {
      title: "Microsoft Teams",
    },
    content: {
      "index.md": {
        content: btoa(
          matter.stringify("I am body content for Microsoft Teams", {
            title: "Microsoft Teams",
          })
        ),
      },
    },
  },
  "application/ms_outlook": {
    sha: nanoid(),
    collection: "application",
    meta: {
      title: "Microsoft Outlook",
    },
    content: {
      "index.md": {
        content: btoa(
          matter.stringify("I am body content for Microsoft Outlook", {
            title: "Microsoft Outlook",
          })
        ),
      },
    },
  },
  "knowledge/place_call_on_hold": {
    sha: nanoid(),
    collection: "knowledge",
    meta: {
      title: "Place Call on Hold",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        content: btoa(
          matter.stringify("I am body content for Place Call on Hold", {
            title: "Place Call on Hold",
          })
        ),
      },
      "section_one.md": {
        content: btoa(
          matter.stringify(
            "I am body content for Place Call on Hold - section one"
          )
        ),
      },
    },
  },
  "knowledge/composing_a_new_message": {
    sha: nanoid(),
    collection: "knowledge",
    meta: {
      title: "Composing a new message",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        content: btoa(
          matter.stringify("I am body content for Composing a new message", {
            title: "Composing a new message",
          })
        ),
      },
      "section_one.md": {
        content: btoa(
          matter.stringify(
            "I am body content for Composing a new message - section one"
          )
        ),
      },
    },
  },
  "release/security_patch": {
    sha: nanoid(),
    collection: "release",
    meta: {
      title: "Security Patch",
      parent: "application/ms_teams",
    },
    content: {
      "index.md": {
        content: btoa(
          matter.stringify("I am body content for Security Patch", {
            title: "Security Patch",
          })
        ),
      },
    },
  },
};
