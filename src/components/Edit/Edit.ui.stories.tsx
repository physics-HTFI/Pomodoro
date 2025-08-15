import type { Meta, StoryObj } from "@storybook/react-vite";

import { UI_Edit } from "./Edit.ui";
import { fn } from "storybook/test";

const meta = {
  component: UI_Edit,
} satisfies Meta<typeof UI_Edit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Edit.ui",
  args: {
    fontSize: "large",
    onReset: fn(),
    onCountUp: fn(),
    onCountDown: fn(),
    onTimeUp: fn(),
    onTimeDown: fn(),
  },
};
