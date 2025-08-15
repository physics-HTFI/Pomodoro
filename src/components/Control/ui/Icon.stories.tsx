import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Icon } from "./Icon";
import { Cancel, ControlCamera } from "@mui/icons-material";

const icons = {
  "Cancel Icon": <Cancel />,
  "Control Icon": <ControlCamera />,
};

const meta = {
  component: Icon,
  args: {
    icon: icons["Cancel Icon"],
    size: "large",
    tooltip: "tooltip",
    onClick: fn(),
  },
  argTypes: {
    icon: { options: Object.keys(icons), mapping: icons },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Icon",
};
