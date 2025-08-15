import type { Meta, StoryObj } from "@storybook/react-vite";

import { Edit } from "./Edit";
import { Provider, useAtomValue } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { Box, Typography } from "@mui/material";
import { atomCounts } from "../../atoms/atomCounts/atomCounts";

function TestEdit() {
  const { time } = useAtomValue(atomTimer.getTimeForDisplay);
  const counts = useAtomValue(atomCounts.getCountsForDisplay);
  return (
    <>
      <Box position="fixed" top={0} left={0} color="white">
        <Typography variant="h5">time: {time}</Typography>
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
