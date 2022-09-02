import dayjs from "dayjs";

export const config = {
  baseBranch: "main",
  baseUrl: "/api",
  collections: {
    application: {
      label: "Application",
      fields: [
        {
          label: "User Facing",
          name: "user_facing",
          defaultValue: false,
          widget: "boolean",
        },
      ],
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
