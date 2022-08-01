import React from "react";
import { screen, userEvent } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import { Search } from "../../features";
import Documentation from "./search.doc.md";

export default {
  title: "Components/Search",
  component: Search,
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

const delay = 1000;
const inputDelay = 100;

const responses = {
  resolved: [
    {
      title: "Integer urna ipsum",
      summary:
        "Feugiat ac nulla ac, urna mattis dignissim risus ipsum. Sed feugiat vitae ligula eu pulvinar",
      linkProps: {
        href: "/",
      },
    },
    {
      title: "Integer urna ipsum",
      linkProps: {
        href: "/",
      },
    },
    {
      title: "Integer urna ipsum",
      summary:
        "Feugiat ac nulla ac, urna mattis dignissim risus ipsum. Sed feugiat vitae ligula eu pulvinar",
      linkProps: {
        href: "/",
      },
    },
    {
      title: "Integer urna ipsum",
      summary:
        "Feugiat ac nulla ac, urna mattis dignissim risus ipsum. Sed feugiat vitae ligula eu pulvinar",
      linkProps: {
        href: "/",
      },
    },
    {
      title: "Integer urna ipsum",
      summary:
        "Feugiat ac nulla ac, urna mattis dignissim risus ipsum. Sed feugiat vitae ligula eu pulvinar",
      linkProps: {
        href: "/",
      },
    },
    {
      title: "Integer urna ipsum",
      summary:
        "Feugiat ac nulla ac, urna mattis dignissim risus ipsum. Sed feugiat vitae ligula eu pulvinar",
      linkProps: {
        href: "/",
      },
    },
  ],
  rejected: { message: "There was an error" },
};

const Template = (args) => <Search {...args} />;

Template.args = {
  open: true,
  linkComponent: "a",
};

Template.argTypes = {
  linkComponent: {
    control: false,
  },
};

export const Default = {
  ...Template,
  args: {
    ...Template.args,
    onQueryChange: async (query) => {
      action("onQueryChange")(query);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([responses.resolved[0]]);
        }, delay);
      });
    },
  },
};

export const SearchInProgress = {
  ...Template,
  args: {
    ...Template.args,
    onQueryChange: async (query) => {
      action("onQueryChange")(query);

      return new Promise(() => {});
    },
  },
  play: async ({ searchQuery = "ipsum" }) => {
    const searchDialog = await screen.findByRole("searchbox");

    await userEvent.type(searchDialog, searchQuery, { delay: inputDelay });
  },
};

export const SingleResultFound = {
  ...Default,
  play: SearchInProgress.play,
};

export const MultipleResultsFound = {
  ...SingleResultFound,
  args: {
    ...SingleResultFound.args,
    onQueryChange: async (query) => {
      action("onQueryChange")(query);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(responses.resolved);
        }, delay);
      });
    },
  },
};

export const NoResultsFound = {
  ...SingleResultFound,
  args: {
    ...SingleResultFound.args,
    onQueryChange: async (query) => {
      action("onQueryChange")(query);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, delay);
      });
    },
  },
};

export const Error = {
  ...SingleResultFound,
  args: {
    ...SingleResultFound.args,
    onQueryChange: async (query) => {
      action("onQueryChange")(query);

      return new Promise((_, reject) => {
        setTimeout(() => {
          reject({ message: "There was an error" });
        }, delay);
      });
    },
  },
};
