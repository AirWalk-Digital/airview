import { nanoid } from "nanoid";
import matter from "gray-matter";

export function createSeedData() {
  const branches = {
    main: { name: "main", sha: nanoid(), isProtected: true },
    one: { name: "one", sha: nanoid(), isProtected: false },
    two: { name: "two", sha: nanoid(), isProtected: false },
  };

  const entries = {
    [branches.main.name]: {
      "application/ms_teams": {
        sha: nanoid(),
        collection: "application",
        meta: {
          title: "Microsoft Teams",
        },
        content: {
          _index: btoa(
            matter.stringify("I am body content for Microsoft Teams", {
              title: "Microsoft Teams",
            })
          ),
        },
      },
      "application/ms_outlook": {
        sha: nanoid(),
        collection: "application",
        meta: {
          title: "Microsoft Outlook",
        },
        content: {
          _index: btoa(
            matter.stringify("I am body content for Microsoft Outlook", {
              title: "Microsoft Outlook",
            })
          ),
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
          _index: btoa(
            matter.stringify("I am body content for Place Call on Hold", {
              title: "Place Call on Hold",
            })
          ),

          section_one: btoa(
            matter.stringify(
              "I am body content for Place Call on Hold - section one"
            )
          ),
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
          _index: btoa(
            matter.stringify("I am body content for Composing a new message", {
              title: "Composing a new message",
            })
          ),
          section_one: btoa(
            matter.stringify(
              "I am body content for Composing a new message - section one"
            )
          ),
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
          _index: btoa(
            matter.stringify("I am body content for Security Patch", {
              title: "Security Patch",
            })
          ),
        },
      },
    },
    [branches.one.name]: {
      "release/security_patch": {
        sha: nanoid(),
        collection: "release",
        meta: {
          title: "Security Patch",
          parent: "application/ms_teams",
        },
        content: {
          _index: btoa(
            matter.stringify(
              "I am branch one body content for Security Patch",
              {
                title: "Security Patch",
              }
            )
          ),
        },
      },
    },
    [branches.two.name]: {},
  };

  return {
    branches,
    entries,
  };
}
