import dayjs from "dayjs";

export const config = {
  baseBranch: "main",
  baseUrl: "/api",
  collections: {
    application: {
      label: "Application",
      fields: [],
    },
    hidden: {
      label: "Hidden",
      hidden: true,
      fields: [],
    },
    knowledge: {
      label: "Knowledge",
      fields: [
        {
          label: "Parent Entry",
          name: "parent",
          widget: "entrySelect",
          collection: "application",
          required: true,
        },
        {
          label: "External Repo",
          name: "external_repo",
          widget: "string",
        },
        {
          label: "External Owner",
          name: "external_owner",
          widget: "string",
        },
        {
          label: "External Path",
          name: "external_path",
          widget: "string",
        },
      ],
      additionalFiles: ["section_one", "section_two"],
    },
    release: {
      label: "Release",
      fields: [
        {
          label: "Parent Entry",
          name: "parent",
          widget: "entrySelect",
          collection: "application",
          required: true,
        },
        {
          label: "Publish Date",
          name: "publish_date",
          widget: "date",
          required: true,
          //minDate: "2022-05-01T00:00:00Z",
          //maxDate: "2022-05-31T00:00:00Z",
          defaultValue: dayjs().toISOString(),
          //format: "DD/MM/YY",
        },
        {
          label: "User Facing",
          name: "user_facing",
          defaultValue: false,
          widget: "boolean",
        },
      ],
    },
  },
};
