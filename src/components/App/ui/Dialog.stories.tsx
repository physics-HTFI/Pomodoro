import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dialog } from "./Dialog";
import { fn } from "storybook/test";

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onLoad: fn(),
    onClose: fn(),
  },
};
