import type { Meta, StoryObj } from "@storybook/react-vite";

import { Edit } from "./Edit";
import { Provider } from "jotai";
import { modelTimer } from "../Timer/model/modelTimer";
import { Box, Typography } from "@mui/material";
import { modelHistory } from "../History/model/modelHistory";

function TestEdit() {
  const seconds = modelTimer.useTimerValue().seconds;
  const counts = modelHistory.useCountsForDisplay();
  return (
    <>
      <Box position="fixed" top={0} left={0} color="white">
        <Typography variant="h5">time: {seconds / 60}:00</Typography>
        <Typography variant="h5">
          counts: {counts?.days[0].count ?? 0}
        </Typography>
      </Box>
      <Edit />
    </>
  );
}

const meta = {
  component: TestEdit,
  render: () => (
    <Provider>
      <meta.component />
    </Provider>
  ),
} satisfies Meta<typeof TestEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Edit",
};
