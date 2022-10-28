import { nanoid } from "nanoid";
import matter from "gray-matter";
import md from "./markdown-content.md";

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
          external_repo: "external_repo",
          external_owner: "external_owner",
          external_path: "README.md",
        },
        content: {
          "_index.md": btoa(
            matter.stringify(
              "I am body content for Microsoft Teams \n \n This is an external link: [https://github.com/external_repo/external_owner/blob/main/README.md](https://github.com/AirWalk-Digital/terraform-aws-airview/blob/main/README.md) \n \n Some other random stuff.",
              {
                title: "Microsoft Teams",
                external_repo: "external_repo",
                external_owner: "external_owner",
                external_path: "README.md",
              }
            )
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
          "_index.md": btoa(
            matter.stringify(md, {
              title: "Microsoft Outlook",
            })
          ),
          "test-img.jpeg":
            "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",
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
          "_index.md": btoa(
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
          "_index.md": btoa(
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
          "_index.md": btoa(
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
          "_index.md": btoa(
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
          "_index.md": btoa(
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

  const external_content = {
    ["external_repo"]: {
      external_owner: {
        "README.md": btoa(
          matter.stringify("I am the content of the external repo")
        ),
      },
    },
    ["external_repo_2"]: {
      external_owner_2: {
        "README.md": btoa(
          matter.stringify("Some random content of the extenral repo2")
        ),
      },
    },
  };

  return {
    branches,
    entries,
    external_content,
  };
}
