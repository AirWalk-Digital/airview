export const config = {
  collections: {
    application: {
      name: "Application",
      id: "application",
      meta: [],
      placeholder: "Enter some body content for the application...",
    },
    knowledge: {
      name: "Knowledge",
      id: "knowledge",
      meta: [
        {
          type: "entry_select",
          name: "parent",
          label: "Parent",
        },
      ],
      placeholder: "Enter some body content for the knowledge document...",
    },
    release: {
      name: "Release",
      id: "release",
      meta: [
        {
          type: "entry_select",
          name: "parent",
          label: "Parent",
        },
      ],
      placeholder: "Enter some body content for the release document...",
    },
  },
};
