import { Meta, StoryObj } from "@storybook/react";
import AlertAnchor from "./AlertAnchor";
import AlertVariant from "./AlertVariant";
import { ClientFontInitializer } from "../../../lib";
import { primaryFont, secondaryFont } from "@/fonts";
import { useState } from "react";
import AlertTester from "./AlertTester";

const meta: Meta<typeof AlertTester> = {
  title: "Partials/Alert",
  component: AlertTester,
  decorators: [
    (Story) => {
      const [showAlert, setShowAlert] = useState(false);

      const display = () => {
        setShowAlert(true);
        console.log("show alert");
      }

      const hide = () => {
        setShowAlert(false);
      }

      return (
      <>
        <ClientFontInitializer
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
        <div style={{ height: "500px", width: "100%" }}>
          <Story />
        </div>
      </>
    )},
  ],
  tags: ["autodocs"],
  argTypes: {
    anchor: {
      control: "inline-radio",
      options: [
        AlertAnchor.TOP_LEFT,
        AlertAnchor.TOP_CENTER,
        AlertAnchor.TOP_RIGHT,
        AlertAnchor.BOTTOM_LEFT,
        AlertAnchor.BOTTOM_CENTER,
        AlertAnchor.BOTTOM_RIGHT,
      ],
    },
    variant: {
      control: "inline-radio",
      options: [
        AlertVariant.INFO,
        AlertVariant.SUCCESS,
        AlertVariant.WARNING,
        AlertVariant.DANGER,
      ],
    },
  },
} satisfies Meta<typeof AlertTester>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    content: "This is an alert.",
    anchor: AlertAnchor.TOP_CENTER,
    variant: AlertVariant.INFO,
    show: false,
  },
};
