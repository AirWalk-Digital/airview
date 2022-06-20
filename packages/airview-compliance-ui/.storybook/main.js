module.exports = {
  stories: [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react",
  features: {
    storyStoreV7: true,
  },
  staticDirs: ["../public"],
};
