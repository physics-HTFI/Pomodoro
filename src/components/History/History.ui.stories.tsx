import type { Meta, StoryObj } from "@storybook/react-vite";
import { UI_History } from "./History.ui";
import { getCountsForDisplay } from "./model/use/_getCountsForDisplay";
import { TypeHistory } from "./model/TypeHistory";

const range = new Array(30).fill(0).map((_, i) => i);
const dict = Object.fromEntries(range.map((i) => [`${i}`, i]));
const counts: TypeHistory = {
  days: dict,
  weeks: dict,
  months: dict,
  years: dict,
};
const countsForDisplay = getCountsForDisplay(counts, true);

const meta = {
  component: UI_History,
  args: { counts: countsForDisplay },
} satisfies Meta<typeof UI_History>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithFile: Story = {
  args: { hasFile: true },
};

export const WithoutFile: Story = {
  args: { hasFile: false },
};
