export const config = {
  collections: {
    application: {
      name: "Application",
      id: "application",
      files: [
        {
          name: "index.md",
          fields: [
            {
              type: "string",
              required: true,
              name: "name",
              label: "Name",
              placeholder: "Enter an application name...",
            },
            {
              type: "textarea",
              required: false,
              name: "body",
              label: "Main body",
              placeholder: "Enter some body content for the application...",
            },
          ],
        },
      ],
    },
    knowledge: {
      name: "Knowledge",
      id: "knowledge",
      files: [
        {
          name: "index.md",
          fields: [
            {
              type: "string",
              required: true,
              name: "name",
              label: "Name",
              placeholder: "Enter a name for the document...",
            },
            {
              type: "entry_selector",
              required: false,
              name: "parent",
              label: "Parent",
              // value_field: "id",
              // display_field: "name"
            },
            {
              type: "textarea",
              required: false,
              name: "body",
              label: "Main body",
              placeholder: "Enter some body content for the document...",
            },
          ],
        },
        {
          name: "subsection.md",
          fields: [
            {
              type: "textarea",
              required: false,
              name: "body",
              label: "Subsection body",
              placeholder: "Enter some body content for the subsection...",
            },
          ],
        },
      ],
    },
    release: {
      name: "Release",
      id: "release",
      files: [
        {
          name: "index.md",
          fields: [
            {
              type: "string",
              required: true,
              name: "name",
              label: "Name",
              placeholder: "Enter a name for the document...",
            },
            {
              type: "relationship",
              required: false,
              name: "parent",
              label: "Parent",
              placeholder: "Choose an entry...",
              collection: "application",
              value_field: "id",
              display_field: "name",
            },
            {
              type: "textarea",
              required: false,
              name: "body",
              label: "Main body",
              placeholder: "Enter some body content for the document...",
            },
          ],
        },
      ],
    },
  },
};
