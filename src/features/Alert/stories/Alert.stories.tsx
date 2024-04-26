import { primaryFont, secondaryFont } from "@/fonts";
import AlertProvider from "../AlertProvider/AlertProvider";
import AlertPositions from "../AlertPositions";
import AlertTester from "./AlertTester";
import { ClientFontInitializer } from "../../../lib";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AlertProvider> = {
  // Meta
  title: "Partials/Alert",
  component: AlertProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  // Args
  args: {
    position: AlertPositions.TOP_RIGHT,
    timeout: 5000,
  },
  // Controls
  argTypes: {
    position: {
      control: {
        type: "inline-radio"
      },
      options: Object.values(AlertPositions)
    },
    timeout: {
      control : {
        type: "number"
      }
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

type Story = StoryObj<typeof AlertProvider>;

export const AlertExamples: Story = {
  render: (args) => (
    <>
      <AlertProvider
        {...args}
      >
        <ClientFontInitializer
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
        <AlertTester />
      </AlertProvider>
    </>
  ),
};
