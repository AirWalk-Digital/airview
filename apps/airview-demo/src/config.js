import dayjs from "dayjs";

export const config = {
  baseBranch: "main",
  collections: {
    application: {
      label: "Application",
      fields: [],
    },
    knowledge: {
      label: "Knowledge",
      fields: [
        {
          label: "Parent Entry",
          name: "parent",
          widget: "entrySelect",
          excludeSelf: true,
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
          excludeSelf: true,
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
