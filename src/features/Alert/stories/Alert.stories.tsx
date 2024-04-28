import AlertProvider from "../AlertProvider/AlertProvider";
import AlertPositions from "../AlertPositions";
import AlertTester from "./AlertTester";
import { Meta, StoryObj } from "@storybook/react";
import { FontsProvider } from "../../Fonts";import {
  Caveat,
  Didact_Gothic,
} from "next/font/google";

const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
});

const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
});

const meta: Meta<typeof AlertProvider> = {
  // Meta
  title: "Features/Alert",
  component: AlertProvider,
  parameters: {
    layout: "centered",
  },
  // Args
  args: {
    position: AlertPositions.TOP_RIGHT,
    offset: "50px 20px",
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
    offset: {
      control: {
        type: "text"
      }
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
      <FontsProvider primaryFont={caveat} secondaryFont={didactGothic}>
        <AlertProvider
          {...args}
        >
          <AlertTester />
        </AlertProvider>
      </FontsProvider>
    </>
  ),
};
