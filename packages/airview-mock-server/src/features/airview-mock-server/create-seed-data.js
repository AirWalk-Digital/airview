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
          "_index.md": btoa(
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
          "_index.md": btoa(
            matter.stringify(
              "I am body content for Microsoft Outlook \n\n  ![Test Image](test-img.jpeg)",
              {
                title: "Microsoft Outlook",
              }
            )
          ),
          "test-img.jpeg":
            "iVBORw0KGgoAAAANSUhEUgAAAIwAAABkBAMAAACm+cXiAAAAG1BMVEXMzMyWlpacnJzFxcW3t7e+vr6jo6OxsbGqqqqoPjQzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA2ElEQVRYhe3SMQ6CQBAF0GGBQCkBrFU0sRziBcR4AJELyA2INpRUyLFdBhIoASuS/6rNL34ms0MEAAAAAACwboqJYrYO11FwO9IomCTRNTmn93AI7CB5jIIpDI/JzvlL5RC4hVMNwSR2yqRSPtGT6E21BOph7ySYMw5TaXBEsd7KJ5RAsbmRYFaNGRnst3XWtpJAP30JZtW4RT+NXvUf0yjPC7pV7PuaRbsxL3HWtB/jnF/deJVTNfN+SlZgdHcTZ92KF9xNXyNHW+svl2DBFQMAAAAAwOr9AMPbIYfChnnxAAAAAElFTkSuQmCC",
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

  return {
    branches,
    entries,
  };
}
