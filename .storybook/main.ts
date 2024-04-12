import type { StorybookConfig } from "@storybook/react-webpack5";
import {config as webpackConfig} from "./webpack.config";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module?.rules ? config.module.rules : [],
          ...webpackConfig.module.rules
        ]
      },
      resolve: {
        ...config.resolve,
        extensions: [
          ...config.resolve?.extensions ? config.resolve.extensions : [],
          ...webpackConfig.resolve.extensions
        ]
      }
    }
  }
};
export default config;
