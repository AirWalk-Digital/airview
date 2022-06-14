import { nanoid } from "nanoid";
import matter from "gray-matter";

export function createSeedData() {
  const branches = {
    main: { name: "main", sha: nanoid(), isProtected: true },
    one: { name: "one", sha: nanoid(), isProtected: false },
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
              parent: "application/ms_teams",
            })
          ),
          section_one: btoa(
            matter.stringify(
              "I am body content for Place Call on Hold - section one"
            )
          ),
          section_two: btoa(
            matter.stringify(
              "I am body content for Place Call on Hold - section two"
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
              parent: "application/ms_teams",
            })
          ),
          section_one: btoa(
            matter.stringify(
              "I am body content for Composing a new message - section one"
            )
          ),
          section_two: btoa(
            matter.stringify(
              "I am body content for Composing a new message - section two"
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
          user_facing: false,
          publish_date: "2022-05-12T00:00:00Z",
        },
        content: {
          _index: btoa(
            matter.stringify("I am body content for Security Patch", {
              title: "Security Patch",
              parent: "application/ms_teams",
              user_facing: false,
              publish_date: "2022-05-12T00:00:00Z",
            })
          ),
        },
      },
    },
    [branches.one.name]: {
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
      "release/security_patch": {
        sha: nanoid(),
        collection: "release",
        meta: {
          title: "Security Patch!",
          parent: "application/ms_teams",
          user_facing: true,
          publish_date: "2022-04-12T00:00:00Z",
        },
        content: {
          _index: btoa(
            matter.stringify(
              "I am branch one body content for Security Patch",
              {
                title: "Security Patch!",
                parent: "application/ms_teams",
                user_facing: true,
                publish_date: "2022-04-12T00:00:00Z",
              }
            )
          ),
        },
      },
    },
  };

  return {
    branches,
    entries,
  };
}
