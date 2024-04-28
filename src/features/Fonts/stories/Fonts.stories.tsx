import { Meta, StoryObj } from "@storybook/react";
import { FontsProvider } from "../FontsProvider";
import FontsTester from "./FontsTester";
import { Fonts } from "./fonts";

const meta: Meta<typeof FontsProvider> = {
  // Meta
  title: "Features/Fonts",
  component: FontsProvider,
  parameters: {
    layout: "centered",
  },
  // Args
  args: {
    primaryFont: Fonts["Caveat"],
    secondaryFont: Fonts["Didact_Gothic"],
  },
  // Controls
  argTypes: {
    primaryFont: {
      control: {
        type: "radio"
      },
      options: Object.keys(Fonts),
      mapping: Fonts
    },
    secondaryFont: {
      control: {
        type: "radio"
      },
      options: Object.keys(Fonts),
      mapping: Fonts
    },
    children: {
      table: {
        disable: true
      },
      control: false
    }
  },
};
export default meta;

type Story = StoryObj<typeof FontsProvider>;

export const FontExamples: Story = {
  render: (args) => (
    <>
      <FontsProvider
        {...args}
      >
        <FontsTester />
      </FontsProvider>
    </>
  ),
};
