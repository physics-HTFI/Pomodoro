import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { PipPopupButton } from "../PipPopupButton";
import { PipPortal } from "../PipPortal";
import { modelPip } from "../model/modelPip";
import { Box, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import { MainContainer } from "../../App/ui/MainContainer";

function TestPip() {
  const { pipOpen } = modelPip.useValues();

  return (
    <>
      <Box position="fixed" top={0} left={0} color="white" width="100%">
        <Typography color="white">
          画面右上の
          <Launch fontSize="small" />
          アイコンをクリックして別タブで開いてから👇の
          <Launch fontSize="small" />
          ボタンを押すこと。
          <br />
          (iframeの中からPiPを開始するとエラーになるため。)
        </Typography>
      </Box>
      <PipPortal>
        <MainContainer>
          <Typography variant="h5" color="white">
            open PiP: {`${pipOpen}`}
          </Typography>
          <PipPopupButton />
        </MainContainer>
      </PipPortal>
    </>
  );
}

const meta = {
  component: TestPip,
  render: () => (
    <Provider>
      <meta.component />
    </Provider>
  ),
} satisfies Meta<typeof TestPip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "pip" };
