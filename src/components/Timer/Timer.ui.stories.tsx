import type { Meta, StoryObj } from "@storybook/react-vite";

import { UI_Timer } from "./Timer.ui";
import { TypeTimerStatus } from "./model/type/TypeTimerStatus";

function TestTimer(timer: {
  isRunning: boolean;
  seconds: number;
  status: TypeTimerStatus;
}) {
  return <UI_Timer timer={timer} />;
}

const meta = {
  component: TestTimer,
  argTypes: {
    seconds: {
      control: { type: "range", min: -60, max: (25 + 1) * 60, step: 1 },
    },
    status: {
      options: ["work", "break"],
      control: "radio",
    },
  },
} satisfies Meta<typeof TestTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Timer.ui",
  args: {
    status: "work",
    isRunning: true,
    seconds: 25 * 60,
  },
};
