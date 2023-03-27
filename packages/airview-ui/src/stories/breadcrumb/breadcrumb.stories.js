import React from "react";
import { Breadcrumb } from "../../features";
import Documentation from "./breadcrumb.doc.md";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

function Template(args) {
  return <Breadcrumb {...args} />;
}

Template.args = {
  currentRoute: "Current Route",
};

Template.argsTypes = {
  linkComponent: {
    control: false,
  },
  sx: {
    control: false,
  },
};

export const Loading = Template.bind({});

Loading.args = {
  ...Template.args,
  loading: true,
  fetching: false,
  links: [],
  currentRoute: "",
};

Loading.argTypes = {
  ...Template.argsTypes,
};

export const FetchingWithoutCollapsedBreadcrumbs = Template.bind({});

FetchingWithoutCollapsedBreadcrumbs.args = {
  ...Template.args,
  loading: false,
  fetching: true,
  links: [
    {
      label: "Route One",
      url: "/",
    },
    {
      label: "Route Two",
      url: "/",
    },
    {
      label: "Route Three",
      url: "/",
    },
    {
      label: "Route Four",
      url: "/",
    },
  ],
  currentRoute: "Current Route",
};

FetchingWithoutCollapsedBreadcrumbs.argTypes = {
  ...Template.argsTypes,
};

export const FetchingWithCollapsedBreadcrumbs = Template.bind({});

FetchingWithCollapsedBreadcrumbs.args = {
  ...FetchingWithoutCollapsedBreadcrumbs.args,
  links: [
    ...FetchingWithoutCollapsedBreadcrumbs.args.links,
    {
      label: "Route Five",
      url: "/",
    },
  ],
};

FetchingWithCollapsedBreadcrumbs.argTypes = {
  ...Template.argsTypes,
};

export const LoadedWithoutCollapsedBreadcrumbs = Template.bind({});

LoadedWithoutCollapsedBreadcrumbs.args = {
  ...Template.args,
  loading: false,
  fetching: false,
  links: [...FetchingWithoutCollapsedBreadcrumbs.args.links],
};

LoadedWithoutCollapsedBreadcrumbs.argTypes = {
  ...Template.argsTypes,
};

export const LoadedWithCollapsedBreadcrumbs = Template.bind({});

LoadedWithCollapsedBreadcrumbs.args = {
  ...LoadedWithoutCollapsedBreadcrumbs.args,
  links: [...FetchingWithCollapsedBreadcrumbs.args.links],
};

LoadedWithCollapsedBreadcrumbs.argTypes = {
  ...Template.argsTypes,
};
