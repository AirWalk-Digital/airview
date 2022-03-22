export const config = {
  collections: {
    application: {
      name: "Application",
      id: "application",
      frontmatter: [],
      placeholder: "Enter some body content for the application...",
    },
    knowledge: {
      name: "Knowledge",
      id: "knowledge",
      frontmatter: [
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
      frontmatter: [
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
