import type { Meta, StoryObj } from "@storybook/react-vite";

import { UI_Control } from "./Control.ui";
import { fn } from "storybook/test";

const meta = {
  component: UI_Control,
} satisfies Meta<typeof UI_Control>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Control.ui",
  args: {
    fontSize: "large",
    onReset: fn(),
    onCountUp: fn(),
    onCountDown: fn(),
    onTimeUp: fn(),
    onTimeDown: fn(),
  },
};
